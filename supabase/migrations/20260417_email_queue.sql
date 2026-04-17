-- ============================================================
-- Email drip queue (April 17, 2026)
-- ============================================================
-- Adds automated email scheduling on user signup:
--   T+0  welcome
--   T+1  atsEducation
--   T+3  featureReveal
--   T+7  upgradeOffer
--   T+10 day10LastChance
--   T+14 day14Winback
-- ============================================================

-- Track unsubscribes on profiles (idempotent)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ;

-- Queue table
CREATE TABLE IF NOT EXISTS public.email_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL CHECK (email_type IN (
    'welcome',
    'ats_education',
    'feature_reveal',
    'upgrade_offer',
    'day10_last_chance',
    'day14_winback'
  )),
  scheduled_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
  attempts INT NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_queue_pending
  ON public.email_queue (scheduled_at)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_email_queue_user
  ON public.email_queue (user_id);

-- Enqueue all 6 emails on new-user signup
CREATE OR REPLACE FUNCTION public.enqueue_drip_emails()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.email_queue (user_id, email_type, scheduled_at) VALUES
    (NEW.id, 'welcome',            NOW()),
    (NEW.id, 'ats_education',      NOW() + INTERVAL '1 day'),
    (NEW.id, 'feature_reveal',     NOW() + INTERVAL '3 days'),
    (NEW.id, 'upgrade_offer',      NOW() + INTERVAL '7 days'),
    (NEW.id, 'day10_last_chance',  NOW() + INTERVAL '10 days'),
    (NEW.id, 'day14_winback',      NOW() + INTERVAL '14 days');
  RETURN NEW;
END;
$$;

-- Re-create trigger (drop first so migration is idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created_enqueue_emails ON auth.users;
CREATE TRIGGER on_auth_user_created_enqueue_emails
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.enqueue_drip_emails();

-- RLS: email_queue is internal, service-role only
ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;
-- No policies: without policies, only service-role bypass reaches this table.
