'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Mail,
  Target,
  Layout,
  BookOpen,
  Settings,
  CreditCard,
  LogOut,
} from 'lucide-react';
import { createClient } from '@/lib/supabase';

const navSections = [
  {
    label: 'MAIN',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/dashboard/resumes', label: 'My Resumes', icon: FileText },
      { href: '/dashboard/cover-letters', label: 'Cover Letters', icon: Mail },
    ],
  },
  {
    label: 'TOOLS',
    items: [
      { href: '/dashboard/ats-checker', label: 'ATS Checker', icon: Target },
      { href: '/dashboard/templates', label: 'Resume Templates', icon: Layout },
      { href: '/dashboard/examples', label: 'Examples', icon: BookOpen },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { href: '/dashboard/account', label: 'Account Settings', icon: Settings },
      { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      setUserName(
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email?.split('@')[0] ??
        'User'
      );
      setUserEmail(user.email ?? '');
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single();
      setIsPro(profile?.subscription_status === 'active');
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const initials = userName
    ? userName.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
    : '?';

  return (
    <aside className="w-[260px] shrink-0 flex flex-col bg-white border-r border-slate-100 h-full overflow-y-auto">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0"
      >
        <span className="text-xl font-bold tracking-tight" style={{ color: '#4AB7A6' }}>
          GetHireToday
        </span>
      </Link>

      {/* User info */}
      <div className="px-4 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: '#4AB7A6' }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900 truncate">{userName || '…'}</p>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                  isPro
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
                style={isPro ? { backgroundColor: '#4AB7A6' } : {}}
              >
                {isPro ? 'Pro' : 'Free'}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-1.5">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    style={isActive ? { backgroundColor: '#4AB7A6' } : {}}
                  >
                    <Icon size={18} className="shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-slate-100 pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
