"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from "recharts";
import {
    Users,
    TrendingUp,
    Clock,
    Calendar,
    ArrowUpRight,
    Filter,
    Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const demographicData = [
    { name: '18-25', value: 400 },
    { name: '26-35', value: 700 },
    { name: '36-45', value: 500 },
    { name: '46-60', value: 300 },
    { name: '60+', value: 200 },
];

const busyHoursData = [
    { time: '9AM', patients: 12 },
    { time: '10AM', patients: 25 },
    { time: '11AM', patients: 35 },
    { time: '12PM', patients: 28 },
    { time: '1PM', patients: 15 },
    { time: '2PM', patients: 20 },
    { time: '3PM', patients: 30 },
    { time: '4PM', patients: 45 },
    { time: '5PM', patients: 40 },
];

const performanceData = [
    { month: 'Jan', revenue: 4000, visits: 240 },
    { month: 'Feb', revenue: 3000, visits: 198 },
    { month: 'Mar', revenue: 5000, visits: 320 },
    { month: 'Apr', revenue: 4780, visits: 310 },
    { month: 'May', revenue: 5890, visits: 380 },
    { month: 'Jun', revenue: 6390, visits: 410 },
];

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

export default function AnalyticsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Analytics & Insights</h2>
                    <p className="text-muted-foreground">Deep dive into your practice's performance and patient trends.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-10">
                        <Filter className="h-4 w-4 mr-2" />
                        FILTER
                    </Button>
                    <Button className="h-10">
                        <Download className="h-4 w-4 mr-2" />
                        EXPORT
                    </Button>
                </div>
            </div>

            {/* Top row stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-none shadow-sm flex items-center p-6 gap-4">
                    <div className="p-3 rounded-xl bg-blue-100/50 text-blue-600">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Growth Rate</p>
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-black text-gray-900">+12.5%</h3>
                            <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px]">UP</Badge>
                        </div>
                    </div>
                </Card>
                <Card className="border-none shadow-sm flex items-center p-6 gap-4">
                    <div className="p-3 rounded-xl bg-emerald-100/50 text-emerald-600">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Efficiency</p>
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-black text-gray-900">94.2%</h3>
                            <Badge className="bg-blue-100 text-blue-700 border-none text-[10px]">STABLE</Badge>
                        </div>
                    </div>
                </Card>
                <Card className="border-none shadow-sm flex items-center p-6 gap-4">
                    <div className="p-3 rounded-xl bg-purple-100/50 text-purple-600">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Avg. Wait Time</p>
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-black text-gray-900">14m</h3>
                            <Badge className="bg-emerald-100 text-emerald-700 border-none text-[10px]">-2m</Badge>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Patient Demographics */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Patient Demographics</CardTitle>
                        <CardDescription>Age group distribution across your practice.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={demographicData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {demographicData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Busy Hours */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Patient Peak Hours</CardTitle>
                        <CardDescription>Visualizing the busiest times of your day.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={busyHoursData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} fontSize={12} stroke="#888" />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#888" />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                                <Bar dataKey="patients" fill="#2563eb" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Patient Retention/Performance */}
                <Card className="border-none shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg">Performance Over Time</CardTitle>
                        <CardDescription>Comparing monthly revenue and patient visits.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} stroke="#888" />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#888" />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-blue-600" />
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest leading-none">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest leading-none">Visits</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
