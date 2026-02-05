'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HeartIcon } from '@/components/ui/HeartIcon';
import { Users, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-2 mb-4">
          <HeartIcon className="text-primary" size={48} />
          <h1 className="text-5xl font-bold font-headline text-primary">
            Care Nexus
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">Your one-stop solution for managing healthcare.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link href="/login" className="flex">
          <Card className="w-full hover:shadow-lg hover:border-primary transition-all flex flex-col">
            <CardHeader className="items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-headline text-3xl">Patient Portal</CardTitle>
              <CardDescription>Sign in to book appointments, manage your health records, and more.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button className="w-full" size="lg">Patient Login</Button>
            </CardContent>
          </Card>
        </Link>
        <Link href="/doctor/login" className="flex">
          <Card className="w-full hover:shadow-lg hover:border-primary transition-all flex flex-col">
            <CardHeader className="items-center text-center">
              <Stethoscope className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="font-headline text-3xl">Doctor Portal</CardTitle>
              <CardDescription>Access your dashboard, manage patients, and view schedules.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button className="w-full" size="lg">Doctor &amp; Staff Login</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
