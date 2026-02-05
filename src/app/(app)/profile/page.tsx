'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type FamilyMemberProfile = {
  memberId: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  hasAllergies: boolean;
  allergyDetails: string;
  phone: string;
};

type PatientProfile = {
  accountId: string;
  memberId: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  hasAllergies: boolean;
  allergyDetails: string;
  phone: string;
  email: string;
  completed?: boolean;
  familyMembers: FamilyMemberProfile[];
};

export default function ProfilePage() {
  const { user, markProfileCompleted } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<PatientProfile>({
    accountId: '',
    memberId: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    hasAllergies: false,
    allergyDetails: '',
    phone: '',
    email: '',
    completed: false,
    familyMembers: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState<Omit<FamilyMemberProfile, 'memberId'>>({
    name: '',
    relationship: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    hasAllergies: false,
    allergyDetails: '',
    phone: '',
  });

  // Load any saved profile for the current user
  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(`patientProfile:${user.email}`);
      if (raw) {
        const saved = JSON.parse(raw) as PatientProfile;
        const completed = !!saved.completed;
        setProfile({
          accountId: saved.accountId || user.accountId || '',
          memberId: saved.memberId || user.memberId || '001',
          name: saved.name || user.name,
          dateOfBirth: saved.dateOfBirth || '',
          gender: saved.gender || '',
          bloodGroup: saved.bloodGroup || '',
          hasAllergies: !!saved.hasAllergies,
          allergyDetails: saved.allergyDetails || '',
          phone: saved.phone || '',
          email: saved.email || user.email,
          completed,
          familyMembers: saved.familyMembers || [],
        });
        setIsProfileDialogOpen(!completed);
      } else {
        setProfile((prev) => ({
          ...prev,
          accountId: user.accountId || '',
          memberId: user.memberId || '001',
          name: user.name,
          email: user.email,
        }));
        // First time login -> show the dialog form
        setIsProfileDialogOpen(true);
      }
    } catch {
      setProfile((prev) => ({
        ...prev,
        accountId: user.accountId || '',
        memberId: user.memberId || '001',
        name: user.name,
        email: user.email,
      }));
      setIsProfileDialogOpen(true);
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <Header title="Profile" />
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

  const isProfileCompleted = !!profile.completed || !!user.hasCompletedProfile;

  const handleChange =
    (field: keyof PatientProfile) =>
    (value: string) => {
      setProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const validateProfile = (): string | null => {
    if (!profile.name.trim()) {
      return 'Please enter your full name.';
    }

    if (!profile.dateOfBirth) {
      return 'Please select your date of birth.';
    }

    if (!profile.gender) {
      return 'Please select your gender.';
    }

    if (!profile.bloodGroup) {
      return 'Please select your blood group.';
    }

    const trimmedPhone = profile.phone.trim();
    if (!trimmedPhone) {
      return 'Please enter your phone number.';
    }

    if (trimmedPhone.length !== 10) {
      return 'Phone number must be 10 digits.';
    }

    if (profile.hasAllergies && !profile.allergyDetails.trim()) {
      return 'Please specify your allergies.';
    }

    return null;
  };

  const validateMember = (member: Omit<FamilyMemberProfile, 'memberId'>): string | null => {
    if (!member.name.trim()) {
      return "Please enter the family member's full name.";
    }

    if (!member.relationship.trim()) {
      return 'Please enter the relationship with the user.';
    }

    if (!member.dateOfBirth) {
      return "Please select the family member's date of birth.";
    }

    if (!member.gender) {
      return "Please select the family member's gender.";
    }

    if (!member.bloodGroup) {
      return "Please select the family member's blood group.";
    }

    const trimmedPhone = member.phone.trim();
    if (!trimmedPhone) {
      return "Please enter the family member's phone number.";
    }

    if (trimmedPhone.length !== 10) {
      return 'Family member phone number must be 10 digits.';
    }

    if (member.hasAllergies && !member.allergyDetails.trim()) {
      return "Please specify the family member's allergies.";
    }

    return null;
  };

  const saveProfile = (target: 'dashboard' | 'none', updated?: PatientProfile) => {
    try {
      setIsSaving(true);
      const base = updated || profile;
      const toSave: PatientProfile = {
        ...base,
        accountId: base.accountId || user.accountId || '',
        memberId: base.memberId || user.memberId || '001',
        name: base.name.trim(),
        phone: base.phone.trim(),
        allergyDetails: base.allergyDetails.trim(),
        email: user.email,
        completed: true,
      };
      localStorage.setItem(`patientProfile:${user.email}`, JSON.stringify(toSave));
      markProfileCompleted();
      setProfile(toSave);
      setIsSaving(false);

      if (target === 'dashboard') {
        router.push('/dashboard');
      } else {
        // stay on profile page and show read-only view
        setIsProfileDialogOpen(false);
      }
    } catch {
      setIsSaving(false);
      setError('There was a problem saving your profile. Please try again.');
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

    const target: 'dashboard' | 'none' = isProfileCompleted ? 'none' : 'dashboard';
    saveProfile(target);
  };

  const openAddMemberDialog = () => {
    setNewMember({
      name: '',
      relationship: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      hasAllergies: false,
      allergyDetails: '',
      phone: '',
    });
    setIsMemberDialogOpen(true);
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateMember(newMember);
    if (validationError) {
      setError(validationError);
      return;
    }

    const existingIds = [
      profile.memberId,
      ...profile.familyMembers.map((m) => m.memberId),
    ].filter(Boolean) as string[];

    const nextNumeric =
      existingIds.length > 0
        ? Math.max(...existingIds.map((id) => parseInt(id, 10) || 0)) + 1
        : 2; // 001 reserved for primary member

    const memberId = String(nextNumeric).padStart(3, '0');

    const updatedProfile: PatientProfile = {
      ...profile,
      familyMembers: [
        ...profile.familyMembers,
        {
          memberId,
          name: newMember.name.trim(),
          relationship: newMember.relationship.trim(),
          dateOfBirth: newMember.dateOfBirth,
          gender: newMember.gender,
          bloodGroup: newMember.bloodGroup,
          hasAllergies: newMember.hasAllergies,
          allergyDetails: newMember.allergyDetails.trim(),
          phone: newMember.phone.trim(),
        },
      ],
    };

    setProfile(updatedProfile);
    saveProfile('none', updatedProfile);
    setIsMemberDialogOpen(false);
  };

  const hasFamilyMembers = profile.familyMembers && profile.familyMembers.length > 0;

  return (
    <>
      <Header title="My Profile" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card className="max-w-3xl mx-auto shadow-sm">
          <CardHeader className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Avatar className="w-full h-full text-3xl">
                <AvatarFallback>{profile.name ? profile.name.charAt(0) : user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="font-headline text-3xl">{profile.name || user.name}</CardTitle>
            <CardDescription>
              <p>{user.email}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1 rounded-lg border bg-muted/40 p-4">
                  <p className="text-sm font-semibold">Patient Details</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name: </span>
                      <span>{profile.name}</span>
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth: </span>
                      <span>{profile.dateOfBirth}</span>
                    </p>
                    <p>
                      <span className="font-medium">Gender: </span>
                      <span>{profile.gender}</span>
                    </p>
                    <p>
                      <span className="font-medium">Blood Group: </span>
                      <span>{profile.bloodGroup}</span>
                    </p>
                    <p>
                      <span className="font-medium">Allergies: </span>
                      <span>
                        {profile.hasAllergies
                          ? profile.allergyDetails || 'Yes'
                          : 'No'}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Phone Number: </span>
                      <span>{profile.phone}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-2 rounded-lg border bg-muted/40 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Family Members</p>
                    <Button size="sm" variant="outline" onClick={openAddMemberDialog}>
                      Add Member
                    </Button>
                  </div>
                  {hasFamilyMembers ? (
                    <div className="grid gap-3">
                      {profile.familyMembers.map((member) => (
                        <div
                          key={member.memberId}
                          className="rounded-md border bg-background p-3 text-sm space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{member.name}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Relation: {member.relationship}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            {member.dateOfBirth && <span>DOB: {member.dateOfBirth}</span>}
                            {member.gender && <span>Gender: {member.gender}</span>}
                            {member.bloodGroup && <span>Blood: {member.bloodGroup}</span>}
                            {member.phone && <span>Phone: {member.phone}</span>}
                          </div>
                          {member.hasAllergies && (
                            <p className="text-xs text-red-600">
                              Allergies: {member.allergyDetails || 'Yes'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No family members added yet.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2 border-t mt-2 pt-4">
                <Button variant="outline" onClick={() => setIsProfileDialogOpen(true)}>
                  Edit Profile
                </Button>
                <Button size="sm" variant="outline" onClick={openAddMemberDialog}>
                  Add Member
                </Button>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </CardContent>
        </Card>

        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle>{isProfileCompleted ? 'Edit Profile' : 'Complete Your Profile'}</DialogTitle>
                <DialogDescription>
                  Please fill in your personal details. You need to complete these fields before using the app.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleChange('name')(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth')(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={profile.gender}
                      onValueChange={(value) => handleChange('gender')(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <Select
                      value={profile.bloodGroup}
                      onValueChange={(value) => handleChange('bloodGroup')(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allergies</Label>
                  <RadioGroup
                    value={profile.hasAllergies ? 'yes' : 'no'}
                    onValueChange={(value) =>
                      setProfile((prev) => ({
                        ...prev,
                        hasAllergies: value === 'yes',
                        allergyDetails: value === 'yes' ? prev.allergyDetails : '',
                      }))
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="allergy-no" />
                      <Label htmlFor="allergy-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="allergy-yes" />
                      <Label htmlFor="allergy-yes">Yes</Label>
                    </div>
                  </RadioGroup>
                </div>

                {profile.hasAllergies && (
                  <div className="space-y-2">
                    <Label htmlFor="allergy-details">What are you allergic to?</Label>
                    <Input
                      id="allergy-details"
                      value={profile.allergyDetails}
                      onChange={(e) => handleChange('allergyDetails')(e.target.value)}
                      placeholder="e.g. Penicillin, peanuts, dust..."
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="\d{10}"
                    value={profile.phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                      handleChange('phone')(digitsOnly);
                    }}
                    placeholder="Enter your 10-digit phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={user.email} readOnly />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProfileDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving
                    ? 'Saving...'
                    : isProfileCompleted
                      ? 'Save Changes'
                      : 'Save & Continue to Dashboard'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleAddMemberSubmit}>
              <DialogHeader>
                <DialogTitle>Add Family Member</DialogTitle>
                <DialogDescription>
                  Add a family member to this account. Each member will have a unique Member ID under the same Account ID.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="member-name">Full Name</Label>
                    <Input
                      id="member-name"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-relationship">Relationship</Label>
                    <Input
                      id="member-relationship"
                      value={newMember.relationship}
                      onChange={(e) =>
                        setNewMember((prev) => ({ ...prev, relationship: e.target.value }))
                      }
                      placeholder="e.g. Spouse, Son, Mother"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="member-dob">Date of Birth</Label>
                    <Input
                      id="member-dob"
                      type="date"
                      value={newMember.dateOfBirth}
                      onChange={(e) =>
                        setNewMember((prev) => ({ ...prev, dateOfBirth: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={newMember.gender}
                      onValueChange={(value) =>
                        setNewMember((prev) => ({ ...prev, gender: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Blood Group</Label>
                    <Select
                      value={newMember.bloodGroup}
                      onValueChange={(value) =>
                        setNewMember((prev) => ({ ...prev, bloodGroup: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-phone">Phone Number</Label>
                    <Input
                      id="member-phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="\d{10}"
                      value={newMember.phone}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setNewMember((prev) => ({ ...prev, phone: digitsOnly }));
                      }}
                      placeholder="10-digit phone number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Allergies</Label>
                  <RadioGroup
                    value={newMember.hasAllergies ? 'yes' : 'no'}
                    onValueChange={(value) =>
                      setNewMember((prev) => ({
                        ...prev,
                        hasAllergies: value === 'yes',
                        allergyDetails: value === 'yes' ? prev.allergyDetails : '',
                      }))
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="member-allergy-no" />
                      <Label htmlFor="member-allergy-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="member-allergy-yes" />
                      <Label htmlFor="member-allergy-yes">Yes</Label>
                    </div>
                  </RadioGroup>
                </div>
                {newMember.hasAllergies && (
                  <div className="space-y-2">
                    <Label htmlFor="member-allergy-details">What are they allergic to?</Label>
                    <Input
                      id="member-allergy-details"
                      value={newMember.allergyDetails}
                      onChange={(e) =>
                        setNewMember((prev) => ({ ...prev, allergyDetails: e.target.value }))
                      }
                      placeholder="e.g. Penicillin, peanuts, dust..."
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsMemberDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Member</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
