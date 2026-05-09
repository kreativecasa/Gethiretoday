#!/usr/bin/env node
// Grant a user permanent Pro access by email.
// Usage: node scripts/grant-pro.mjs <email> [--years 100] [--revoke]
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY in env (or .env.local).

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, k, raw] = m;
    if (process.env[k]) continue;
    process.env[k] = raw.replace(/^["']|["']$/g, '');
  }
}

const args = process.argv.slice(2);
const revoke = args.includes('--revoke');
const yearsIdx = args.indexOf('--years');
const years = yearsIdx >= 0 ? Number(args[yearsIdx + 1]) : 100;
const email = args.find((a) => !a.startsWith('--') && !/^\d+$/.test(a));

if (!email) {
  console.error('Usage: node scripts/grant-pro.mjs <email> [--years 100] [--revoke]');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env / .env.local');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const endsAt = new Date();
endsAt.setFullYear(endsAt.getFullYear() + years);

const update = revoke
  ? { subscription_status: 'free', subscription_ends_at: null, updated_at: new Date().toISOString() }
  : { subscription_status: 'active', subscription_ends_at: endsAt.toISOString(), updated_at: new Date().toISOString() };

const { data, error } = await supabase
  .from('profiles')
  .update(update)
  .eq('email', email)
  .select('id, email, subscription_status, subscription_ends_at');

if (error) {
  console.error('Update failed:', error.message);
  process.exit(1);
}

if (!data || data.length === 0) {
  console.error(`No profile matched email "${email}". The user must sign up first.`);
  process.exit(2);
}

console.log(revoke ? 'Pro access revoked:' : 'Pro access granted:');
console.table(data);
