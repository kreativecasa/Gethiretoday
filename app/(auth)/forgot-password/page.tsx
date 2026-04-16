'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (values: ForgotFormValues) => {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#f0fdf9' }}
        >
          <MailCheck className="w-8 h-8" style={{ color: '#4AB7A6' }} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Check your inbox</h2>
          <p className="text-slate-500 text-sm max-w-xs">
            We sent a password reset link to{' '}
            <span className="font-semibold text-slate-700">{getValues('email')}</span>
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Didn&apos;t receive it? Check your spam folder or{' '}
          <button
            type="button"
            className="underline hover:no-underline text-[#4AB7A6]"
            onClick={() => setSent(false)}
          >
            try again
          </button>
          .
        </p>
        <Link href="/login">
          <Button
            variant="outline"
            className="mt-2 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reset your password</h1>
        <p className="mt-2 text-slate-500">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {serverError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`h-12 rounded-xl border-slate-200 focus-visible:ring-[#4AB7A6] ${
              errors.email ? 'border-red-400 focus-visible:ring-red-300' : ''
            }`}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 font-semibold rounded-full text-white"
          style={{ backgroundColor: '#4AB7A6' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending reset link…
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to sign in
      </Link>
    </div>
  );
}
