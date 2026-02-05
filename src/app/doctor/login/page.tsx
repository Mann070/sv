
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartIcon } from '@/components/ui/HeartIcon';

export default function DoctorLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirecting doctors to the admin dashboard
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <HeartIcon className="text-primary" size={32} />
              <h1 className="text-2xl font-bold font-headline text-primary">
                Care Nexus
              </h1>
            </div>
            <CardTitle>Doctor & Staff Portal</CardTitle>
            <CardDescription>
              Sign in to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="credential">Doctor ID or Email</Label>
              <Input
                id="credential"
                type="text"
                placeholder="Enter your credentials"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </CardContent>
           <CardDescription className="p-6 pt-0 text-center text-sm">
            Not a doctor or staff?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Patient Login
            </Link>
          </CardDescription>
        </form>
      </Card>
    </div>
  );
}
