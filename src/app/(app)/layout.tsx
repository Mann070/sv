'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { useAuth } from '@/context/AuthContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not authenticated, send patients to login before accessing app pages.
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // Force patients to complete their profile before using the app.
    if (user?.role === 'patient' && !user.hasCompletedProfile && pathname !== '/profile') {
      router.replace('/profile');
    }
  }, [isAuthenticated, user, pathname, router]);

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
}
