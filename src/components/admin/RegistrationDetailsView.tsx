"use client";

import { motion } from "framer-motion";
import {
    ChevronLeft,
    Mail,
    Phone,
    MapPin,
    User,
    Calendar,
    BadgeCheck,
    Info,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RegistrationDetailsViewProps {
    registration: any;
    onBack: () => void;
}

export function RegistrationDetailsView({ registration, onBack }: RegistrationDetailsViewProps) {
    if (!registration) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 pb-20"
        >
            {/* Navigation Header */}
            <div className="flex items-center gap-4 sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 py-4 mb-2 pr-20 lg:pr-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="rounded-xl hover:bg-white shadow-sm border border-transparent hover:border-slate-200 transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1">Entry Details</h2>
                    <p className="text-xl font-black uppercase italic text-slate-900 leading-none">#{registration.id.toString().padStart(4, '0')}</p>
                </div>
            </div>

            {/* Profile Hero Section */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <User className="w-48 h-48" />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Active Registration</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black uppercase italic leading-none tracking-tighter">
                        {registration.name.split(' ')[0]} <br />
                        <span className="text-primary">{registration.name.split(' ').slice(1).join(' ')}</span>
                    </h1>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <a
                            href={`mailto:${registration.email}`}
                            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all group"
                        >
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-white/50 leading-none mb-1">Email</p>
                                <p className="text-sm font-bold lowercase flex items-center gap-1">
                                    {registration.email} <ExternalLink className="w-3 h-3 opacity-50" />
                                </p>
                            </div>
                        </a>

                        <a
                            href={`tel:${registration.phone}`}
                            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 transition-all group"
                        >
                            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-white/50 leading-none mb-1">Call</p>
                                <p className="text-sm font-bold flex items-center gap-1">
                                    {registration.phone} <ExternalLink className="w-3 h-3 opacity-50" />
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-black uppercase italic text-sm flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" /> Registration Details
                            </h3>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase bg-slate-100 px-3 py-1 rounded-full">
                                {registration.category}
                            </span>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <InfoItem icon={MapPin} label="Location" value={registration.location || "Not specified"} />
                            <InfoItem icon={Calendar} label="Date Registered" value={new Date(registration.created_at).toLocaleString()} />
                            <InfoItem icon={BadgeCheck} label="Category" value={registration.category} />
                            <InfoItem icon={User} label="Guests" value={String(registration.guest_count || 0)} />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
                        <h3 className="font-black uppercase italic text-sm border-b pb-4 mb-6">Entry Summary</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-600">Registrant</span>
                                <span className="text-sm font-black">{registration.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-600">Category</span>
                                <span className="text-sm font-black uppercase">{registration.category}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-600">Guests</span>
                                <span className="text-sm font-black">{registration.guest_count || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                <Icon className="w-3 h-3" /> {label}
            </div>
            <p className="text-sm font-black text-slate-800">{value}</p>
        </div>
    );
}
