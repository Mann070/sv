
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AnimatedMenuIcon } from './ui/animated-menu-icon';
import { AnimatedDashboardIcon } from './ui/animated-dashboard-icon';
import { HeartIcon } from './ui/HeartIcon';
import { AnimatedBotIcon } from './ui/animated-bot-icon';
import { AnimatedCalendarDaysIcon } from './ui/animated-calendar-days-icon';
import { AnimatedVideoIcon } from './ui/animated-video-icon';
import { AnimatedWalletIcon } from './ui/animated-wallet-icon';
import { motion } from 'framer-motion';
import { AnimatedPillIcon } from './ui/animated-pill-icon';
import { FileText, Stethoscope, LogIn, UserPlus, LogOut, UserCircle, Users, Languages, TestTube2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';


const navItems = [
  { href: '/dashboard', icon: AnimatedDashboardIcon, label: 'Dashboard' },
  { href: '/symptom-guide', icon: AnimatedBotIcon, label: 'AI Symptom Guide' },
  {
    href: '/appointments',
    icon: AnimatedCalendarDaysIcon,
    label: 'Appointments',
  },
  { href: '/medicines', icon: AnimatedPillIcon, label: 'Medicines' },
  {
    href: '/compare-prices',
    icon: () => <Stethoscope className="h-5 w-5" />,
    label: 'Treatment Prices',
  },
  {
    href: '/diagnostics',
    icon: () => <TestTube2 className="h-5 w-5" />,
    label: 'Diagnostics',
  },
  {
    href: '/teleconsultation',
    icon: AnimatedVideoIcon,
    label: 'Teleconsultation',
  },
  { href: '/wallet', icon: AnimatedWalletIcon, label: 'Health Wallet' },
  { href: '/government-policies', icon: () => <FileText className="h-5 w-5" />, label: 'Government Policies' },
  { href: '/family', icon: () => <Users className="h-5 w-5" />, label: 'Family Members' },
];

export function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [isAdminPage, setIsAdminPage] = useState(false);
  const { setLanguage } = useTranslation();
  
  const isAuthenticated = !!user;


  useEffect(() => {
    setIsAdminPage(pathname.startsWith('/admin'));
  }, [pathname]);

  const handleAdminLogout = () => {
    localStorage.removeItem('admin-authenticated');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    router.push('/');
  };
  
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <motion.div whileHover={{ scale: 1.2 }}>
                <AnimatedMenuIcon className="h-5 w-5" />
              </motion.div>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <HeartIcon className="h-6 w-6 text-primary" />
                <span className="font-headline text-primary">Care Nexus</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname.startsWith(item.href)
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              ))}
               <Link
                  href="/profile"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname.startsWith('/profile')
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  <UserCircle className="h-5 w-5" />
                  My Profile
                </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold md:text-2xl font-headline">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant="outline" size="icon">
              <Languages className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('hi')}>हिन्दी</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('ta')}>தமிழ்</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarFallback>{user ? user.name.charAt(0) : 'A'}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isAdminPage ? (
              <>
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAdminLogout}>Logout</DropdownMenuItem>
              </>
          ) : isAuthenticated ? (
            <>
              <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
                </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push('/login')}>
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/signup')}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign Up</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
}
