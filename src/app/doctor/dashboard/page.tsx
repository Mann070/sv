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
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
        <div className="p-4 space-y-4 max-w-7xl mx-auto bg-gray-50/30 min-h-screen">
            <div className="flex flex-col gap-0.5">
                <h2 className="text-2xl font-bold font-headline tracking-tight text-primary">Doctor Dashboard</h2>
                <p className="text-muted-foreground text-xs font-medium">Welcome back, {user?.name}. Here's your summary.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-sm bg-blue-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2.5">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Total Patients</CardTitle>
                        <div className="p-1.5 rounded-lg bg-blue-100/50">
                            <Users className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                        <div className="text-2xl font-bold text-blue-900 leading-none">1,254</div>
                        <div className="flex items-center gap-1 mt-1 text-[9px] font-bold text-blue-600/70">
                            <span className="px-1 py-0.5 rounded bg-blue-100">+20%</span>
                            <span>vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-orange-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2.5">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Appointments Today</CardTitle>
                        <div className="p-1.5 rounded-lg bg-orange-100/50">
                            <Calendar className="h-3.5 w-3.5 text-orange-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                        <div className="text-2xl font-bold text-orange-900 leading-none">{upcomingAppointments.length}</div>
                        <div className="flex items-center gap-1 mt-1 text-[9px] font-bold text-orange-600/70">
                            <span className="px-1 py-0.5 rounded bg-orange-100">Scheduled</span>
                            <span>for today</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2.5">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Revenue</CardTitle>
                        <div className="p-1.5 rounded-lg bg-emerald-100/50">
                            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                        <div className="text-2xl font-bold text-emerald-900 leading-none">$45,231</div>
                        <div className="flex items-center gap-1 mt-1 text-[9px] font-bold text-emerald-600/70">
                            <span className="px-1 py-0.5 rounded bg-emerald-100">+12%</span>
                            <span>growth rate</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-purple-50/50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2.5">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-purple-600">System Health</CardTitle>
                        <div className="p-1.5 rounded-lg bg-purple-100/50">
                            <Activity className="h-3.5 w-3.5 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                        <div className="text-xl font-bold text-purple-900 leading-none">Syncing Live</div>
                        <div className="flex items-center gap-1 mt-1.5">
                            <div className="h-1 w-1 rounded-full bg-purple-400 animate-ping" />
                            <p className="text-[9px] font-bold text-purple-600/70 uppercase">Uptime 99.9%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Appointments Section */}
            <Card className="border-none shadow-sm">
                <CardHeader className="py-3 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-base">Today's Schedule</CardTitle>
                        <CardDescription className="text-xs">Your next few appointments</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px] font-black tracking-widest text-primary uppercase">
                        View Full
                        <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0 border-t border-gray-50">
                    <Table>
                        <TableBody>
                            {upcomingAppointments.slice(0, 5).map((apt, idx) => (
                                <TableRow key={idx} className="group hover:bg-gray-50/50 transition-colors cursor-pointer">
                                    <TableCell className="py-2.5">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 ring-2 ring-white">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.patientName}`} />
                                                <AvatarFallback className="text-[10px] font-bold">{apt.patientName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-bold text-gray-900 leading-tight">{apt.patientName}</span>
                                                <span className="text-[10px] text-muted-foreground">{apt.speciality}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2.5">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3 w-3 text-primary" />
                                            <span className="text-[11px] font-black text-gray-700 uppercase tracking-tighter">
                                                {apt.time.split(' at ')[1] || apt.time}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2.5 text-right">
                                        <Badge className="bg-emerald-100 text-emerald-700 border-none text-[9px] font-black uppercase tracking-tighter">
                                            Confirmed
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
                <CardHeader className="py-3">
                    <CardTitle className="text-base">Patient Volume</CardTitle>
                    <CardDescription className="text-xs">New vs. returning patients</CardDescription>
                </CardHeader>
                <CardContent className="pl-0 pb-2">
                    <div className="h-[250px] w-full">
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
