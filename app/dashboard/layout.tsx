import type { ReactNode } from 'react';
import DashboardSidebar from './sidebar';
import DashboardHeader from './header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar — hidden on mobile, visible on lg+ */}
      <div className="hidden lg:flex lg:flex-col lg:shrink-0">
        <DashboardSidebar />
      </div>

      {/* Right column: header + scrollable content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
