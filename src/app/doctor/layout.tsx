'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DoctorSidebar } from "@/components/doctor-sidebar";
import { DoctorHeader } from "@/components/doctor-header";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Allow access to login and signup pages without checks
    if (pathname?.startsWith('/doctor/login') || pathname?.startsWith('/doctor/signup')) {
      return;
    }

    if (!user) {
      router.push('/doctor/login');
      return;
    }

    if (user.role !== 'doctor') {
      // Redirect other roles to their respective dashboards
      if (user.role === 'patient') router.push('/dashboard');
      else if (user.role === 'admin') router.push('/admin');
      return;
    }

    // If doctor has not completed profile, force them to profile page
    if (!user.hasCompletedProfile && pathname !== '/doctor/profile') {
      router.push('/doctor/profile');
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Check if we are on login/signup page to avoid showing sidebar/header
  const isAuthPage = pathname?.startsWith('/doctor/login') || pathname?.startsWith('/doctor/signup');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50/50">
        <DoctorSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
            <DoctorHeader />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    </div>
  );
}
