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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DoctorSignupPage() {
    const router = useRouter();
    const { signUp, isLoading } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');

    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!name || !email || !password || !department) {
            setError('Please fill in all required fields');
            return;
        }

        const res = await signUp({
            name,
            email,
            password,
            role: 'doctor',
            extraData: {
                department
            }
        });

        if (!res.ok) setError(res.message || 'Signup failed');
        // signUp redirects on success (to /admin for doctors)
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
                        <CardTitle>Doctor Registration</CardTitle>
                        <CardDescription>
                            Join our medical network.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name (Dr.) *</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Dr. John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department">Department / Speciality *</Label>
                            <Select onValueChange={setDepartment} value={department}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Speciality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                                    <SelectItem value="Neurology">Neurology</SelectItem>
                                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>



                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="doctor@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="text-sm text-red-600">{error}</div>}

                        <Button type="submit" className="w-full">
                            {isLoading ? 'Registering...' : 'Register as Doctor'}
                        </Button>
                    </CardContent>
                    <CardDescription className="p-6 pt-0 text-center text-sm">
                        Already have an account?{' '}
                        <Link
                            href="/doctor/login"
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
