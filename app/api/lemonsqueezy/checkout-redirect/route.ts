import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

const CHECKOUT_URL = 'https://kreativecasa.gumroad.com/l/kxtcbs';

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const url = new URL(CHECKOUT_URL);
  url.searchParams.set('email', user.email!);
  url.searchParams.set('wanted', 'true'); // skip landing page, go straight to checkout

  return NextResponse.redirect(url.toString());
}
