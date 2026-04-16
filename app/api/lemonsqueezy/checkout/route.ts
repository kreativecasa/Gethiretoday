import { NextResponse } from 'next/server';

const CHECKOUT_URL = 'https://kreativecasa.gumroad.com/l/kxtcbs';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const url = new URL(CHECKOUT_URL);
    if (email) url.searchParams.set('email', email);
    url.searchParams.set('wanted', 'true');

    return NextResponse.json({ url: url.toString() });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}
