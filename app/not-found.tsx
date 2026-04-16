import Link from 'next/link';
import { FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f0fdf9' }}>
          <FileSearch className="w-8 h-8" style={{ color: '#4AB7A6' }} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Page not found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="rounded-full font-medium text-white" style={{ backgroundColor: '#4AB7A6' }}>
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full font-medium border-gray-200">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
