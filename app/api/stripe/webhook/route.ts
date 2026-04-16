import { stripe } from '@/lib/stripe';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

export const runtime = 'nodejs';

let _supabaseAdmin: SupabaseClient | null = null;
function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }
  return _supabaseAdmin;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!userId) {
          console.error('No userId in checkout session metadata');
          break;
        }

        const { error } = await getSupabaseAdmin()
          .from('profiles')
          .update({
            subscription_status: 'active',
            stripe_customer_id: customerId,
            subscription_id: subscriptionId,
          })
          .eq('id', userId);

        if (error) {
          console.error('Failed to update profile on checkout.session.completed:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { error } = await getSupabaseAdmin()
          .from('profiles')
          .update({ subscription_status: 'cancelled' })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Failed to update profile on customer.subscription.deleted:', error);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        let status: 'active' | 'cancelled' | 'past_due' | 'free' = 'free';
        switch (subscription.status) {
          case 'active':
          case 'trialing':
            status = 'active';
            break;
          case 'past_due':
          case 'unpaid':
            status = 'past_due';
            break;
          case 'canceled':
          case 'incomplete_expired':
            status = 'cancelled';
            break;
          default:
            status = 'free';
        }

        const { error } = await getSupabaseAdmin()
          .from('profiles')
          .update({
            subscription_status: status,
            subscription_id: subscription.id,
          })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Failed to update profile on customer.subscription.updated:', error);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        const { error } = await getSupabaseAdmin()
          .from('profiles')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_customer_id', customerId);

        if (error) {
          console.error('Failed to update profile on invoice.payment_failed:', error);
        }
        break;
      }

      default:
        // Unhandled event type — not an error
        break;
    }
  } catch (err) {
    console.error('Error processing webhook event:', err);
    return NextResponse.json({ error: 'Internal server error processing event' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
