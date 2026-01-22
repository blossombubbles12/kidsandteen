"use client";

import { motion } from "framer-motion";
import { Users, Dog, Store, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getStats } from "@/app/actions/carnival";

export function CarnivalStats() {
    const [realStats, setRealStats] = useState({ attendees: 0, dogs: 0 });
    const [stats, setStats] = useState([
        { label: "Attendees", value: "2,500+", icon: Users, color: "text-blue-500" },
        { label: "Pets Participating", value: "2,500+", icon: Dog, color: "text-orange-500" },
        { label: "Vendors", value: "80+", icon: Store, color: "text-green-500" },
        { label: "Pets Rehomed", value: "2,000+", icon: Heart, color: "text-red-500" },
    ]);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getStats();
            if (data) {
                setRealStats(data);
                setStats(currentStats => currentStats.map(stat => {
                    if (stat.label === "Attendees") {
                        return { ...stat, value: (2500 + data.attendees).toLocaleString() + "+" };
                    }
                    if (stat.label === "Pets Participating") {
                        return { ...stat, value: (2500 + data.dogs).toLocaleString() + "+" };
                    }
                    return stat;
                }));
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    // Calculate total registrations for the main counter (Attendees + Dogs)
    // Starting with a base number to make it look active + real registrations
    const totalCount = 5000 + realStats.attendees + realStats.dogs;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-y border-border/40 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">

                {/* Main Live Counter Hero */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 font-bold text-sm mb-6 animate-pulse"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        LIVE REGISTRATION COUNT
                    </motion.div>

                    <motion.h2
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 mb-4"
                    >
                        {totalCount.toLocaleString()}
                    </motion.h2>
                    <p className="text-xl md:text-3xl font-medium text-slate-500 uppercase tracking-widest">
                        Total Registered Humans & Pets
                    </p>
                </div>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                            className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <div className={`p-4 rounded-2xl bg-slate-50 mb-4 ${stat.color} ring-4 ring-offset-2 ring-transparent group-hover:ring-${stat.color.split('-')[1]}-100 transition-all`}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-extrabold tracking-tight mb-2">{stat.value}</h3>
                            <p className="text-muted-foreground font-medium text-sm uppercase tracking-wide">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
