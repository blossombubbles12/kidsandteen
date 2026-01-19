"use client";

import Image from "next/image";

import { motion } from "framer-motion";

// Real sponsors images from public folder
const sponsors = [
    { name: "Sponsor 1", image: "/sponsor1.png" },
    { name: "Sponsor 2", image: "/sponsor2.png" },
    { name: "Sponsor 3", image: "/sponsor3.png" },
    { name: "Sponsor 4", image: "/sponsor4.png" },
    { name: "Sponsor 5", image: "/sponsor5.png" },
];

export function Sponsors() {
    return (
        <section className="py-20 bg-background border-y border-border/40 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
                <p className="text-base font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                    Our Partners & Sponsors
                </p>
            </div>

            <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

                {/* Marquee Container */}
                <motion.div
                    className="flex gap-12 md:gap-24 min-w-full items-center justify-around whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 40
                    }}
                >
                    {/* Multiplied list for seamless loop */}
                    {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                        <div key={`${sponsor.name}-${index}`} className="flex items-center justify-center transition-all cursor-pointer px-6 group">
                            <div className="relative w-40 h-16 md:w-60 md:h-24 transition-all duration-300 transform group-hover:scale-110">
                                <Image
                                    src={sponsor.image}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
