"use client";

import { motion } from "framer-motion";
import { Dog, Star, Bone, Crown, Award } from "lucide-react";

// Mock sponsors with icons
const sponsors = [
    { name: "PawSome Treats", icon: Bone },
    { name: "Royal Canin", icon: Crown },
    { name: "PetSmart", icon: Dog },
    { name: "Best In Show", icon: Award },
    { name: "Star Pups", icon: Star },
    { name: "BarkBox", icon: Bone },
    { name: "Chewy", icon: Dog },
    { name: "Petco", icon: Award },
];

export function Sponsors() {
    return (
        <section className="py-12 bg-background border-y border-border/40 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Trusted by Top Brands
                </p>
            </div>

            <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                {/* Gradient Masks (optional extra overlay if mask-image isn't enough, but mask-image is cleaner) */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                {/* Marquee Container */}
                <motion.div
                    className="flex gap-16 min-w-full items-center justify-around whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {/* Double the list to create seamless loop */}
                    {[...sponsors, ...sponsors].map((sponsor, index) => (
                        <div key={`${sponsor.name}-${index}`} className="flex items-center space-x-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                            <sponsor.icon className="w-8 h-8" />
                            <span className="text-xl font-bold font-sans">{sponsor.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
