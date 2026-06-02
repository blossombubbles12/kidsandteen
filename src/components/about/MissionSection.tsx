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
                            Raising Africa's <br /> Next Leaders.
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            KTU was born from a powerful belief: every child is a genius with unique gifts.
                            We unlock that genius by giving young people platforms to run businesses, manage
                            investments, and lead change — starting as early as age 6.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                    <Heart className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl">Entrepreneurship</h4>
                                    <p className="text-muted-foreground">Launching real businesses, not just ideas.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <Globe className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl">Global Leadership</h4>
                                    <p className="text-muted-foreground">Building confident, compassionate leaders.</p>
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
                            alt="Young entrepreneur"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white max-w-xs">
                            <p className="font-serif italic text-2xl">"Every child is a genius. We unlock that genius."</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
