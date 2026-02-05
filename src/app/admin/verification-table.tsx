"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth, User } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loader";

export function DoctorVerificationTable() {
  const { getPendingDoctors, verifyDoctor, user } = useAuth();
  const [pendingDoctors, setPendingDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPendingDoctors = () => {
    // getPendingDoctors reads from localStorage, so it's sync, 
    // but in a real app this would be an API call.
    // We put it in a small timeout to simulate loading/ensure client-side mount
    setLoading(true);
    setTimeout(() => {
        const docs = getPendingDoctors();
        setPendingDoctors(docs);
        setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const handleVerify = (email: string, name: string) => {
    verifyDoctor(email);
    toast({
      title: "Doctor Verified",
      description: `${name} has been approved and can now log in.`,
    });
    // Refresh the list
    fetchPendingDoctors();
  };

  if (loading) {
      return <div className="p-8 flex justify-center"><Loader /></div>;
  }

  if (pendingDoctors.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No pending verification requests.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>License Number</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Speciality</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingDoctors.map((doc) => (
            <TableRow key={doc.email}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.email}</TableCell>
              <TableCell>{doc.licenseNumber || "N/A"}</TableCell>
              <TableCell>{doc.hospital || "N/A"}</TableCell>
              <TableCell>{doc.speciality || "N/A"}</TableCell>
              <TableCell className="text-right">
                <Button 
                    size="sm" 
                    onClick={() => handleVerify(doc.email, doc.name)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
