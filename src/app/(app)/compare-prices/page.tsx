
'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import { useTranslation } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator } from 'lucide-react';

const priceData = [
  {
    procedure: 'Angioplasty',
    yourPrice: 250000,
  },
  {
    procedure: 'Knee Replacement',
    yourPrice: 350000,
  },
  {
    procedure: 'Cataract Surgery',
    yourPrice: 40000,
  },
  {
    procedure: 'Maternity Package (Normal Delivery)',
    yourPrice: 75000,
  },
  {
    procedure: 'MRI Scan',
    yourPrice: 8000,
  },
  {
    procedure: 'Heart Bypass Surgery',
    yourPrice: 450000,
  },
  {
    procedure: 'Gallbladder Removal',
    yourPrice: 120000,
  },
  {
    procedure: 'Hernia Repair',
    yourPrice: 90000,
  },
  {
    procedure: 'Appendectomy',
    yourPrice: 85000,
  },
  {
    procedure: 'Chemotherapy (per cycle)',
    yourPrice: 50000,
  },
];

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });
};

export default function ComparePricesPage() {
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState<{ procedure: string; yourPrice: number; } | null>(null);
    const [loanAmount, setLoanAmount] = useState(0);
    const [tenure, setTenure] = useState(12);

    const openDialog = (procedure: { procedure: string; yourPrice: number; }) => {
        setSelectedProcedure(procedure);
        setLoanAmount(procedure.yourPrice);
        setTenure(12);
        setIsDialogOpen(true);
    }
    
    const calculateEMI = () => {
        if (!loanAmount || loanAmount <= 0) return 0;
        const annualRate = 13; // 13% annual interest rate
        const monthlyRate = annualRate / 12 / 100;
        
        if (monthlyRate <= 0) { // Simple interest if rate is 0
            return loanAmount / tenure;
        }

        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
        return emi;
    }

    const monthlyEMI = calculateEMI();
    const totalPayable = monthlyEMI * tenure;
    const totalInterest = totalPayable - loanAmount;


  return (
    <>
      <Header title={t('prices.headerTitle')} />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('prices.pageTitle')}</CardTitle>
            <CardDescription>
              {t('prices.pageDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('prices.table.procedure')}</TableHead>
                  <TableHead className="text-right text-primary font-semibold">
                    {t('prices.table.yourPrice')}
                  </TableHead>
                  <TableHead className="text-center">{t('prices.table.emiOptions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceData.map((row) => (
                  <TableRow key={row.procedure}>
                    <TableCell className="font-medium">
                      {row.procedure}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-base"
                      >
                        <IndianRupeeIcon size={16} className="mr-1" />
                        {formatCurrency(row.yourPrice)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                        <Button variant="outline" size="sm" onClick={() => openDialog(row)}>
                           <Calculator className="mr-2 h-4 w-4" />
                           {t('prices.emi.calculateButton')}
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {t('prices.footerNote')}
            </p>
          </CardFooter>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">{t('prices.emi.dialogTitle')}</DialogTitle>
                    <DialogDescription>
                        {t('prices.emi.dialogDescription', { procedure: selectedProcedure?.procedure || '' })}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className='space-y-2'>
                        <div className="flex justify-between items-baseline">
                            <Label htmlFor="loanAmount">{t('prices.emi.loanAmount')}</Label>
                            <span className="text-lg font-semibold flex items-center">
                                <IndianRupeeIcon size={18} className="mr-1" />
                                {formatCurrency(loanAmount)}
                            </span>
                        </div>
                        <Slider 
                            id="loanAmount"
                            min={1000}
                            max={selectedProcedure?.yourPrice || 1000}
                            step={1000}
                            value={[loanAmount]}
                            onValueChange={(value) => setLoanAmount(value[0])}
                        />
                    </div>
                    <div className='space-y-2'>
                         <div className="flex justify-between items-baseline">
                            <Label htmlFor="tenure">{t('prices.emi.tenure')}</Label>
                            <span className="text-lg font-semibold">{tenure} {t('prices.emi.months')}</span>
                        </div>
                        <Slider 
                            id="tenure"
                            min={3}
                            max={36}
                            step={3}
                            value={[tenure]}
                            onValueChange={(value) => setTenure(value[0])}
                        />
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                       <div className="flex justify-between items-center">
                           <div className="text-muted-foreground">{t('prices.emi.monthlyPayment')}</div>
                           <div className="text-2xl font-bold flex items-center text-primary">
                             <IndianRupeeIcon size={20} className="mr-1" />
                             {formatCurrency(monthlyEMI)}
                           </div>
                       </div>
                        <div className="flex justify-between items-center text-xs">
                           <p className="text-muted-foreground">{t('prices.emi.totalInterest')}</p>
                           <div className="font-medium flex items-center">
                              <IndianRupeeIcon size={12} className="mr-1" />
                              {formatCurrency(totalInterest)}
                           </div>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                           <p className="text-muted-foreground">{t('prices.emi.totalPayable')}</p>
                           <div className="font-medium flex items-center">
                            <IndianRupeeIcon size={12} className="mr-1" />
                            {formatCurrency(totalPayable)}
                           </div>
                       </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground pt-2">
                        {t('prices.emi.interestRateNote', { rate: 13 })}
                    </p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">{t('common.close')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
