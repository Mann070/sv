"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAppContext, Medicine } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Search,
    Plus,
    Trash2,
    Send,
    Pill,
    AlertCircle,
    ChevronRight,
    SearchX,
    ClipboardList,
    User,
    CalendarDays,
    HeartPulse
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type PrescriptionItem = Medicine & {
    dosage: string;
    freq: string;
    duration: string;
};

export default function EPrescriptionPage() {
    const { user } = useAuth();
    const { medicines, upcomingAppointments } = useAppContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [draftPrescription, setDraftPrescription] = useState<PrescriptionItem[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<string>("");
    const [isSending, setIsSending] = useState(false);

    const selectedPatient = useMemo(() => {
        if (!selectedPatientId || selectedPatientId === "none") return null;
        const index = parseInt(selectedPatientId.split("-")[1]);
        return upcomingAppointments[index];
    }, [selectedPatientId, upcomingAppointments]);

    // Filter medicines based on search query
    const filteredMedicines = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return medicines.filter((m) =>
            m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
    }, [searchQuery, medicines]);

    const handleAddMedicine = (med: Medicine) => {
        // Prevent duplicates in draft for simplicity, or just add another instance
        const alreadyIn = draftPrescription.find(p => p.name === med.name);
        if (alreadyIn) {
            toast({
                title: "Already added",
                description: `${med.name} is already in the draft.`,
                variant: "destructive"
            });
            return;
        }

        setDraftPrescription(prev => [
            ...prev,
            { ...med, dosage: "500mg", freq: "1-0-1", duration: "5 days" }
        ]);
        setSearchQuery(""); // Clear search after adding

        toast({
            title: "Medicine Added",
            description: `${med.name} added to draft.`,
        });
    };

    const handleRemoveMedicine = (index: number) => {
        setDraftPrescription(prev => prev.filter((_, i) => i !== index));
    };

    const updateDraftItem = (index: number, field: keyof PrescriptionItem, value: string) => {
        setDraftPrescription(prev => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    const handleSend = () => {
        if (!selectedPatientId) {
            toast({
                title: "Error",
                description: "Please select a patient first.",
                variant: "destructive"
            });
            return;
        }
        if (draftPrescription.length === 0) {
            toast({
                title: "Error",
                description: "Prescription draft is empty.",
                variant: "destructive"
            });
            return;
        }

        setIsSending(true);
        // Simulate API call
        setTimeout(() => {
            setIsSending(false);
            setDraftPrescription([]);
            setSelectedPatientId("");
            toast({
                title: "Success",
                description: "Prescription has been sent to the patient.",
            });
        }, 1500);
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-headline tracking-tight">E-Prescription</h2>
                    <p className="text-muted-foreground mt-1">
                        Draft and send digital prescriptions to your patients
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Patient" />
                        </SelectTrigger>
                        <SelectContent>
                            {upcomingAppointments.length === 0 ? (
                                <SelectItem value="none" disabled>No active patients</SelectItem>
                            ) : (
                                upcomingAppointments.map((apt, idx) => (
                                    <SelectItem key={idx} value={`patient-${idx}`}>
                                        {apt.patientName}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleSend} disabled={isSending || draftPrescription.length === 0} className="gap-2">
                        <Send className="h-4 w-4" />
                        {isSending ? "Sending..." : "Send Prescription"}
                    </Button>
                </div>
            </div>

            {selectedPatient && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Patient Name</p>
                                    <p className="font-bold text-lg leading-none">{selectedPatient.patientName}</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-primary/10 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-primary/60" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Age / Gender</p>
                                    <p className="font-medium">{selectedPatient.patientAge} Yrs / {selectedPatient.patientGender}</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-primary/10 hidden md:block" />
                            <div className="flex items-center gap-3">
                                <HeartPulse className="h-5 w-5 text-primary/60" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Diagnosis (Recent)</p>
                                    <p className="font-medium">Routine Checkup</p>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <Badge variant="outline" className="bg-background/50 border-primary/20 text-primary">
                                    Patient ID: #{Math.floor(1000 + Math.random() * 9000)}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Search & Selector Side */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="h-full border-primary/10 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-5 w-5 text-primary" />
                                Medicine Search
                            </CardTitle>
                            <CardDescription>
                                Search from 1000+ available medicines
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Type 'P' for Paracetamol..."
                                    className="pl-9 bg-background"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {searchQuery.length > 0 ? (
                                    filteredMedicines.length > 0 ? (
                                        filteredMedicines.map((med, idx) => (
                                            <div
                                                key={idx}
                                                className="group flex flex-col p-3 rounded-lg border bg-background hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                                                onClick={() => handleAddMedicine(med)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                                                        {med.name}
                                                    </span>
                                                    <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                                        {med.manufacturer}
                                                    </span>
                                                    <Badge variant="outline" className="text-[10px] h-5 px-1 bg-muted/50">
                                                        Stock: {med.stock}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                            <SearchX className="h-10 w-10 mb-2 opacity-20" />
                                            <p className="text-sm">No medicines found</p>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
                                        <Pill className="h-10 w-10 mb-2 opacity-20" />
                                        <p className="text-sm text-center px-4">Start typing to see medicine suggestions</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Draft Side */}
                <div className="lg:col-span-8">
                    <Card className="h-full border-primary/20 shadow-lg">
                        <CardHeader className="bg-primary/5 border-b">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle>Prescription Draft</CardTitle>
                                    <CardDescription>
                                        Finalize dosage and frequency before sending
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 animate-pulse">
                                    {draftPrescription.length} Items in Draft
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {draftPrescription.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                                    <ClipboardList className="h-16 w-16 mb-4 opacity-10" />
                                    <p className="text-lg font-medium opacity-50">Draft is empty</p>
                                    <p className="text-sm opacity-40">Add medicines from the left panel to begin</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-muted/30">
                                            <TableRow>
                                                <TableHead className="w-[200px]">Medicine Name</TableHead>
                                                <TableHead>Dosage</TableHead>
                                                <TableHead>Frequency</TableHead>
                                                <TableHead>Duration</TableHead>
                                                <TableHead className="w-[80px] text-right">Remove</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {draftPrescription.map((item, idx) => (
                                                <TableRow key={idx} className="hover:bg-primary/[0.02]">
                                                    <TableCell className="font-medium">
                                                        <div className="flex flex-col">
                                                            <span>{item.name}</span>
                                                            <span className="text-[10px] text-muted-foreground">{item.packSize}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            value={item.dosage}
                                                            onChange={(e) => updateDraftItem(idx, "dosage", e.target.value)}
                                                            className="h-8 w-24 text-sm"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={item.freq}
                                                            onValueChange={(val) => updateDraftItem(idx, "freq", val)}
                                                        >
                                                            <SelectTrigger className="h-8 w-32 text-xs">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1-0-1">1-0-1 (Alt Days)</SelectItem>
                                                                <SelectItem value="1-1-1">1-1-1 (Daily)</SelectItem>
                                                                <SelectItem value="1-0-0">1-0-0 (Morning)</SelectItem>
                                                                <SelectItem value="0-0-1">0-0-1 (Night)</SelectItem>
                                                                <SelectItem value="SOS">SOS (When needed)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Input
                                                            value={item.duration}
                                                            onChange={(e) => updateDraftItem(idx, "duration", e.target.value)}
                                                            className="h-8 w-24 text-sm"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            onClick={() => handleRemoveMedicine(idx)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                        {draftPrescription.length > 0 && (
                            <div className="p-4 border-t bg-muted/10">
                                <div className="flex items-start gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
                                    <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                                    <div className="text-xs text-muted-foreground">
                                        <p className="font-semibold text-primary/80 mb-1">Doctor's Note</p>
                                        <p>Double-check the frequency and duration for the patient before sending. The digital prescription will be signed with your medical credentials automatically.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
