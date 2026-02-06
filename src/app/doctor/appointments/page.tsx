"use client";

import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Calendar, Clock, MapPin, User, Stethoscope } from "lucide-react";

export default function DoctorAppointmentsPage() {
    const { user } = useAuth();
    const { upcomingAppointments, pastAppointments } = useAppContext();

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-headline tracking-tight">Appointments</h2>
                    <p className="text-muted-foreground mt-1">
                        Manage and view all patient appointments
                    </p>
                </div>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <TabsList>
                    <TabsTrigger value="upcoming">
                        Upcoming ({upcomingAppointments.length})
                    </TabsTrigger>
                    <TabsTrigger value="past">
                        Past ({pastAppointments.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <CardDescription>
                                Appointments scheduled by patients
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {upcomingAppointments.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No upcoming appointments</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Patient</TableHead>
                                            <TableHead>Doctor</TableHead>
                                            <TableHead>Speciality</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {upcomingAppointments.map((appointment, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <span>Patient {index + 1}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {appointment.doctor}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="gap-1">
                                                        <Stethoscope className="h-3 w-3" />
                                                        {appointment.speciality}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        {appointment.time}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        {appointment.hospital}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                                        Scheduled
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="past" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Appointments</CardTitle>
                            <CardDescription>
                                Completed appointments with reports
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {pastAppointments.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No past appointments</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Patient</TableHead>
                                            <TableHead>Doctor</TableHead>
                                            <TableHead>Speciality</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Diagnosis</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pastAppointments.map((appointment, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <span>{appointment.report.patient}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {appointment.doctor}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {appointment.speciality}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        {appointment.time}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {appointment.report.diagnosis}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                        Completed
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm">
                                                        View Report
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
