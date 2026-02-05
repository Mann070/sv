
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, PlusIcon } from 'lucide-react';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/context/LanguageContext';

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { medicines } = useAppContext();
  const { t } = useTranslation();

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header title={t('medicines.headerTitle')} />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              {t('medicines.pageTitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('medicines.pageDescription')}
            </p>
          </div>
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('medicines.searchPlaceholder')}
              className="pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((med) => (
            <Card key={med.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{med.name}</CardTitle>
                <CardDescription>{med.manufacturer}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {t('medicines.packSize')}: {med.packSize}
                </p>
                <div className="text-2xl font-bold mt-2 flex items-center">
                  <IndianRupeeIcon size={22} className="mr-1" />
                  {formatCurrency(med.price)}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  {t('medicines.addToCartButton')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {filteredMedicines.length === 0 && (
            <Card className="flex flex-col items-center justify-center p-8 text-center">
                <CardHeader>
                    <CardTitle>{t('medicines.notFound.title')}</CardTitle>
                    <CardDescription>
                        {t('medicines.notFound.description', { searchTerm: searchTerm })}
                    </CardDescription>
                </CardHeader>
            </Card>
        )}
      </main>
    </>
  );
}
