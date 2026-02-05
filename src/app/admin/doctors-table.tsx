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
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext, type Doctor } from '@/context/AppContext';
import { AnimatedPlusCircleIcon } from '@/components/ui/animated-plus-circle-icon';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

export function DoctorsTable() {
  const { doctors, addDoctor, updateDoctor, deleteDoctor } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const { toast } = useToast();

  const handleSaveDoctor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const doctorData: Doctor = {
      value:
        editingDoctor?.value ||
        `doc-${Math.random().toString(36).substring(2, 9)}`,
      name: formData.get('name') as string,
      speciality: formData.get('speciality') as string,
      hospital: formData.get('hospital') as string,
      experience: formData.get('experience') as string,
      languages: formData.get('languages') as string,
      availability: formData.get('availability') as string,
      avatarSeed:
        editingDoctor?.avatarSeed ||
        `seed${Math.floor(Math.random() * 1000)}`,
    };

    if (editingDoctor) {
      updateDoctor(doctorData);
      toast({
        title: 'Doctor Updated',
        description: `${doctorData.name}'s details have been updated.`,
      });
    } else {
      addDoctor(doctorData);
      toast({
        title: 'Doctor Added',
        description: `${doctorData.name} has been added to the list.`,
      });
    }

    setEditingDoctor(null);
    setIsDialogOpen(false);
  };

  const handleEditClick = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsDialogOpen(true);
  };
  
  const handleAddNewClick = () => {
    setEditingDoctor(null);
    setIsDialogOpen(true);
  };

  const handleDeleteDoctor = (value: string) => {
    deleteDoctor(value);
    toast({
      title: 'Doctor Deleted',
      description: 'The doctor has been removed from the list.',
      variant: 'destructive',
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNewClick}>
          <AnimatedPlusCircleIcon className="mr-2" />
          Add New Doctor
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.value}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.speciality}</TableCell>
                <TableCell>{doctor.availability}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditClick(doctor)}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteDoctor(doctor.value)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSaveDoctor}>
          <DialogHeader>
            <DialogTitle>
              {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
            </DialogTitle>
            <DialogDescription>
              {editingDoctor
                ? `Update the details for ${editingDoctor.name}.`
                : 'Fill in the details for the new doctor.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingDoctor?.name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="speciality">Speciality</Label>
              <Input
                id="speciality"
                name="speciality"
                defaultValue={editingDoctor?.speciality}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospital">Hospital</Label>
              <Input
                id="hospital"
                name="hospital"
                defaultValue={editingDoctor?.hospital}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                name="experience"
                defaultValue={editingDoctor?.experience}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Input
                id="languages"
                name="languages"
                defaultValue={editingDoctor?.languages}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                name="availability"
                defaultValue={editingDoctor?.availability}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {editingDoctor ? 'Save Changes' : 'Add Doctor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
