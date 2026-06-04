"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, GraduationCap, Briefcase } from "lucide-react";

export function CommunityHero() {
    return (
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/kidsteenleadership.jpeg"
                    alt="KTU Community"
                    fill
                    className="object-cover brightness-[0.4]"
                    priority
                />
            </div>

            <div className="container relative z-10 px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-sm font-medium mb-4 text-orange-200">
                        KTU Community
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Where Future Leaders Connect
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                        Connect with thousands of young entrepreneurs, innovators, and global thinkers.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <Users className="w-6 h-6 text-primary" /> 5k+
                            </div>
                            <span className="text-sm opacity-70">Young Members</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <GraduationCap className="w-6 h-6 text-primary" /> 50+
                            </div>
                            <span className="text-sm opacity-70">Startups Launched</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <Briefcase className="w-6 h-6 text-primary" /> ∞
                            </div>
                            <span className="text-sm opacity-70">Opportunities</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
