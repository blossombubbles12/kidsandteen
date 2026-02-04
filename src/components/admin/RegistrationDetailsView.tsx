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
    Users,
    PawPrint,
    Heart,
    Info,
    MessageSquare,
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
            <div className="flex items-center gap-4 sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 py-4 mb-2">
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
                                <p className="text-[10px] uppercase font-bold text-white/50 leading-none mb-1">Email Registrant</p>
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
                                <p className="text-[10px] uppercase font-bold text-white/50 leading-none mb-1">Call Now</p>
                                <p className="text-sm font-bold flex items-center gap-1">
                                    {registration.phone} <ExternalLink className="w-3 h-3 opacity-50" />
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Detailed Info Cards */}
                <div className="lg:col-span-2 space-y-6">

                    {/* General Information */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-black uppercase italic text-sm flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" /> General Information
                            </h3>
                        </div>
                        <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <InfoItem icon={MapPin} label="Location/State" value={registration.location} />
                            <InfoItem icon={User} label="Gender" value={registration.sex || "Not specified"} />
                            <InfoItem icon={Calendar} label="Date Registered" value={new Date(registration.created_at).toLocaleString()} />
                            <InfoItem
                                icon={BadgeCheck}
                                label="Verification Status"
                                value={registration.is_vaccinated === 'Yes' ? 'Fully Vaccinated' : 'Not Vaccinated'}
                                badge={registration.is_vaccinated === 'Yes' ? 'success' : 'warning'}
                            />
                        </div>
                    </div>

                    {/* Pets Section */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-black uppercase italic text-sm flex items-center gap-2">
                                <PawPrint className="w-4 h-4 text-orange-500" /> Registered Pets ({registration.pets?.length || 0})
                            </h3>
                        </div>
                        <div className="p-6 md:p-8">
                            {registration.pets && registration.pets.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {registration.pets.map((pet: any, idx: number) => (
                                        <div key={idx} className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 flex items-center gap-4 group hover:border-primary/30 transition-all">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                                                {pet.type === 'Dog' ? '🐕' :
                                                    pet.type === 'Cat' ? '🐱' :
                                                        pet.type === 'Bird' ? '🦜' :
                                                            pet.type === 'Rabbit' ? '🐰' :
                                                                pet.type === 'Horse' ? '🐎' : '🐾'}
                                            </div>
                                            <div>
                                                <p className="text-lg font-black uppercase italic leading-tight">{pet.name}</p>
                                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{pet.type} • {pet.breed || 'Unknown Breed'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <PawPrint className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                    <p className="text-slate-400 font-bold italic">No pets registered for this participant</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats/Extra Info */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-6">
                        <h3 className="font-black uppercase italic text-sm border-b pb-4">Entry Stats</h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Total Group</span>
                                </div>
                                <span className="text-xl font-black">{1 + (registration.guest_count || 0)} <span className="text-[10px] text-muted-foreground uppercase">Humans</span></span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                                        <PawPrint className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Total Pets</span>
                                </div>
                                <span className="text-xl font-black">{registration.pets?.length || 0}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Guests</span>
                                </div>
                                <span className="text-xl font-black">{registration.guest_count || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Donation Card */}
                    {registration.donation_interest && (
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                                <Heart className="w-32 h-32" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Contribution</h3>
                            <p className="text-sm font-bold mb-4 opacity-90 leading-relaxed">Wants to donate towards the Record attempt?</p>
                            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                                <p className="text-xl font-black uppercase italic">{registration.donation_interest}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function InfoItem({ icon: Icon, label, value, badge }: { icon: any, label: string, value: string, badge?: 'success' | 'warning' }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                <Icon className="w-3 h-3" /> {label}
            </div>
            {badge ? (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${badge === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {value}
                </span>
            ) : (
                <p className="text-sm font-black text-slate-800">{value}</p>
            )}
        </div>
    );
}
