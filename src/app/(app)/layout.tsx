'use client';

import { AppSidebar } from '@/components/app-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication check has been removed to allow public access.
  return (
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">{children}</div>
      </div>
  );
}
