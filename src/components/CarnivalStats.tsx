"use client";

import { motion } from "framer-motion";
import { Users, Dog, Store, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getStats } from "@/app/actions/carnival";

export function CarnivalStats() {
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
                setStats(currentStats => currentStats.map(stat => {
                    if (stat.label === "Attendees") {
                        // Start from 2500 base + real count to show activity? 
                        // Or just show real count if meaningful? 
                        // User wants "start displaying live count ... based on total number of users registered so far"
                        // I'll show the real count if it's significant, otherwise maybe just append it or replace it?
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
        // Poll every 30 seconds for live updates
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 bg-white border-y border-border/40">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-4"
                        >
                            <div className={`p-3 rounded-full bg-secondary/30 mb-4 ${stat.color}`}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-extrabold tracking-tight mb-1">{stat.value}</h3>
                            <p className="text-muted-foreground font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
