"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy, Heart } from "lucide-react";

export function AnniversaryBanner() {
    return (
        <section className="relative py-12 bg-[#6B21A8] overflow-hidden text-white border-y-4 border-yellow-400/30">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')]" />
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-transparent to-black/30 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                        <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                            <Sparkles className="w-3 h-3" /> 10th Anniversary
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-3">
                            A Decade of <span className="text-yellow-400">Impact</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-purple-100 font-medium max-w-xl">
                            Celebrating 10 years of My Dog and I Group—Africa's largest gathering of Pets.
                        </p>
                    </motion.div>

                    <div className="flex gap-6 md:gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-3 border border-white/20 shadow-2xl group hover:scale-110 transition-transform">
                                <Trophy className="w-10 h-10 text-yellow-400" />
                            </div>
                            <span className="text-3xl font-black text-yellow-400">10</span>
                            <span className="text-xs uppercase tracking-widest opacity-80 font-bold">Years</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-3 border border-white/20 shadow-2xl group hover:scale-110 transition-transform">
                                <Heart className="w-10 h-10 text-purple-300" />
                            </div>
                            <span className="text-3xl font-black text-purple-200">50k+</span>
                            <span className="text-xs uppercase tracking-widest opacity-80 font-bold">Members</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-3 border border-white/20 shadow-2xl group hover:scale-110 transition-transform">
                                <Sparkles className="w-10 h-10 text-yellow-200" />
                            </div>
                            <span className="text-3xl font-black text-white">∞</span>
                            <span className="text-xs uppercase tracking-widest opacity-80 font-bold">Love</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
