
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

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSignup}>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <HeartIcon className="text-primary" size={32} />
              <h1 className="text-2xl font-bold font-headline text-primary">
                Care Nexus
              </h1>
            </div>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Join our community to manage your healthcare with ease.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input id="name" type="text" placeholder="e.g. Aravind" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardContent>
          <CardDescription className="p-6 pt-0 text-center text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </CardDescription>
        </form>
      </Card>
    </div>
  );
}
