
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './ui/HeartIcon';
import { AnimatedCalendarDaysIcon } from './ui/animated-calendar-days-icon';
import { AnimatedVideoIcon } from './ui/animated-video-icon';
import { AnimatedWalletIcon } from './ui/animated-wallet-icon';
import { AnimatedDashboardIcon } from './ui/animated-dashboard-icon';
import { AnimatedUsersIcon } from './ui/animated-users-icon';
import { AnimatedLightbulbIcon } from './ui/animated-lightbulb-icon';
import { AnimatedPillIcon } from './ui/animated-pill-icon';
import { FileText, Stethoscope, TestTube2, UserCircle } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/dashboard', icon: AnimatedDashboardIcon, label: t('sidebar.dashboard') },
    {
      href: '/symptom-guide',
      icon: AnimatedLightbulbIcon,
      label: t('sidebar.symptomGuide'),
    },
    {
      href: '/appointments',
      icon: AnimatedCalendarDaysIcon,
      label: t('sidebar.appointments'),
    },
    { href: '/medicines', icon: AnimatedPillIcon, label: t('sidebar.medicines') },
    {
      href: '/compare-prices',
      icon: () => <Stethoscope className="mr-2 h-4 w-4" />,
      label: t('sidebar.treatmentPrices'),
    },
    {
      href: '/diagnostics',
      icon: () => <TestTube2 className="mr-2 h-4 w-4" />,
      label: t('sidebar.diagnostics'),
    },
    {
      href: '/teleconsultation',
      icon: AnimatedVideoIcon,
      label: t('sidebar.teleconsultation'),
    },
    { href: '/wallet', icon: AnimatedWalletIcon, label: t('sidebar.healthWallet') },
    { href: '/government-policies', icon: () => <FileText className="mr-2 h-4 w-4" />, label: t('sidebar.governmentPolicies') },
    { href: '/family', icon: AnimatedUsersIcon, label: t('sidebar.familyMembers') },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r">
      <div className="p-4 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <HeartIcon className="text-primary" size={32} />
          <h1 className="text-2xl font-bold font-headline text-primary">
            Care Nexus
          </h1>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
            className="w-full justify-start group"
            asChild
          >
            <Link href={item.href}>
              <item.icon />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start group" asChild>
           <Link href="/profile">
                <UserCircle className="mr-2 h-4 w-4" />
                {t('sidebar.myProfile')}
           </Link>
        </Button>
      </div>
    </aside>
  );
}
