"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/kidsteenleadership.jpeg"
                    alt="KTU Students"
                    fill
                    className="object-cover brightness-50"
                    priority
                    sizes="100vw"
                />
            </div>

            <div className="container relative z-10 px-4 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Our Story
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
                        Founded on the belief that the next generation of African leaders need practical skills, not just theory.
                        We are building the largest youth entrepreneurship community in West Africa.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
