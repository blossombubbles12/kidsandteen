"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updateProfile, updatePassword } from "@/app/actions/auth";
import { User, Lock, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function ProfilePage({ user }: { user: any }) {
    const { toast } = useToast();
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdatingProfile(true);
        const res = await updateProfile(profileForm);
        if (res.success) {
            toast({ title: "Success", description: "Profile updated successfully." });
        } else {
            toast({ variant: "destructive", title: "Error", description: res.error as string });
        }
        setIsUpdatingProfile(false);
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast({ variant: "destructive", title: "Wait!", description: "Passwords do not match." });
            return;
        }

        setIsUpdatingPassword(true);
        const res = await updatePassword({
            currentPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword,
        });

        if (res.success) {
            toast({ title: "Success", description: "Password changed successfully." });
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            toast({ variant: "destructive", title: "Error", description: res.error as string });
        }
        setIsUpdatingPassword(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            {/* Profile Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-border pb-8 overflow-hidden shadow-sm"
            >
                <div className="p-6 border-b border-border bg-slate-50/50 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold italic uppercase tracking-tight">Personal <span className="text-primary">Information</span></h2>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Full Name</Label>
                            <Input
                                id="name"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                className="rounded-xl bg-slate-50 border-slate-200"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                className="rounded-xl bg-slate-50 border-slate-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button disabled={isUpdatingProfile} className="rounded-xl px-8 font-bold gap-2 shadow-lg shadow-primary/20">
                            {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Update Profile
                        </Button>
                    </div>
                </form>
            </motion.div>

            {/* Password Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-border pb-8 overflow-hidden shadow-sm"
            >
                <div className="p-6 border-b border-border bg-slate-50/50 flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-xl">
                        <Lock className="w-5 h-5 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold italic uppercase tracking-tight">Security <span className="text-orange-600">& Password</span></h2>
                </div>

                <form onSubmit={handlePasswordUpdate} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="current" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Current Password</Label>
                        <Input
                            id="current"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="rounded-xl bg-slate-50 border-slate-200"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="new" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">New Password</Label>
                            <Input
                                id="new"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                className="rounded-xl bg-slate-50 border-slate-200"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Confirm New Password</Label>
                            <Input
                                id="confirm"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                className="rounded-xl bg-slate-50 border-slate-200"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button disabled={isUpdatingPassword} variant="default" className="rounded-xl px-8 font-bold gap-2 shadow-lg shadow-primary/20 bg-slate-900">
                            {isUpdatingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                            Change Password
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
