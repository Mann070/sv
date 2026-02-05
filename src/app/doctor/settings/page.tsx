"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";

export default function SettingsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [email] = useState(user?.email || "");

    const [loading, setLoading] = useState(false);

    const handleSave = (section: string) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Settings Saved",
                description: `Your ${section} settings have been updated successfully.`,
            });
        }, 1000);
    };

    return (
        <>
            <div className="p-6 space-y-6 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-3xl font-bold font-headline tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                </div>

                <div className="grid gap-6">
                    {/* Account Settings */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <CardTitle>Account Information</CardTitle>
                            </div>
                            <CardDescription>
                                Update your account details and contact information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input id="name" defaultValue={user?.name} disabled />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Display names can be changed in your profile.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" value={email} disabled />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Contact support to change your email address.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Settings */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                <CardTitle>Security</CardTitle>
                            </div>
                            <CardDescription>
                                Manage your password and security preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleSave("security")} disabled={loading}>
                                {loading ? "Saving..." : "Update Password"}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                <CardTitle>Notifications</CardTitle>
                            </div>
                            <CardDescription>
                                Choose what you want to be notified about.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="email-notifs" className="flex flex-col space-y-1">
                                    <span>Email Notifications</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Receive emails about new appointments and messages.
                                    </span>
                                </Label>
                                <Switch id="email-notifs" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="push-notifs" className="flex flex-col space-y-1">
                                    <span>Push Notifications</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Receive push notifications on your device.
                                    </span>
                                </Label>
                                <Switch id="push-notifs" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                                    <span>Marketing Emails</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Receive emails about new features and promotions.
                                    </span>
                                </Label>
                                <Switch id="marketing-emails" />
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Button variant="outline" onClick={() => handleSave("notifications")} disabled={loading}>
                                Save Preferences
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Privacy Settings */}
                    <Card>
                        <CardHeader>
                             <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle>Privacy</CardTitle>
                            </div>
                            <CardDescription>
                                Manage your data privacy settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="profile-visibility" className="flex flex-col space-y-1">
                                    <span>Profile Visibility</span>
                                    <span className="font-normal text-xs text-muted-foreground">
                                        Allow patients to find your profile in search results.
                                    </span>
                                </Label>
                                <Switch id="profile-visibility" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
