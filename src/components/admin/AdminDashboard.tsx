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
    Mail
} from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deleteRegistration } from "@/app/actions/admin";
import { logout } from "@/app/actions/auth";
import { useToast } from "@/hooks/use-toast";

type AdminDashboardProps = {
    initialRegistrations: any[];
    stats: {
        totalHumans: number;
        totalPets: number;
        totalDogs: number;
        otherPets: number;
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
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase">Admin <span className="text-primary">Dashboard</span></h1>
                    <p className="text-sm md:text-base text-muted-foreground">Welcome back, <span className="font-bold text-slate-900">{user?.name}</span> ({user?.role})</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={async () => {
                            await logout();
                            window.location.reload();
                        }}
                        className="rounded-xl font-bold text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                    <Button variant="outline" onClick={() => window.print()} className="rounded-xl font-bold">
                        <FileText className="w-4 h-4 mr-2" /> Export PDF
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Humans", value: stats.totalHumans, icon: Users, color: "bg-blue-500" },
                    { label: "Total Pets", value: stats.totalPets, icon: PawPrint, color: "bg-orange-500" },
                    { label: "Dogs Registered", value: stats.totalDogs, icon: Dog, color: "bg-yellow-500" },
                    { label: "Other Pets", value: stats.otherPets, icon: Heart, color: "bg-red-500" },
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

            {/* Main Content */}
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
                                <th className="px-4 md:px-6 py-4 hidden md:table-cell">Status</th>
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
                                    <td className="px-4 md:px-6 py-4 hidden md:table-cell">
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

            {/* View Details Dialog */}
            <Dialog open={!!selectedRegistration} onOpenChange={(open) => !open && setSelectedRegistration(null)}>
                <DialogContent className="max-w-2xl w-[95vw] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                    <div className="bg-primary p-6 md:p-8 text-white">
                        <DialogHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <UserCircle className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest opacity-80 decoration-white/30 underline underline-offset-4">Registration Details</span>
                            </div>
                            <DialogTitle className="text-2xl md:text-3xl font-black uppercase leading-tight italic">{selectedRegistration?.name}</DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        {/* Core Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 italic">
                                    <Info className="w-3 h-3" /> Contact Information
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Mail className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Email</p>
                                            <p className="text-sm font-bold">{selectedRegistration?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Phone className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Phone</p>
                                            <p className="text-sm font-bold">{selectedRegistration?.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><MapPin className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">State/Location</p>
                                            <p className="text-sm font-bold">{selectedRegistration?.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 italic">
                                    <BadgeCheck className="w-3 h-3" /> Registration Status
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><BadgeCheck className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Vaccinated</p>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${selectedRegistration?.is_vaccinated === 'Yes' ? 'bg-green-100 text-green-700' :
                                                selectedRegistration?.is_vaccinated === 'No' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {selectedRegistration?.is_vaccinated}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Users className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Guests</p>
                                            <p className="text-sm font-bold">{selectedRegistration?.guest_count} Persons</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><Calendar className="w-4 h-4" /></div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Registered On</p>
                                            <p className="text-sm font-bold">{selectedRegistration?.created_at ? new Date(selectedRegistration.created_at).toLocaleDateString() : 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pets Info */}
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 italic">
                                <PawPrint className="w-3 h-3" /> Registered Companions ({selectedRegistration?.pets?.length || 0})
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedRegistration?.pets?.map((pet: any, idx: number) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 group hover:border-primary/30 transition-colors">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform">
                                            {pet.type === 'Dog' ? '🐕' :
                                                pet.type === 'Cat' ? '🐱' :
                                                    pet.type === 'Bird' ? '🦜' :
                                                        pet.type === 'Rabbit' ? '🐰' :
                                                            pet.type === 'Horse' ? '🐎' : '🐾'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black uppercase italic">{pet.name}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{pet.type} • {pet.breed || 'Unknown Breed'}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!selectedRegistration?.pets || selectedRegistration.pets.length === 0) && (
                                    <p className="text-sm text-muted-foreground col-span-2 py-4 text-center italic">No pets registered for this participant.</p>
                                )}
                            </div>
                        </div>

                        {/* Donation Info */}
                        {selectedRegistration?.donation_interest && (
                            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-start gap-3">
                                <Heart className="w-5 h-5 text-orange-500 mt-1" />
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-orange-600 leading-none mb-1">Donation Interest</p>
                                    <p className="text-sm text-orange-800 font-medium">{selectedRegistration.donation_interest}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 md:p-8 bg-slate-50 flex justify-end">
                        <Button className="rounded-xl px-8 font-black uppercase tracking-widest italic shadow-lg" onClick={() => setSelectedRegistration(null)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
