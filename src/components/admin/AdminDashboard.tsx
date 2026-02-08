"use client";

import { motion } from "framer-motion";
import {
    Users,
    Dog,
    PawPrint,
    Search,
    Trash2,
    FileText,
    TrendingUp,
    Heart,
    UserCircle,
    LogOut,
    Eye,
    Calendar,
    Phone,
    MapPin,
    BadgeCheck,
    Info,
    Mail,
    MessageSquare
} from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteRegistration } from "@/app/actions/admin";
import { useToast } from "@/hooks/use-toast";
import MediaManager from "@/components/admin/MediaManager";
import { AdminSidebar } from "./AdminSidebar";
import { ProfilePage } from "./ProfilePage";
import { ContactInquiries } from "./ContactInquiries";
import { RegistrationDetailsView } from "./RegistrationDetailsView";

type AdminDashboardProps = {
    initialRegistrations: any[];
    stats: {
        totalRegistrations: number;
        totalHumans: number;
        totalPets: number;
        totalInquiries: number;
        categories: { category: string; count: string }[];
    };
    user: any;
};

export default function AdminDashboard({ initialRegistrations, stats, user }: AdminDashboardProps) {
    const { toast } = useToast();
    const [registrations, setRegistrations] = useState(initialRegistrations);
    const [search, setSearch] = useState("");
    const [isDeleting, setIsDeleting] = useState<number | null>(null);
    const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'registrations' | 'media' | 'profile' | 'inquiries'>('dashboard');

    const filteredRegistrations = useMemo(() => {
        return registrations.filter(reg =>
            reg.name.toLowerCase().includes(search.toLowerCase()) ||
            reg.email.toLowerCase().includes(search.toLowerCase()) ||
            reg.phone.toLowerCase().includes(search.toLowerCase())
        );
    }, [registrations, search]);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this registration?")) return;

        setIsDeleting(id);
        const res = await deleteRegistration(id);
        if (res.success) {
            setRegistrations(prev => prev.filter(r => r.id !== id));
            toast({ title: "Deleted", description: "Registration removed successfully." });
        } else {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete." });
        }
        setIsDeleting(null);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
            <AdminSidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    setSelectedRegistration(null);
                }}
                user={user}
            />

            <main className="flex-1 overflow-auto">
                <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
                    {/* Dashboard Header - Hidden when viewing details for app-like focus */}
                    {!selectedRegistration && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-border pr-16 md:pr-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
                                    {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'registrations' ? 'Registration' : activeTab === 'media' ? 'Media' : activeTab === 'inquiries' ? 'Contact' : 'User'} <span className="text-primary">{activeTab === 'dashboard' ? 'Overview' : activeTab === 'profile' ? 'Profile' : activeTab === 'inquiries' ? 'Inquiries' : 'Registry'}</span>
                                </h1>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <BadgeCheck className="w-4 h-4 text-green-500" />
                                    Admin Session Active • {user?.role}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" onClick={() => window.print()} className="rounded-xl font-bold shadow-sm">
                                    <FileText className="w-4 h-4 mr-2" /> Export View
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Content Section */}
                    {selectedRegistration ? (
                        <RegistrationDetailsView
                            registration={selectedRegistration}
                            onBack={() => setSelectedRegistration(null)}
                        />
                    ) : activeTab === 'dashboard' ? (
                        <div className="space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: "Registration Entries", value: stats.totalRegistrations, icon: FileText, color: "bg-blue-500" },
                                    { label: "Total Attendees", value: stats.totalHumans, icon: Users, color: "bg-indigo-500" },
                                    { label: "Total Pets", value: stats.totalPets, icon: PawPrint, color: "bg-orange-500" },
                                    { label: "Support Inquiries", value: stats.totalInquiries, icon: MessageSquare, color: "bg-emerald-500" },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <TrendingUp className="w-4 h-4 text-green-500" />
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                        <h3 className="text-3xl font-black mt-1">{stat.value.toLocaleString()}</h3>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional Dashboard Info could go here */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm">
                                    <h3 className="text-lg font-black uppercase italic mb-6 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-primary" /> Performance Summary
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                                            <span className="text-sm font-bold text-muted-foreground uppercase">Growth Rate</span>
                                            <span className="text-xl font-black text-green-600">+12%</span>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                                            <span className="text-sm font-bold text-muted-foreground uppercase">Engagement Score</span>
                                            <span className="text-xl font-black text-primary">8.4</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                        <Dog className="w-32 h-32" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-black uppercase italic mb-2">Quick Action</h3>
                                        <p className="text-sm opacity-70 mb-6 max-w-[200px]">You have {stats.totalInquiries} unread inquiries from potential participants.</p>
                                        <Button
                                            onClick={() => setActiveTab('inquiries')}
                                            className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]"
                                        >
                                            View Inquiries
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'registrations' ? (
                        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <UserCircle className="w-6 h-6 text-primary" />
                                    Registrations ({filteredRegistrations.length})
                                </h2>
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search name, email, or phone..."
                                        className="pl-10 rounded-xl bg-slate-50 border-slate-200"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-muted-foreground text-[10px] md:text-xs uppercase font-black tracking-widest">
                                            <th className="px-4 md:px-6 py-4">Registrant</th>
                                            <th className="px-4 md:px-6 py-4 hidden sm:table-cell">Details</th>
                                            <th className="px-4 md:px-6 py-4">Pets</th>
                                            <th className="px-4 md:px-6 py-4 hidden md:table-cell text-center">Vaccinated</th>
                                            <th className="px-4 md:px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredRegistrations.map((reg, i) => (
                                            <motion.tr
                                                key={reg.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.02 }}
                                                className="hover:bg-slate-50 transition-colors"
                                            >
                                                <td className="px-4 md:px-6 py-4">
                                                    <div className="font-bold text-slate-900 text-sm md:text-base truncate max-w-[120px] md:max-w-none">{reg.name}</div>
                                                    <div className="text-[10px] text-muted-foreground uppercase">{reg.sex || 'Not specified'}</div>
                                                    <div className="sm:hidden text-[10px] text-primary font-bold mt-1">{reg.location}</div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                                                    <div className="text-sm">{reg.email}</div>
                                                    <div className="text-[10px] text-muted-foreground">{reg.phone}</div>
                                                    <div className="text-[10px] font-bold text-primary mt-1">{reg.location}</div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4">
                                                    <div className="flex flex-wrap gap-1.5 min-w-[80px]">
                                                        {reg.pets?.length > 0 ? reg.pets.slice(0, 2).map((pet: any, pi: number) => (
                                                            <span key={pi} className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold bg-orange-100 text-orange-700 whitespace-nowrap">
                                                                {pet.name}
                                                            </span>
                                                        )) : (
                                                            <span className="text-[10px] md:text-xs text-muted-foreground">No pets</span>
                                                        )}
                                                        {reg.pets?.length > 2 && (
                                                            <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">+{reg.pets.length - 2}</span>
                                                        )}
                                                    </div>
                                                    <div className="text-[9px] md:text-[10px] text-muted-foreground mt-1 font-medium">Guests: {reg.guest_count}</div>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 hidden md:table-cell text-center">
                                                    <span className={`px-2 py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase ${reg.is_vaccinated === 'Yes' ? 'bg-green-100 text-green-700' :
                                                        reg.is_vaccinated === 'No' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {reg.is_vaccinated}
                                                    </span>
                                                </td>
                                                <td className="px-4 md:px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 md:gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 md:w-auto md:px-3 text-primary"
                                                            onClick={() => setSelectedRegistration(reg)}
                                                        >
                                                            <Eye className="w-4 h-4 md:mr-2" />
                                                            <span className="hidden md:inline">View</span>
                                                        </Button>
                                                        {user?.role === 'admin' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() => handleDelete(reg.id)}
                                                                disabled={isDeleting === reg.id}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredRegistrations.length === 0 && (
                                <div className="p-20 text-center">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                        <Search className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-lg font-bold">No registrations found</h3>
                                    <p className="text-muted-foreground">Try adjusting your search criteria.</p>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'media' ? (
                        <div className="bg-white rounded-3xl border border-border shadow-sm p-4 md:p-6 min-h-[60vh]">
                            <MediaManager />
                        </div>
                    ) : activeTab === 'inquiries' ? (
                        <ContactInquiries />
                    ) : (
                        <ProfilePage user={user} />
                    )}
                </div>
            </main>
        </div>
    );
}
