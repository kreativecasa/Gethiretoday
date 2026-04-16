'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Something went wrong</h2>
        <p className="text-gray-500 mb-8">
          An unexpected error occurred. Please try again, or contact support if the problem persists.
        </p>
        <Button
          onClick={reset}
          className="rounded-full font-medium text-white"
          style={{ backgroundColor: '#4AB7A6' }}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
