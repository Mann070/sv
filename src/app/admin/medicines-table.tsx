'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext, type Medicine } from '@/context/AppContext';
import { AnimatedPlusCircleIcon } from '@/components/ui/animated-plus-circle-icon';
import { useToast } from '@/hooks/use-toast';
import { Bell, Trash2 } from 'lucide-react';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import { Badge } from '@/components/ui/badge';

export function MedicinesTable() {
  const { medicines, addMedicine, updateMedicine, deleteMedicine } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const { toast } = useToast();

  const handleSaveMedicine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const medicineData: Medicine = {
      name: formData.get('name') as string,
      manufacturer: formData.get('manufacturer') as string,
      packSize: formData.get('packSize') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string, 10),
    };

    if (editingMedicine) {
      updateMedicine(medicineData);
      toast({
        title: 'Medicine Updated',
        description: `${medicineData.name}'s details have been updated.`,
      });
    } else {
      addMedicine(medicineData);
      toast({
        title: 'Medicine Added',
        description: `${medicineData.name} has been added to the list.`,
      });
    }

    setEditingMedicine(null);
    setIsDialogOpen(false);
  };

  const handleEditClick = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setIsDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingMedicine(null);
    setIsDialogOpen(true);
  };
  
  const handleDeleteMedicine = (name: string) => {
      deleteMedicine(name);
      toast({
          title: 'Medicine Deleted',
          description: 'The medicine has been removed from the list.',
          variant: 'destructive',
      });
  }

  const handleNotifyPharmacist = (medicineName: string) => {
    toast({
        title: 'Notification Sent',
        description: `The pharmacist has been notified to restock ${medicineName}.`,
    })
  }

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  const getStockBadgeVariant = (stock: number): "default" | "secondary" | "destructive" => {
    if (stock > 20) return "default";
    if (stock > 10) return "secondary";
    return "destructive";
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNewClick}>
          <AnimatedPlusCircleIcon className="mr-2" />
          Add New Medicine
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Price (INR)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((med) => (
              <TableRow key={med.name}>
                <TableCell className="font-medium">{med.name}</TableCell>
                <TableCell>{med.manufacturer}</TableCell>
                <TableCell>
                    <Badge variant={getStockBadgeVariant(med.stock)}>
                        {med.stock} units
                    </Badge>
                </TableCell>
                <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-1">
                        <IndianRupeeIcon className="h-4 w-4" />
                        {formatCurrency(med.price)}
                    </div>
                </TableCell>
                <TableCell className="text-right">
                    {med.stock <= 20 && (
                        <Button variant="ghost" size="sm" onClick={() => handleNotifyPharmacist(med.name)}>
                            <Bell className="h-4 w-4 text-amber-500" />
                        </Button>
                    )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(med)}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteMedicine(med.name)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSaveMedicine}>
          <DialogHeader>
            <DialogTitle>
              {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
            </DialogTitle>
            <DialogDescription>
              {editingMedicine
                ? `Update the details for ${editingMedicine.name}.`
                : 'Fill in the details for the new medicine.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingMedicine?.name}
                required
                readOnly={!!editingMedicine}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                name="manufacturer"
                defaultValue={editingMedicine?.manufacturer}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packSize">Pack Size</Label>
              <Input
                id="packSize"
                name="packSize"
                defaultValue={editingMedicine?.packSize}
              />
            </div>
            <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                    id="stock"
                    name="stock"
                    type="number"
                    defaultValue={editingMedicine?.stock}
                    required
                />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="price">Price (INR)</Label>
              <div className="relative">
                <IndianRupeeIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingMedicine?.price}
                  required
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {editingMedicine ? 'Save Changes' : 'Add Medicine'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
