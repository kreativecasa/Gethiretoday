import { NextResponse } from 'next/server';

export async function POST() {
  // Redirect to Gumroad library where users can manage/cancel subscriptions
  return NextResponse.json({ url: 'https://app.gumroad.com/library' });
}
