
'use client';

import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/context/LanguageContext';

const chartData = [
  { month: 'January', savings: 186 },
  { month: 'February', savings: 305 },
  { month: 'March', savings: 237 },
  { month: 'April', savings: 450 },
  { month: 'May', savings: 250 },
  { month: 'June', savings: 380 },
];

const chartConfig = {
  savings: {
    label: 'Savings',
    color: 'hsl(var(--primary))',
    icon: () => <IndianRupeeIcon size={12} className="mr-1" />,
  },
} satisfies ChartConfig;

const transactions = [
  {
    description: 'Micro-savings Deposit',
    date: 'June 20, 2024',
    amount: 50.0,
    type: 'credit',
  },
  {
    description: "Dr. Sharma's Consultation Fee",
    date: 'June 18, 2024',
    amount: -800.0,
    type: 'debit',
  },
  {
    description: 'Micro-savings Deposit',
    date: 'June 15, 2024',
    amount: 100.0,
    type: 'credit',
  },
  {
    description: 'Pharmacy Bill Payment',
    date: 'June 12, 2024',
    amount: -1250.0,
    type: 'debit',
  },
];

const formatCurrency = (amount: number) => {
  return `${Math.abs(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export default function WalletPage() {
    const { t } = useTranslation();
  return (
    <>
      <Header title={t('wallet.headerTitle')} />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('wallet.balance.title')}</CardTitle>
                <CardDescription>
                  {t('wallet.balance.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold flex items-center">
                  <IndianRupeeIcon size={44} className="mr-2" />
                  {formatCurrency(5231.89)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>{t('wallet.addFunds.title')}</CardTitle>
                <CardDescription>
                  {t('wallet.addFunds.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">{t('wallet.addFunds.amountLabel')}</Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      <IndianRupeeIcon size={16} />
                    </div>
                    <Input id="amount" type="number" placeholder="0.00" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upi-id">{t('wallet.addFunds.upiLabel')}</Label>
                  <Input id="upi-id" placeholder="yourname@bank" />
                </div>
              </CardContent>
              <CardFooter>
                 <Button className="w-full">{t('wallet.addFunds.button')}</Button>
              </CardFooter>
            </Card>
          </div>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t('wallet.savings.title')}</CardTitle>
              <CardDescription>
                {t('wallet.savings.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-64 w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => t(`months.${value.toLowerCase()}`)}
                  />
                   <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('wallet.transactions.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('wallet.transactions.table.description')}</TableHead>
                  <TableHead>{t('wallet.transactions.table.date')}</TableHead>
                  <TableHead className="text-right">{t('wallet.transactions.table.amount')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{t.description}</TableCell>
                    <TableCell className="text-muted-foreground">{t.date}</TableCell>
                    <TableCell
                      className={`text-right font-semibold flex justify-end items-center gap-1.5 ${
                        t.type === 'credit'
                          ? 'text-green-600'
                          : 'text-destructive'
                      }`}
                    >
                      {t.amount < 0 ? '-' : ''}
                      <IndianRupeeIcon size={16} />
                      {formatCurrency(t.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
