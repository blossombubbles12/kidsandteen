"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export function WorldRecord() {
    const targetDate = new Date("2026-12-13T09:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary via-orange-600 to-red-600 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-slide" />

            <div className="container relative z-10 px-4 md:px-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-8 shadow-lg"
                >
                    <Trophy className="w-4 h-4" /> KTU Annual Summit 2026
                </motion.div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-md"
                >
                    Africa's Largest <span className="text-yellow-300">Youth Leadership</span> Summit
                </motion.h2>

                <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
                    Join thousands of young leaders from across Africa for the <strong className="text-white border-b-2 border-yellow-400">biggest youth entrepreneurship gathering</strong> in Lagos, Nigeria.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Minutes", value: timeLeft.minutes },
                        { label: "Seconds", value: timeLeft.seconds },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30"
                        >
                            <div className="text-4xl md:text-5xl font-bold font-mono mb-2">{item.value}</div>
                            <div className="text-sm uppercase tracking-widest opacity-80">{item.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
