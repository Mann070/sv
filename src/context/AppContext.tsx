
'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { useTranslation } from './LanguageContext';

// Data Types
export type Appointment = {
  doctor: string;
  speciality: string;
  time: string;
  hospital: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
};

export type PastAppointment = Appointment & {
  report: {
    patient: string;
    age: number;
    gender: string;
    diagnosis: string;
    notes: string;
    prescription: string;
    followUp: string;
  };
};

export type Doctor = {
  value: string;
  name: string;
  speciality: string;
  hospital: string;
  experience: string;
  languages: string;
  availability: string;
  avatarSeed: string;
  email?: string; // Added email for linkage
};

export type Medicine = {
  name: string;
  manufacturer: string;
  packSize: string;
  price: number;
  stock: number;
};

export type FamilyMember = {
  name: string;
  relationship: string;
  age: number;
  avatarSeed: string;
};

// Context Type
type AppContextType = {
  upcomingAppointments: Appointment[];
  pastAppointments: PastAppointment[];
  doctors: Doctor[];
  medicines: Medicine[];
  familyMembers: FamilyMember[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (index: number) => void;
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (doctor: Doctor) => void;
  deleteDoctor: (value: string) => void;
  addMedicine: (medicine: Medicine) => void;
  updateMedicine: (medicine: Medicine) => void;
  deleteMedicine: (name: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'avatarSeed'>) => void;
  deleteFamilyMember: (name: string) => void;
};

// Context Initialization
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const initialUpcomingAppointments: Appointment[] = useMemo(() => [
    {
      doctor: t('appointments.upcoming.0.doctor'),
      speciality: t('appointments.upcoming.0.speciality'),
      time: t('appointments.upcoming.0.time'),
      hospital: t('appointments.upcoming.0.hospital'),
      patientName: "Rahul Kumar",
      patientAge: 35,
      patientGender: "Male"
    },
    {
      doctor: t('appointments.upcoming.1.doctor'),
      speciality: t('appointments.upcoming.1.speciality'),
      time: t('appointments.upcoming.1.time'),
      hospital: t('appointments.upcoming.1.hospital'),
      patientName: "Sita Devi",
      patientAge: 29,
      patientGender: "Female"
    },
    {
      doctor: t('appointments.upcoming.2.doctor'),
      speciality: t('appointments.upcoming.2.speciality'),
      time: t('appointments.upcoming.2.time'),
      hospital: t('appointments.upcoming.2.hospital'),
      patientName: "Aarav Kumar",
      patientAge: 12,
      patientGender: "Male"
    },
  ], [t]);

  const initialPastAppointments: PastAppointment[] = useMemo(() => [
    {
      doctor: t('appointments.past.0.doctor'),
      speciality: t('appointments.past.0.speciality'),
      time: t('appointments.past.0.time'),
      hospital: t('appointments.past.0.hospital'),
      patientName: "Rohan Sharma",
      patientAge: 42,
      patientGender: "Male",
      report: {
        patient: "Rohan Sharma",
        age: 42,
        gender: t('appointments.past.0.report.gender'),
        diagnosis: t('appointments.past.0.report.diagnosis'),
        notes: t('appointments.past.0.report.notes'),
        prescription: t('appointments.past.0.report.prescription'),
        followUp: t('appointments.past.0.report.followUp'),
      },
    },
  ], [t]);

  const initialDoctors: Doctor[] = useMemo(() => [
    { value: 'dr-sharma', name: 'Dr. Anjali Sharma', speciality: 'Cardiologist', hospital: 'Apollo Hospital, Delhi', experience: "15 years", languages: "English, Hindi", availability: "Available Now", avatarSeed: "doc1" },
    { value: 'dr-reddy', name: 'Dr. Arjun Reddy', speciality: 'Cardiologist', hospital: 'Fortis Hospital, Delhi', experience: "12 years", languages: "English, Telugu", availability: "Available tomorrow", avatarSeed: "doc2" },
    { value: 'dr-singh', name: 'Dr. Vikram Singh', speciality: 'Dermatologist', hospital: 'Fortis Clinic, Mumbai', experience: "10 years", languages: "English, Hindi", availability: "Available Now", avatarSeed: "doc3" },
    { value: 'dr-gupta', name: 'Dr. Isha Gupta', speciality: 'Dermatologist', hospital: 'Max Healthcare, Mumbai', experience: "8 years", languages: "English, Hindi, Marathi", availability: "Available in 30 mins", avatarSeed: "doc4" },
    { value: 'dr-mehta', name: 'Dr. Priya Mehta', speciality: 'Pediatrician', hospital: 'Max Healthcare, Bangalore', experience: "12 years", languages: "English, Hindi", availability: "Available tomorrow", avatarSeed: "doc5" },
    { value: 'dr-khan', name: 'Dr. Sameer Khan', speciality: 'Pediatrician', hospital: "Rainbow Children's Hospital, Bangalore", experience: "9 years", languages: "English, Hindi, Kannada", availability: "Available Now", avatarSeed: "doc6" },
    { value: 'dr-desai', name: 'Dr. Rohan Desai', speciality: 'Orthopedist', hospital: 'City Hospital, Pune', experience: "14 years", languages: "English, Marathi", availability: "Available Now", avatarSeed: "doc7" },
    { value: 'dr-verma', name: 'Dr. Alok Verma', speciality: 'Orthopedist', hospital: 'Sancheti Hospital, Pune', experience: "11 years", languages: "English, Hindi", availability: "Available in 20 mins", avatarSeed: "doc8" },
    { value: 'dr-iyer', name: 'Dr. Meera Iyer', speciality: 'Psychiatrist', hospital: 'NIMHANS, Bangalore', experience: "18 years", languages: "English, Tamil, Kannada", availability: "Available tomorrow", avatarSeed: "doc9" },
    { value: 'dr-anand', name: 'Dr. Anand Desai', speciality: 'Psychiatrist', hospital: 'VIMHANS, Delhi', experience: "16 years", languages: "English, Hindi, Gujarati", availability: "Available Now", avatarSeed: "doc10" },
    { value: 'dr-patel', name: 'Dr. Rina Patel', speciality: 'Gynecologist', hospital: 'Cloudnine Hospital, Mumbai', experience: "13 years", languages: "English, Gujarati, Hindi", availability: "Available in 45 mins", avatarSeed: "doc11" },
    { value: 'dr-rao', name: 'Dr. Sunita Rao', speciality: 'Gynecologist', hospital: 'Manipal Hospital, Bangalore', experience: "20 years", languages: "English, Kannada, Telugu", availability: "Available Now", avatarSeed: "doc12" },
  ], [t]);

  const initialMedicines: Medicine[] = useMemo(() => [
    { name: 'Paracetamol 500mg', manufacturer: 'Cipla Ltd.', packSize: '15 tablets', price: 25.5, stock: 150 },
    { name: 'Atorvastatin 10mg', manufacturer: 'Sun Pharma', packSize: '10 tablets', price: 90.0, stock: 80 },
    { name: 'Metformin 500mg', manufacturer: 'Mankind Pharma', packSize: '10 tablets', price: 30.0, stock: 18 },
    { name: 'Amlodipine 5mg', manufacturer: "Dr. Reddy's Labs", packSize: '30 tablets', price: 65.0, stock: 250 },
    { name: 'Omeprazole 20mg', manufacturer: 'Zydus Cadila', packSize: '15 capsules', price: 55.0, stock: 9 },
    { name: 'Levocetirizine 5mg', manufacturer: 'Glenmark Pharma', packSize: '10 tablets', price: 45.0, stock: 75 },
    { name: 'Telmisartan 40mg', manufacturer: 'Lupin Ltd.', packSize: '15 tablets', price: 150.0, stock: 40 },
    { name: 'Azithromycin 500mg', manufacturer: 'Alembic Pharma', packSize: '3 tablets', price: 119.5, stock: 5 },
  ], [t]);

  const initialFamilyMembers: FamilyMember[] = useMemo(() => [
    { name: t('family.members.0.name'), relationship: t('family.members.0.relationship'), age: 38, avatarSeed: 'family1' },
    { name: t('family.members.1.name'), relationship: t('family.members.1.relationship'), age: 12, avatarSeed: 'family2' },
    { name: t('family.members.2.name'), relationship: t('family.members.2.relationship'), age: 8, avatarSeed: 'family3' },
  ], [t]);


  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>(initialUpcomingAppointments);
  const [pastAppointments, setPastAppointments] = useState<PastAppointment[]>(initialPastAppointments);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);

  // Initialize from LocalStorage
  useEffect(() => {
    // Doctors
    const rawDocs = localStorage.getItem('doctors');
    if (rawDocs) {
      setDoctors(JSON.parse(rawDocs));
    } else {
      setDoctors(initialDoctors);
      localStorage.setItem('doctors', JSON.stringify(initialDoctors));
    }

    // Medicines
    const rawMeds = localStorage.getItem('medicines');
    if (rawMeds) setMedicines(JSON.parse(rawMeds));

    // Appointments - sync with localStorage
    const rawUpcoming = localStorage.getItem('upcomingAppointments');
    if (rawUpcoming) {
      const parsed = JSON.parse(rawUpcoming);
      // Basic check to see if we have the new fields (patientName)
      if (parsed.length > 0 && parsed[0].patientName) {
        setUpcomingAppointments(parsed);
      } else {
        setUpcomingAppointments(initialUpcomingAppointments);
        localStorage.setItem('upcomingAppointments', JSON.stringify(initialUpcomingAppointments));
      }
    } else {
      localStorage.setItem('upcomingAppointments', JSON.stringify(initialUpcomingAppointments));
    }

    const rawPast = localStorage.getItem('pastAppointments');
    if (rawPast) {
      setPastAppointments(JSON.parse(rawPast));
    } else {
      localStorage.setItem('pastAppointments', JSON.stringify(initialPastAppointments));
    }

  }, [initialDoctors, initialUpcomingAppointments, initialPastAppointments]);

  // Appointment Management
  const addAppointment = (appointment: Appointment) => {
    setUpcomingAppointments(prev => {
      const updated = [appointment, ...prev];
      localStorage.setItem('upcomingAppointments', JSON.stringify(updated));
      return updated;
    });
  };

  const cancelAppointment = (index: number) => {
    setUpcomingAppointments(prev => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('upcomingAppointments', JSON.stringify(updated));
      return updated;
    });
  };

  // Doctor Management
  const addDoctor = (doctor: Doctor) => {
    setDoctors(prev => {
      const updated = [doctor, ...prev];
      localStorage.setItem('doctors', JSON.stringify(updated));
      return updated;
    });
  };

  const updateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(prev => {
      const updated = prev.map(doc => doc.value === updatedDoctor.value ? updatedDoctor : doc);
      localStorage.setItem('doctors', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteDoctor = (value: string) => {
    setDoctors(prev => {
      const updated = prev.filter(doc => doc.value !== value);
      localStorage.setItem('doctors', JSON.stringify(updated));

      // Also try to remove from users list if possible
      // We might not have email, but if we do or can infer it:
      const rawUsers = localStorage.getItem('users');
      if (rawUsers) {
        const users = JSON.parse(rawUsers);
        // Try to match by value (which is often derived) or name/email if present
        // Best effort deletion from auth users
        const newUsers = users.filter((u: any) => {
          // value is often email.split('@')[0]
          const userValue = u.email.split('@')[0];
          return userValue !== value && u.email !== value; // detailed match
        });
        localStorage.setItem('users', JSON.stringify(newUsers));
      }

      return updated;
    });
  }

  // Medicine Management
  const addMedicine = (medicine: Medicine) => {
    setMedicines(prev => [medicine, ...prev]);
  };

  const updateMedicine = (updatedMedicine: Medicine) => {
    setMedicines(prev => prev.map(med => med.name === updatedMedicine.name ? updatedMedicine : med));
  };

  const deleteMedicine = (name: string) => {
    setMedicines(prev => prev.filter(med => med.name !== name));
  }

  // Family Member Management
  const addFamilyMember = (member: Omit<FamilyMember, 'avatarSeed'>) => {
    const newMember = {
      ...member,
      avatarSeed: `family${Date.now()}${Math.random().toString(36).slice(2, 9)}`
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const deleteFamilyMember = (name: string) => {
    setFamilyMembers(prev => prev.filter(member => member.name !== name));
  };

  return (
    <AppContext.Provider value={{
      upcomingAppointments,
      pastAppointments,
      doctors,
      medicines,
      familyMembers,
      addAppointment,
      cancelAppointment,
      addDoctor,
      updateDoctor,
      deleteDoctor,
      addMedicine,
      updateMedicine,
      deleteMedicine,
      addFamilyMember,
      deleteFamilyMember,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
