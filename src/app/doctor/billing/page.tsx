"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DollarSign,
    CreditCard,
    Download,
    Plus,
    Search,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Receipt
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const transactions = [
    { id: "INV-001", patient: "Rahul Kumar", date: "Feb 05, 2026", amount: 150.00, status: "Paid", method: "UPI" },
    { id: "INV-002", patient: "Sita Devi", date: "Feb 04, 2026", amount: 200.00, status: "Paid", method: "Credit Card" },
    { id: "INV-003", patient: "Aarav Kumar", date: "Feb 04, 2026", amount: 75.00, status: "Pending", method: "-" },
    { id: "INV-004", patient: "Priya Singh", date: "Feb 03, 2026", amount: 350.00, status: "Paid", method: "Cash" },
    { id: "INV-005", patient: "Amit Verma", date: "Feb 02, 2026", amount: 120.00, status: "Refunded", method: "Bank Transfer" },
];

export default function BillingPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Billing & Payments</h2>
                    <p className="text-muted-foreground">Manage your clinic's revenue, invoices, and payment history.</p>
                </div>
                <Button className="h-11 px-6 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                    <Plus className="h-4 w-4 mr-2" />
                    CREATE INVOICE
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-sm bg-blue-50/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">$12,450.00</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-blue-600/70">
                            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                            <span className="font-bold text-emerald-500">+8.2%</span>
                            <span>vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-emerald-50/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Outstanding</CardTitle>
                        <CreditCard className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-900">$1,240.00</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600/70">
                            <span className="font-bold">12 invoices</span>
                            <span>unpaid</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-purple-50/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Avg. Per Visit</CardTitle>
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900">$115.00</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-purple-600/70">
                            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                            <span className="font-bold">Steady growth</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-orange-50/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Total Payouts</CardTitle>
                        <Receipt className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-900">$8,900.00</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-orange-600/70">
                            <span className="font-bold">Last payout:</span>
                            <span>Feb 01</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Invoices Table */}
            <Card className="border-none shadow-sm">
                <CardHeader className="pb-3 border-b border-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-lg">Recent Transactions</CardTitle>
                            <CardDescription>A list of recent patient payments and invoices.</CardDescription>
                        </div>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search invoice or patient..." className="pl-9" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                                <TableHead className="w-[120px] font-bold text-[11px] uppercase tracking-wider">Invoice ID</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-wider">Patient</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-wider">Date</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-wider">Amount</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-wider">Method</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-wider">Status</TableHead>
                                <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id} className="group hover:bg-blue-50/20 transition-colors">
                                    <TableCell className="font-black text-primary text-xs">{tx.id}</TableCell>
                                    <TableCell className="font-bold text-[13px]">{tx.patient}</TableCell>
                                    <TableCell className="text-muted-foreground text-[12px]">{tx.date}</TableCell>
                                    <TableCell className="font-bold text-[13px]">${tx.amount.toFixed(2)}</TableCell>
                                    <TableCell className="text-[12px] font-medium text-muted-foreground">{tx.method}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`font-black text-[10px] uppercase tracking-tighter ${tx.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                                                    tx.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {tx.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="p-4 border-t border-gray-50 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground font-medium">Showing 5 of 152 invoices</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-bold">PREVIOUS</Button>
                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-bold">NEXT</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
