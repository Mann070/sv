"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './ui/HeartIcon';
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Stethoscope,
    CreditCard,
    Video,
    BarChart3,
    Settings
} from 'lucide-react';

export function DoctorSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/doctor/patients', icon: Users, label: 'Patients' },
        { href: '/doctor/appointments', icon: Calendar, label: 'Appointments' },
        { href: '/doctor/prescriptions', icon: FileText, label: 'E-prescription' },
        { href: '/doctor/diagnosis', icon: Stethoscope, label: 'Diagnosis Tool' },
        { href: '/doctor/billing', icon: CreditCard, label: 'Billing' },
        { href: '/doctor/telemedicine', icon: Video, label: 'Telemedicine' },
        { href: '/doctor/analytics', icon: BarChart3, label: 'Analytics' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-card border-r h-screen sticky top-0">
            <div className="p-6 border-b">
                <Link href="/doctor/dashboard" className="flex items-center gap-2 group">
                    <HeartIcon className="text-primary" size={28} />
                    <h1 className="text-xl font-bold font-headline text-primary">
                        Care Nexus
                    </h1>
                </Link>
            </div>

            <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <Button
                        key={item.href}
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className={`w-full justify-start group ${pathname === item.href ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                        asChild
                    >
                        <Link href={item.href}>
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.label}
                        </Link>
                    </Button>
                ))}
            </nav>

            <div className="p-4 border-t mt-auto">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground" asChild>
                    <Link href="/doctor/settings">
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
                    </Link>
                </Button>
            </div>
        </aside>
    );
}
