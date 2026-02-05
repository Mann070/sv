'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/header';
import { AnimatedBotIcon } from '@/components/ui/animated-bot-icon';
import { AnimatedCalendarDaysIcon } from '@/components/ui/animated-calendar-days-icon';
import { AnimatedVideoIcon } from '@/components/ui/animated-video-icon';
import { AnimatedWalletIcon } from '@/components/ui/animated-wallet-icon';
import { AnimatedUsersIcon } from '@/components/ui/animated-users-icon';
import { motion } from 'framer-motion';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import { AnimatedPillIcon } from '@/components/ui/animated-pill-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/context/LanguageContext';

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
};

export default function DashboardPage() {
  const { upcomingAppointments } = useAppContext();
  const { t } = useTranslation();

  const quickAccess = [
    {
      title: t('dashboard.quickAccess.symptomGuide.title'),
      description: t('dashboard.quickAccess.symptomGuide.description'),
      icon: AnimatedBotIcon,
      href: '/symptom-guide',
    },
    {
      title: t('dashboard.quickAccess.bookAppointment.title'),
      description: t('dashboard.quickAccess.bookAppointment.description'),
      icon: AnimatedCalendarDaysIcon,
      href: '/appointments',
    },
    {
      title: t('dashboard.quickAccess.comparePrices.title'),
      description: t('dashboard.quickAccess.comparePrices.description'),
      icon: AnimatedPillIcon,
      href: '/compare-prices',
    },
    {
      title: t('dashboard.quickAccess.teleconsultation.title'),
      description: t('dashboard.quickAccess.teleconsultation.description'),
      icon: AnimatedVideoIcon,
      href: '/teleconsultation',
    },
  ];

  const recentTeleconsultations = [
    { name: 'Dr. Arjun Reddy', speciality: 'Dermatologist', date: '1 day ago', avatarSeed: 'doc2' },
    { name: 'Dr. Priya Sharma', speciality: 'General Physician', date: '3 days ago', avatarSeed: 'doc1' },
  ]

  return (
    <>
      <Header title={t('dashboard.title')} />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.cards.healthWallet.title')}
              </CardTitle>
              <motion.div initial="initial" whileHover="hover">
                <AnimatedWalletIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupeeIcon size={24} className="mr-1" />
                5,231.89
              </div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.cards.healthWallet.subtitle')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.cards.upcomingAppointments.title')}
              </CardTitle>
              <motion.div initial="initial" whileHover="hover">
                <AnimatedCalendarDaysIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                {upcomingAppointments.length > 0 ? `${t('dashboard.cards.upcomingAppointments.next')}: ${upcomingAppointments[0].doctor.split('(')[0]}` : t('dashboard.cards.upcomingAppointments.none')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.cards.familyMembers.title')}
              </CardTitle>
              <motion.div initial="initial" whileHover="hover">
                <AnimatedUsersIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                {t('dashboard.cards.familyMembers.subtitle')}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('dashboard.cards.needHelp.title')}</CardTitle>
              <motion.div
                initial="initial"
                whileHover="hover"
                className="text-primary-foreground/70"
              >
                <AnimatedBotIcon />
              </motion.div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {t('dashboard.cards.needHelp.description')}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/symptom-guide">{t('dashboard.cards.needHelp.button')}</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('dashboard.upcomingAppointments.title')}</CardTitle>
              <CardDescription>
                {t('dashboard.upcomingAppointments.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 2).map((appt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {appt.doctor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appt.speciality}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appt.time} at {appt.hospital}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/appointments">{t('dashboard.upcomingAppointments.detailsButton')}</Link>
                    </Button>
                  </div>
                ))}
                {upcomingAppointments.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">{t('dashboard.upcomingAppointments.none')}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/appointments">
                  {t('dashboard.upcomingAppointments.viewAllButton')}{' '}
                  <motion.div whileHover={{ x: 5 }}>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t('dashboard.recentTeleconsultations.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentTeleconsultations.map((consult, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`https://picsum.photos/seed/${consult.avatarSeed}/100`} alt={consult.name} />
                                <AvatarFallback>{consult.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{consult.name}</p>
                                <p className="text-sm text-muted-foreground">{consult.speciality}</p>
                                <p className="text-xs text-muted-foreground">{consult.date}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/teleconsultation">{t('dashboard.recentTeleconsultations.viewAllButton')}</Link>
                    </Button>
                </CardFooter>
            </Card>

            {quickAccess.slice(0, 2).map((item) => (
              <Link href={item.href} key={item.title}>
                <Card className="hover:bg-muted transition-colors group">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <motion.div
                      initial="initial"
                      whileHover="hover"
                      className="h-8 w-8 text-primary"
                    >
                      <item.icon className="w-full h-full" />
                    </motion.div>
                    <div>
                      <CardTitle className="font-headline">
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
