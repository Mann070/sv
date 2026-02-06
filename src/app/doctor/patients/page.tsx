"use client";

import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function DoctorPatientsPage() {
    const { user } = useAuth();
    const { upcomingAppointments } = useAppContext();

    // Group appointments by patient (using doctor name as patient identifier for now)
    // In a real app, you'd have patient data linked to appointments
    const patientsWithAppointments = upcomingAppointments.map((apt, index) => ({
        id: index + 1,
        patientName: apt.patientName,
        age: apt.patientAge,
        gender: apt.patientGender,
        appointmentTime: apt.time,
        speciality: apt.speciality,
        hospital: apt.hospital,
        status: "Scheduled",
        avatarSeed: `patient${index}`,
    }));

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-headline tracking-tight">Patients</h2>
                    <p className="text-muted-foreground mt-1">
                        Manage your patients and their appointments
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    {patientsWithAppointments.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No patients with appointments yet.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Appointment Time</TableHead>
                                    <TableHead>Speciality</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {patientsWithAppointments.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.avatarSeed}`}
                                                        alt={patient.patientName}
                                                    />
                                                    <AvatarFallback>{patient.patientName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{patient.patientName}</p>
                                                    <p className="text-sm text-muted-foreground">ID: #{patient.id.toString().padStart(4, '0')}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                {patient.appointmentTime}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{patient.speciality}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                {patient.hospital}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                {patient.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
