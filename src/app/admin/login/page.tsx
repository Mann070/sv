'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { HeartIcon } from '@/components/ui/HeartIcon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

// In a real application, this should be a secure environment variable
const ADMIN_PASSWORD = 'admin';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('admin-authenticated', 'true');
        toast({
          title: 'Login Successful',
          description: 'Redirecting to the admin dashboard...',
        });
        router.push('/admin');
      } else {
        setError('Incorrect password. Please try again.');
        toast({
          title: 'Login Failed',
          description: 'The password you entered is incorrect.',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
             <div className='flex justify-center items-center gap-2 mb-4'>
                <HeartIcon className="text-primary" size={32} />
                <h1 className="text-2xl font-bold font-headline text-primary">
                    Care Nexus
                </h1>
             </div>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter the password to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
