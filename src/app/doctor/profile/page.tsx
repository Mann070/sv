"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DoctorSidebar } from "@/components/doctor-sidebar";
import { DoctorHeader } from "@/components/doctor-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DoctorProfile = {
  name: string;
  email: string;
  licenseNumber: string;
  specialization: string;
  experience: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  hospitalAffiliation: string;
  completed?: boolean;
};

export default function DoctorProfilePage() {
  const { user, markProfileCompleted } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<DoctorProfile>({
    name: "",
    email: "",
    licenseNumber: "",
    specialization: "",
    experience: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    hospitalAffiliation: "",
    completed: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    try {
      const raw = localStorage.getItem(`doctorProfile:${user.email}`);
      if (raw) {
        const saved = JSON.parse(raw) as DoctorProfile;
        const completed = !!saved.completed;
        setProfile(saved);
        setIsProfileDialogOpen(!completed);
      } else {
        setProfile((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
        }));
        setIsProfileDialogOpen(true);
      }
    } catch {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
      setIsProfileDialogOpen(true);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please sign in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isProfileCompleted = !!profile.completed || !!user.hasCompletedProfile;

  const handleChange = (field: keyof DoctorProfile) => (value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateProfile = (): string | null => {
    if (!profile.name.trim()) {
      return "Please enter your full name.";
    }

    if (!profile.licenseNumber.trim()) {
      return "Please enter your Medical License Number / Credential ID.";
    }

    if (!profile.specialization.trim()) {
      return "Please select your specialization.";
    }

    if (!profile.experience) {
      return "Please select your years of experience.";
    }

    const trimmedPhone = profile.phone.trim();
    if (!trimmedPhone) {
      return "Please enter your phone number.";
    }

    if (trimmedPhone.length !== 10) {
      return "Phone number must be 10 digits.";
    }

    if (!profile.dateOfBirth) {
      return "Please select your date of birth.";
    }

    if (!profile.gender) {
      return "Please select your gender.";
    }

    if (!profile.hospitalAffiliation.trim()) {
      return "Please enter your hospital/clinic affiliation.";
    }

    return null;
  };

  const saveProfile = (target: "dashboard" | "none") => {
    try {
      setIsSaving(true);
      const toSave: DoctorProfile = {
        ...profile,
        name: profile.name.trim(),
        licenseNumber: profile.licenseNumber.trim(),
        specialization: profile.specialization.trim(),
        phone: profile.phone.trim(),
        hospitalAffiliation: profile.hospitalAffiliation.trim(),
        email: user.email,
        completed: true,
      };
      localStorage.setItem(`doctorProfile:${user.email}`, JSON.stringify(toSave));
      markProfileCompleted();
      setProfile(toSave);
      setIsSaving(false);

      if (target === "dashboard") {
        router.push("/doctor/dashboard");
      } else {
        setIsProfileDialogOpen(false);
      }
    } catch {
      setIsSaving(false);
      setError("There was a problem saving your profile. Please try again.");
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

    const target: "dashboard" | "none" = isProfileCompleted ? "none" : "dashboard";
    saveProfile(target);
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DoctorHeader />

        <main className="flex-1 overflow-y-auto p-6">
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
                    <p className="text-sm font-semibold">Professional Details</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">License Number: </span>
                        <span>{profile.licenseNumber || "Not set"}</span>
                      </p>
                      <p>
                        <span className="font-medium">Specialization: </span>
                        <span>{profile.specialization || "Not set"}</span>
                      </p>
                      <p>
                        <span className="font-medium">Experience: </span>
                        <span>{profile.experience ? `${profile.experience} years` : "Not set"}</span>
                      </p>
                      <p>
                        <span className="font-medium">Hospital: </span>
                        <span>{profile.hospitalAffiliation || "Not set"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 rounded-lg border bg-muted/40 p-4">
                    <p className="text-sm font-semibold">Personal Details</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Date of Birth: </span>
                        <span>{profile.dateOfBirth || "Not set"}</span>
                      </p>
                      <p>
                        <span className="font-medium">Gender: </span>
                        <span>{profile.gender || "Not set"}</span>
                      </p>
                      <p>
                        <span className="font-medium">Phone: </span>
                        <span>{profile.phone || "Not set"}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2 border-t mt-2 pt-4">
                  <Button variant="outline" onClick={() => setIsProfileDialogOpen(true)}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <Dialog open={isProfileDialogOpen} onOpenChange={(open) => {
        if (isProfileCompleted) {
          setIsProfileDialogOpen(open);
        }
      }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{isProfileCompleted ? "Edit Profile" : "Complete Your Profile"}</DialogTitle>
              <DialogDescription>
                Please fill in your professional and personal details. You need to complete these fields before using the app.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleChange("name")(e.target.value)}
                  placeholder="Dr. John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">Medical License Number / Credential ID *</Label>
                <Input
                  id="license"
                  value={profile.licenseNumber}
                  onChange={(e) => handleChange("licenseNumber")(e.target.value)}
                  placeholder="e.g. MCI-12345"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Specialization *</Label>
                  <Select
                    value={profile.specialization}
                    onValueChange={(value) => handleChange("specialization")(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="General Medicine">General Medicine</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Years of Experience *</Label>
                  <Select
                    value={profile.experience}
                    onValueChange={(value) => handleChange("experience")(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="16-20">16-20 years</SelectItem>
                      <SelectItem value="20+">20+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="\d{10}"
                    value={profile.phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                      handleChange("phone")(digitsOnly);
                    }}
                    placeholder="10-digit phone number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth")(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select
                    value={profile.gender}
                    onValueChange={(value) => handleChange("gender")(value)}
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

              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital / Clinic Affiliation *</Label>
                <Input
                  id="hospital"
                  value={profile.hospitalAffiliation}
                  onChange={(e) => handleChange("hospitalAffiliation")(e.target.value)}
                  placeholder="e.g. City General Hospital"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user.email} readOnly />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>

            <DialogFooter>
              {isProfileCompleted && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsProfileDialogOpen(false)}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSaving}>
                {isSaving
                  ? "Saving..."
                  : isProfileCompleted
                    ? "Save Changes"
                    : "Save & Continue to Dashboard"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
