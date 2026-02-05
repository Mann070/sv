'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Star, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';

const diagnosticData = [
  {
    testName: 'MRI Brain Scan',
    center: 'HealthView Diagnostics',
    price: 7500,
    qualityScore: 4.8,
    location: 'Delhi',
  },
  {
    testName: 'MRI Brain Scan',
    center: 'Precision Scans',
    price: 8000,
    qualityScore: 4.5,
    location: 'Delhi',
  },
  {
    testName: 'MRI Brain Scan',
    center: 'City Imaging Center',
    price: 7200,
    qualityScore: 4.2,
    location: 'Delhi',
  },
  {
    testName: 'CT Scan (Abdomen)',
    center: 'HealthView Diagnostics',
    price: 4500,
    qualityScore: 4.8,
    location: 'Delhi',
  },
  {
    testName: 'CT Scan (Abdomen)',
    center: 'City Imaging Center',
    price: 4200,
    qualityScore: 4.2,
    location: 'Delhi',
  },
  {
    testName: 'Complete Blood Count (CBC)',
    center: 'Pathology Labs United',
    price: 400,
    qualityScore: 4.9,
    location: 'Mumbai',
  },
  {
    testName: 'Complete Blood Count (CBC)',
    center: 'AccuPath Labs',
    price: 350,
    qualityScore: 4.7,
    location: 'Mumbai',
  },
  {
    testName: 'Thyroid Profile (T3, T4, TSH)',
    center: 'HealthView Diagnostics',
    price: 600,
    qualityScore: 4.8,
    location: 'Delhi',
  },
  {
    testName: 'Thyroid Profile (T3, T4, TSH)',
    center: 'AccuPath Labs',
    price: 550,
    qualityScore: 4.7,
    location: 'Mumbai',
  },
  {
    testName: 'Ultrasound (Abdomen)',
    center: 'City Imaging Center',
    price: 1500,
    qualityScore: 4.2,
    location: 'Delhi',
  },
  {
    testName: 'Ultrasound (Abdomen)',
    center: 'Precision Scans',
    price: 1650,
    qualityScore: 4.5,
    location: 'Delhi',
  },
];

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });
};

const QualityScore = ({ score }: { score: number }) => {
  const fullStars = Math.floor(score);
  const halfStar = score % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-4 h-4 text-amber-500 fill-amber-500"
        />
      ))}
      {halfStar && (
        <Star
          key="half"
          className="w-4 h-4 text-amber-500 fill-amber-500"
          style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-muted-foreground/50"
        />
      ))}
      <span className="ml-2 text-xs text-muted-foreground">
        ({score.toFixed(1)})
      </span>
    </div>
  );
};

type SortableKeys = 'price' | 'qualityScore';
type SortDirection = 'ascending' | 'descending';

type DiagnosticItem = typeof diagnosticData[0];

const ComparisonTable = ({
  testName,
  items,
}: {
  testName: string;
  items: DiagnosticItem[];
}) => {
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: SortDirection;
  } | null>({ key: 'price', direction: 'ascending' });

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: SortDirection = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{testName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('diagnostics.table.center')}</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort('qualityScore')}
                >
                  {t('diagnostics.table.quality')}
                  {getSortIcon('qualityScore')}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" onClick={() => requestSort('price')}>
                  {t('diagnostics.table.price')}
                  {getSortIcon('price')}
                </Button>
              </TableHead>
              <TableHead className="text-center">
                {t('diagnostics.table.action')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedItems.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>{row.center}</div>
                  <div className="text-xs text-muted-foreground">
                    {row.location}
                  </div>
                </TableCell>
                <TableCell>
                  <QualityScore score={row.qualityScore} />
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="default" className="text-base">
                    <IndianRupeeIcon size={16} className="mr-1" />
                    {formatCurrency(row.price)}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="outline" size="sm">
                    {t('diagnostics.table.bookButton')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default function DiagnosticsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const groupedResults = useMemo(() => {
    if (!searchTerm) {
      return {};
    }
    const filteredData = diagnosticData.filter((item) =>
      item.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredData.reduce((acc, item) => {
      (acc[item.testName] = acc[item.testName] || []).push(item);
      return acc;
    }, {} as Record<string, DiagnosticItem[]>);
  }, [searchTerm]);

  const hasResults = Object.keys(groupedResults).length > 0;

  return (
    <>
      <Header title={t('diagnostics.headerTitle')} />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              {t('diagnostics.pageTitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('diagnostics.pageDescription')}
            </p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('diagnostics.searchPlaceholder')}
              className="pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {!searchTerm && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground p-8">
                {t('diagnostics.searchPrompt')}
              </div>
            </CardContent>
          </Card>
        )}

        {searchTerm && !hasResults && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground p-8">
                {t('diagnostics.notFound')}
              </div>
            </CardContent>
          </Card>
        )}

        {hasResults && (
          <div className="space-y-8">
            {Object.entries(groupedResults).map(([testName, items]) => (
              <ComparisonTable
                key={testName}
                testName={testName}
                items={items}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
