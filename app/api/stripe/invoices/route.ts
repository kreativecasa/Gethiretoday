import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const ssr = await createServerSupabaseClient();
    const { data: { user } } = await ssr.auth.getUser().catch(() => ({ data: { user: null } }));

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: profile } = await admin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ invoices: [] });
    }

    const invoices = await stripe.invoices.list({
      customer: profile.stripe_customer_id,
      limit: 24,
    });

    const result = invoices.data
      .filter((inv) => inv.status === 'paid')
      .map((inv) => ({
        id: inv.id,
        date: new Date((inv.created) * 1000).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        description: inv.lines.data[0]?.description || 'HiredTodayApp Pro — Monthly subscription',
        amount: (inv.amount_paid / 100).toFixed(2),
        currency: inv.currency.toUpperCase(),
        url: inv.hosted_invoice_url,
      }));

    return NextResponse.json({ invoices: result });
  } catch (err) {
    console.error('[stripe/invoices] error:', err);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}
