"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Video,
    Mic,
    Monitor,
    MessageSquare,
    UserPlus,
    Settings,
    PhoneOff,
    Users,
    Clock,
    Circle
} from "lucide-react";

const waitingRoom = [
    { name: "Rahul Kumar", time: "10:30 AM", status: "Ready", waitTime: "5m", id: "P-101" },
    { name: "Sita Devi", time: "11:00 AM", status: "Joined", waitTime: "2m", id: "P-102" },
    { name: "Amit Verma", time: "11:30 AM", status: "Waiting", waitTime: "-", id: "P-103" },
];

export default function TelemedicinePage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Telemedicine</h2>
                <p className="text-muted-foreground">Manage your video consultations and virtual waiting room.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Main Video View Mock */}
                <Card className="lg:col-span-8 border-none bg-black overflow-hidden relative min-h-[500px] shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="bg-white/10 p-6 rounded-full mb-4 inline-block backdrop-blur-md">
                                <Video className="h-12 w-12 text-white/40" />
                            </div>
                            <h3 className="text-white font-bold text-xl uppercase tracking-widest opacity-60">Meeting Not Started</h3>
                            <p className="text-white/40 text-sm mt-2">Select a patient from the queue to begin the consultation.</p>
                        </div>
                    </div>

                    {/* Floating Controls Mock */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/10">
                        <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12">
                            <Mic className="h-5 w-5 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12">
                            <Video className="h-5 w-5 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12">
                            <Monitor className="h-5 w-5 text-white" />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-white/20 h-12 w-12">
                            <MessageSquare className="h-5 w-5 text-white" />
                        </Button>
                        <div className="w-px h-8 bg-white/10 mx-1" />
                        <Button size="icon" variant="destructive" className="rounded-full h-12 w-12 shadow-lg shadow-red-500/30">
                            <PhoneOff className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Self View Mock */}
                    <div className="absolute top-6 right-6 w-40 h-24 bg-gray-900 rounded-lg border border-white/20 overflow-hidden shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-[10px] font-black text-white/30 uppercase">You</div>
                        </div>
                    </div>
                </Card>

                {/* Queue Section */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="pb-3 border-b border-gray-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">Waiting Room</CardTitle>
                                <CardDescription>Patients queued for today</CardDescription>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-none">3 Active</Badge>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-50">
                                {waitingRoom.map((patient, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between group hover:bg-blue-50/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.name}`} />
                                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-gray-900">{patient.name}</p>
                                                    <div className={`h-1.5 w-1.5 rounded-full ${patient.status === 'Ready' ? 'bg-emerald-500' :
                                                            patient.status === 'Joined' ? 'bg-blue-500' :
                                                                'bg-gray-300'
                                                        }`} />
                                                </div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{patient.id}</span>
                                                    <span className="text-[10px] text-muted-foreground">•</span>
                                                    <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-2.5 w-2.5" />
                                                        {patient.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="h-8 px-3 text-[10px] font-bold group-hover:bg-primary group-hover:text-white transition-all">
                                            START
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-gradient-to-br from-primary to-blue-700 text-white overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <Video className="h-24 w-24" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Session Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="opacity-70">Background Blur</span>
                                    <Badge variant="outline" className="text-white border-white/20 bg-white/10 py-0 h-5">ON</Badge>
                                </div>
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="opacity-70">Noise Suppression</span>
                                    <Badge variant="outline" className="text-white border-white/20 bg-emerald-500/20 py-0 h-5">ACTIVE</Badge>
                                </div>
                            </div>
                            <Button variant="secondary" className="w-full h-9 text-[11px] font-bold">
                                <Settings className="h-3.5 w-3.5 mr-2" />
                                CONFIGURE DEVICES
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
