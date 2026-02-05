'use client';

import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <Header title="Profile" />
        <main className="flex-1 space-y-8 p-4 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please sign in to view your profile.</p>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="My Profile" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Avatar className="w-full h-full text-3xl">
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} readOnly />
            </div>
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
