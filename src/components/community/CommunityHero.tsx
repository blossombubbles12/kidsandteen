"use client";

import { motion } from "framer-motion";
import { CldImage } from "@/components/media/CldImage";
import { Users, MessageCircle, Heart } from "lucide-react";

export function CommunityHero() {
    return (
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <CldImage
                    src="mydog/community_hero"
                    fallback="/hero.png"
                    alt="Community Gathering"
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
                        The Village Square
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Where the Pack Comes Together
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                        Connect with thousands of pet lovers, share advice, and make lifelong friends.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <Users className="w-6 h-6 text-primary" /> 50k+
                            </div>
                            <span className="text-sm opacity-70">Pack Members</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <MessageCircle className="w-6 h-6 text-primary" /> 120+
                            </div>
                            <span className="text-sm opacity-70">Daily Topics</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <Heart className="w-6 h-6 text-primary" /> ∞
                            </div>
                            <span className="text-sm opacity-70">Belly Rubs</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
