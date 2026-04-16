import Stripe from 'stripe';

let _stripe: Stripe | null = null;
export function getStripeClient(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-03-25.dahlia',
    });
  }
  return _stripe;
}

// Keep named export for backwards-compat callers that import `stripe`
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripeClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!;
