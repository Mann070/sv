'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type DoctorProfileData = {
  name: string;
  specialization: string;
  hospital: string;
  experience: string;
  bio: string;
  phone: string;
  licenseNumber: string;
  completed?: boolean;
};

export default function DoctorProfilePage() {
  const { user, markProfileCompleted } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<DoctorProfileData>({
    name: '',
    specialization: '',
    hospital: '',
    experience: '',
    bio: '',
    phone: '',
    licenseNumber: '',
    completed: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  // Load existing profile
  useEffect(() => {
    if (!user) return;
    try {
      const storedProfile = localStorage.getItem(`doctorProfile:${user.email}`);
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile({
          name: parsed.name || user.name || '',
          specialization: parsed.specialization || '',
          hospital: parsed.hospital || '',
          experience: parsed.experience || '',
          bio: parsed.bio || '',
          phone: parsed.phone || '',
          licenseNumber: parsed.licenseNumber || '',
          completed: !!parsed.completed,
        });
        setIsProfileDialogOpen(!parsed.completed);
      } else {
        // Init from user object
        setProfile((prev) => ({
          ...prev,
          name: user.name || '',
          completed: false,
        }));
        setIsProfileDialogOpen(true);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      // Fallback
      setProfile((prev) => ({ ...prev, name: user.name || '' }));
      setIsProfileDialogOpen(true);
    }
  }, [user]);

  if (!user) {
     return (
      <>
        <Header title="Doctor Profile" />
        <main className="flex-1 space-y-8 p-4 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please sign in to view your profile.</p>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  const handleChange = (field: keyof DoctorProfileData) => (value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const validateProfile = (): string | null => {
    if (!profile.name.trim()) return 'Name is required.';
    if (!profile.specialization.trim()) return 'Specialization is required.';
    if (!profile.hospital.trim()) return 'Hospital name is required.';
    if (!profile.licenseNumber.trim()) return 'Medical License Number is required.';
    if (!profile.phone.trim()) return 'Phone number is required.';
    if (profile.phone.trim().length !== 10) return 'Phone number must be 10 digits.';
    return null;
  };

  const saveProfile = (target: 'dashboard' | 'none') => {
    try {
      setIsSaving(true);
      const toSave = {
        ...profile,
        email: user.email,
        completed: true,
      };
      
      localStorage.setItem(`doctorProfile:${user.email}`, JSON.stringify(toSave));
      
      // Update global doctors list for discovery
      const rawDocs = localStorage.getItem('doctors');
      const docs = rawDocs ? JSON.parse(rawDocs) : [];
      const docIndex = docs.findIndex((d: any) => d.email === user.email);
      
      const newDocEntry = {
        value: user.email.split('@')[0],
        label: profile.name,
        name: profile.name,
        speciality: profile.specialization,
        hospital: profile.hospital,
        experience: profile.experience,
        email: user.email,
        phone: profile.phone,
        bio: profile.bio,
        licenseNumber: profile.licenseNumber
      };

      if (docIndex >= 0) {
        docs[docIndex] = { ...docs[docIndex], ...newDocEntry };
      } else {
        docs.push(newDocEntry);
      }
      localStorage.setItem('doctors', JSON.stringify(docs));

      markProfileCompleted();
      setIsSaving(false);
      
      if (target === 'dashboard') {
        router.push('/doctor/dashboard');
      } else {
        setIsProfileDialogOpen(false);
      }
    } catch (err) {
      console.error('Save error:', err);
      setIsSaving(false);
      setError('Failed to save profile. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationError = validateProfile();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // If not completed, we definitely go to dashboard after save
    // If already completed (editing), we stay here
    const isCompleted = !!profile.completed;
    saveProfile(isCompleted ? 'none' : 'dashboard');
  };

  return (
    <>
      <Header title="My Profile" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card className="max-w-3xl mx-auto shadow-sm">
          <CardHeader className="text-center">
             <div className="relative w-24 h-24 mx-auto mb-4">
              <Avatar className="w-full h-full text-3xl">
                <AvatarFallback>{profile.name ? profile.name.charAt(0) : 'D'}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="font-headline text-3xl">{profile.name}</CardTitle>
            <CardDescription>
              <p>{profile.specialization} at {profile.hospital}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                 <div className="space-y-1 rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm font-semibold mb-3">Professional Details</p>
                    <div className="space-y-2 text-sm">
                       <p><span className="font-medium">License:</span> {profile.licenseNumber}</p>
                       <p><span className="font-medium">Speciality:</span> {profile.specialization}</p>
                       <p><span className="font-medium">Hospital:</span> {profile.hospital}</p>
                       <p><span className="font-medium">Experience:</span> {profile.experience ? `${profile.experience} years` : 'N/A'}</p>
                    </div>
                 </div>
                 <div className="space-y-1 rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm font-semibold mb-3">Contact Information</p>
                    <div className="space-y-2 text-sm">
                       <p><span className="font-medium">Email:</span> {user.email}</p>
                       <p><span className="font-medium">Phone:</span> {profile.phone}</p>
                    </div>
                 </div>
              </div>

              {profile.bio && (
                <div className="rounded-lg border bg-muted/40 p-4">
                  <p className="text-sm font-semibold mb-2">Bio</p>
                  <p className="text-sm text-gray-700">{profile.bio}</p>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button onClick={() => setIsProfileDialogOpen(true)}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle>{profile.completed ? 'Edit Profile' : 'Complete Your Profile'}</DialogTitle>
                <DialogDescription>
                  Please ensure your details are up to date.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => handleChange('name')(e.target.value)}
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input 
                        id="specialization" 
                        value={profile.specialization} 
                        onChange={(e) => handleChange('specialization')(e.target.value)}
                        placeholder="e.g. Cardiologist"
                      />
                   </div>
                   <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input 
                        id="license" 
                        value={profile.licenseNumber} 
                        onChange={(e) => handleChange('licenseNumber')(e.target.value)}
                        placeholder="Medical License #"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hospital">Hospital / Clinic</Label>
                  <Input 
                    id="hospital" 
                    value={profile.hospital} 
                    onChange={(e) => handleChange('hospital')(e.target.value)}
                    placeholder="e.g. City General Hospital"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <Label htmlFor="experience">Experience (Years)</Label>
                      <Input 
                        id="experience" 
                        value={profile.experience}
                        onChange={(e) => handleChange('experience')(e.target.value)}
                        placeholder="e.g. 10"
                      />
                   </div>
                   <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={profile.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange('phone')(val);
                        }}
                        placeholder="10-digit number"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleChange('bio')(e.target.value)}
                    placeholder="Tell us a bit about yourself..."
                    rows={3}
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <DialogFooter>
                 {!profile.completed && (
                   // Prevent closing if not completed
                   <></>
                 )}
                 {profile.completed && (
                   <Button type="button" variant="outline" onClick={() => setIsProfileDialogOpen(false)}>
                     Cancel
                   </Button>
                 )}
                 <Button type="submit" disabled={isSaving}>
                   {isSaving ? 'Saving...' : 'Save Profile'}
                 </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
