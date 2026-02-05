
'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatedPlusCircleIcon } from '@/components/ui/animated-plus-circle-icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from '@/context/LanguageContext';

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export default function AppointmentsPage() {
  const { upcomingAppointments, pastAppointments, doctors, addAppointment, cancelAppointment } = useAppContext();
  const { t } = useTranslation();
  
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [selectedDoctorValue, setSelectedDoctorValue] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleConfirmAppointment = () => {
    if (!patientName || !selectedDoctorValue || !date || !time) {
        toast({
            title: t('appointments.toast.incompleteTitle'),
            description: t('appointments.toast.incompleteDescription'),
            variant: 'destructive',
        });
        return;
    }

    const doctorInfo = doctors.find(d => d.value === selectedDoctorValue);
    if (!doctorInfo) return;

    const newAppointment = {
        doctor: patientName ? `${doctorInfo.name} (for ${patientName})` : doctorInfo.name,
        speciality: doctorInfo.speciality,
        time: `${format(date, 'MMMM d, yyyy')} at ${time}`,
        hospital: doctorInfo.hospital,
    };
    
    addAppointment(newAppointment);

    toast({
      title: t('appointments.toast.bookedTitle'),
      description: t('appointments.toast.bookedDescription'),
      variant: 'default',
    });
    
    setIsDialogOpen(false); 
    setPatientName('');
    setSelectedDoctorValue('');
    setDate(undefined);
    setTime('');
  };
  
  const handleCancelAppointment = (indexToCancel: number) => {
    cancelAppointment(indexToCancel);
    toast({
        title: t('appointments.toast.canceledTitle'),
        description: t('appointments.toast.canceledDescription'),
        variant: 'default',
      });
  };

  const doctorOptions = doctors.map(d => ({
      value: d.value,
      label: `${d.name} (${d.speciality})`,
  }));

  return (
    <>
      <Header title={t('appointments.headerTitle')} />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              {t('appointments.pageTitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('appointments.pageDescription')}
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <AnimatedPlusCircleIcon className="mr-2 h-4 w-4" />
                {t('appointments.bookButton')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t('appointments.dialog.title')}</DialogTitle>
                <DialogDescription>
                  {t('appointments.dialog.description')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="patient">{t('appointments.dialog.patientNameLabel')}</Label>
                  <Input id="patient" placeholder={t('appointments.dialog.patientNamePlaceholder')} value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="doctor">{t('appointments.dialog.doctorLabel')}</Label>
                  <Select value={selectedDoctorValue} onValueChange={setSelectedDoctorValue}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('appointments.dialog.doctorPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {doctorOptions.map(doc => (
                        <SelectItem key={doc.value} value={doc.value}>{doc.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="date">{t('appointments.dialog.dateLabel')}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>{t('appointments.dialog.datePlaceholder')}</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="time">{t('appointments.dialog.timeLabel')}</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('appointments.dialog.timePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    {t('common.cancel')}
                  </Button>
                </DialogClose>
                <Button type="submit" onClick={handleConfirmAppointment}>{t('appointments.dialog.confirmButton')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('appointments.upcoming.title')}</CardTitle>
            <CardDescription>
              {t('appointments.upcoming.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.length === 0 ? (
                <div className="text-center text-muted-foreground p-8">{t('appointments.upcoming.none')}</div>
            ) : (
                upcomingAppointments.map((appt, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg flex flex-wrap justify-between items-center gap-4"
              >
                <div>
                  <p className="font-semibold text-lg">{appt.doctor}</p>
                  <p className="text-muted-foreground">{appt.speciality}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">{appt.time}</p>
                  <p className="text-muted-foreground">{appt.hospital}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">{t('common.reschedule')}</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost">{t('common.cancel')}</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('common.areYouSure')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('appointments.cancelDialogDescription')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t('common.goBack')}</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleCancelAppointment(i)}>
                          {t('common.yesCancel')}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('appointments.past.title')}</CardTitle>
            <CardDescription>
              {t('appointments.past.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastAppointments.map((appt, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{appt.doctor}</p>
                  <p className="text-muted-foreground">{appt.speciality}</p>
                  <p className="text-sm text-muted-foreground">
                    {appt.time} at {appt.hospital}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">{t('appointments.past.viewReport')}</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-headline text-2xl">
                        {t('appointments.report.title')}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('appointments.report.subtitle', {doctor: appt.doctor, time: appt.time})}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Separator />
                    <div className="space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="font-semibold text-muted-foreground">
                            {t('appointments.report.patientName')}
                          </p>
                          <p>{appt.report.patient}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">
                            {t('appointments.report.age')}
                          </p>
                          <p>{appt.report.age}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">
                            {t('appointments.report.gender')}
                          </p>
                          <p>{appt.report.gender}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          {t('appointments.report.diagnosis')}
                        </p>
                        <p className="font-bold text-primary">
                          {appt.report.diagnosis}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          {t('appointments.report.notes')}
                        </p>
                        <p>{appt.report.notes}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          {t('appointments.report.prescription')}
                        </p>
                        <p>{appt.report.prescription}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          {t('appointments.report.followUp')}
                        </p>
                        <p>{appt.report.followUp}</p>
                      </div>
                    </div>
                    <Separator />
                    <AlertDialogFooter>
                      <AlertDialogAction>{t('common.close')}</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
