"use client";

import { useAuth } from "@/context/AuthContext";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, ChevronRight, Users, Calendar, DollarSign, Activity } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: 'Jan', patients: 400 },
    { name: 'Feb', patients: 300 },
    { name: 'Mar', patients: 600 },
    { name: 'Apr', patients: 800 },
    { name: 'May', patients: 500 },
    { name: 'Jun', patients: 900 },
    { name: 'Jul', patients: 1100 },
];

export default function DoctorDashboard() {
    const { user } = useAuth();
    const { upcomingAppointments } = useAppContext();

    // Mock today's appointments for the card
    const appointmentsToday = upcomingAppointments.slice(0, 3);

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto bg-gray-50/30">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Doctor Dashboard</h2>
                <p className="text-muted-foreground text-sm">Welcome back, {user?.name}. Here is what's happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-sm bg-blue-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-blue-600">Total Patients</CardTitle>
                        <div className="p-2 rounded-lg bg-blue-100/50">
                            <Users className="h-4 w-4 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-900">1,254</div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-blue-600/70">
                            <span className="px-1.5 py-0.5 rounded bg-blue-100">+20%</span>
                            <span>vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md ring-1 ring-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                        <CardTitle className="text-sm font-bold font-headline">Appointments Today</CardTitle>
                        <div className="p-2 rounded-full bg-primary/10 animate-pulse">
                            <Calendar className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                        <div className="space-y-3">
                            {appointmentsToday.map((apt, idx) => (
                                <div key={idx} className="group relative flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                    <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.patientName}`} />
                                        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                            {apt.patientName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-bold text-foreground truncate">{apt.patientName}</p>
                                            <span className="text-[10px] font-black text-primary bg-primary/5 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                {apt.time.split(' at ')[1] || apt.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5">
                                            <Clock className="h-3 w-3" />
                                            <span className="truncate">{apt.speciality}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-dashed flex items-center justify-center">
                            <button className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 uppercase tracking-widest">
                                View Full Schedule
                                <ChevronRight className="h-3 w-3" />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-emerald-600">Revenue</CardTitle>
                        <div className="p-2 rounded-lg bg-emerald-100/50">
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-900">$45,231</div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600/70">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100">+12%</span>
                            <span>growth rate</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-purple-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-purple-600">System Health</CardTitle>
                        <div className="p-2 rounded-lg bg-purple-100/50">
                            <Activity className="h-4 w-4 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900 leading-tight">Syncing Live</div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                            <p className="text-[10px] font-bold text-purple-600/70 uppercase">Uptime 99.9%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart Section */}
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Patient Volume</CardTitle>
                    <CardDescription>Showing new vs. returning patients for the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="patients"
                                    stroke="#2563eb"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPatients)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
