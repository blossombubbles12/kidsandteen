"use client";

import { motion } from "framer-motion";
import { CldImage } from "@/components/media/CldImage";

export function AboutHero() {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <CldImage
                    src="homepage7_dl6l1z"
                    alt="Community and dogs"
                    fill
                    className="object-cover brightness-50"
                    priority
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
                        Founded on the belief that life is better with a dog by your side.
                        We are building the largest community of dog lovers in West Africa.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
