"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const sponsors = [
    { name: "Sponsor 1", image: "/sponsor1.png" },
    { name: "Sponsor 2", image: "/sponsor2.png" },
    { name: "Sponsor 3", image: "/sponsor3.png" },
    { name: "Sponsor 4", image: "/sponsor4.png" },
    { name: "Sponsor 5", image: "/sponsor5.png" },
    { name: "Sponsor 6", image: "/sponsor6.png" },
    { name: "Sponsor 7", image: "/sponsor7.png" },
    { name: "Sponsor 8", image: "/sponsor8.PNG" },
    { name: "Sponsor 9", image: "/sponsor9.png" },
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export function Sponsors() {
    return (
        <section className="py-24 bg-background border-y border-border/40 overflow-hidden relative">
            {/* Background decorative element */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 mb-16 relative">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20"
                    >
                        <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Our Partners</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
                    >
                        The Brands That Power Us
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-primary mx-auto rounded-full"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 items-center justify-items-center"
                >
                    {sponsors.map((sponsor) => (
                        <motion.a
                            key={sponsor.name}
                            href="#"
                            variants={item}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group w-full aspect-[16/9] flex items-center justify-center p-6 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5 cursor-pointer overflow-hidden"
                        >
                            {/* Hover accent */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" />

                            <div className="relative w-full h-full z-10">
                                <Image
                                    src={sponsor.image}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain transition-all duration-500 scale-90 group-hover:scale-100"
                                />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        </section>
    );
}
