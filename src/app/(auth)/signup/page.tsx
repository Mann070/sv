
"use client";

import { useState } from 'react';
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
import { useAuth } from '@/context/AuthContext';

type Role = 'patient' | 'doctor';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('patient');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signUp({ name, email, password, role });
    if (!res.ok) setError(res.message || 'Signup failed');
    // signUp redirects on success
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
              <Input id="name" type="text" placeholder="e.g. Aravind" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="radio" name="role" value="patient" checked={role==='patient'} onChange={()=>setRole('patient')} /> Patient</label>
                <label className="flex items-center gap-2"><input type="radio" name="role" value="doctor" checked={role==='doctor'} onChange={()=>setRole('doctor')} /> Doctor / Staff</label>
              </div>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" className="w-full">
              {isLoading ? 'Signing up...' : 'Sign Up'}
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
