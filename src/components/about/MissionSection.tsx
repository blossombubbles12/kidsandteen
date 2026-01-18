"use client";

import { motion } from "framer-motion";
import { Heart, Globe } from "lucide-react";
import { CldImage } from "@/components/media/CldImage";

export function MissionSection() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-primary font-bold tracking-wide uppercase mb-2">Our Mission</h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                            Connecting Paws, <br /> Creating Joy.
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            My Dog and I was born from a simple observation: dog owners in Lagos needed a safe,
                            fun, and organized way to connect. What started as a small WhatsApp group for
                            weekend walks has blossomed into a movement.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                    <Heart className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl">Love & Care</h4>
                                    <p className="text-muted-foreground">Promoting responsible ownership and welfare.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <Globe className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl">Community First</h4>
                                    <p className="text-muted-foreground">Building a support system for every dog parent.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <CldImage
                            src="homepage1_lnnftx"
                            alt="Connection between dog and human"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white max-w-xs">
                            <p className="font-serif italic text-2xl">"Dogs are not our whole life, but they make our lives whole."</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
