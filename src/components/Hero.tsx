"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";

// Floating doodle elements
const doodles = [
    { emoji: "🚀", size: "text-4xl", pos: "top-[18%] left-[8%]", delay: 0 },
    { emoji: "⭐", size: "text-3xl", pos: "top-[12%] right-[12%]", delay: 0.5 },
    { emoji: "💡", size: "text-3xl", pos: "bottom-[28%] left-[6%]", delay: 1 },
    { emoji: "🌍", size: "text-4xl", pos: "bottom-[20%] right-[8%]", delay: 1.5 },
    { emoji: "🎓", size: "text-2xl", pos: "top-[40%] right-[4%]", delay: 0.8 },
    { emoji: "💰", size: "text-2xl", pos: "top-[55%] left-[4%]", delay: 1.2 },
    { emoji: "🏆", size: "text-3xl", pos: "top-[25%] left-[18%]", delay: 0.3 },
    { emoji: "❤️", size: "text-2xl", pos: "bottom-[38%] right-[16%]", delay: 0.9 },
];

export function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Warm gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff8f0] via-[#fdf2e6] to-[#fce8d5]" />

            {/* Blob shapes */}
            <div className="blob-bg w-[600px] h-[600px] bg-[#d9441e]/8 -top-40 -left-40 absolute" />
            <div className="blob-bg w-[500px] h-[500px] bg-[#ffd93d]/15 -bottom-32 -right-32 absolute delay-300" style={{ animationDelay: "3s" }} />
            <div className="blob-bg w-[350px] h-[350px] bg-[#a855f7]/8 top-1/3 right-1/4 absolute" style={{ animationDelay: "1.5s" }} />

            {/* Confetti dots */}
            <div className="absolute inset-0 confetti-bg opacity-40" />

            {/* Floating doodles */}
            {doodles.map((d, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${d.pos} ${d.size} select-none pointer-events-none hidden lg:block`}
                    animate={{ y: [0, -14, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
                >
                    {d.emoji}
                </motion.div>
            ))}

            {/* Main content */}
            <div className="container mx-auto relative z-10 px-4 md:px-6 flex flex-col items-center text-center py-20 md:py-28">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="badge-fun bg-[#d9441e]/12 text-[#d9441e] mb-8 border border-[#d9441e]/25 shadow-sm"
                >
                    <GraduationCap className="w-4 h-4" />
                    Africa's #1 Youth Entrepreneurship Platform
                    <span className="ml-1">🌍</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6 max-w-5xl"
                >
                    <span className="text-[#2d1a0e]">Kids &amp; Teens</span>{" "}
                    <br className="hidden sm:block" />
                    <span className="squiggle gradient-text">University</span>
                    <span className="text-[#ffd93d] ml-2">✨</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="text-xl md:text-2xl text-[#7c3a10] max-w-2xl mx-auto mb-4 font-semibold leading-relaxed"
                >
                    Where kids and teens learn to run businesses, master investments, and shape the future.{" "}
                    <span className="text-[#d9441e] font-black">Ages 6–18.</span>
                </motion.p>

                {/* Fun pill tags */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {["🏪 Mini-Businesses", "📈 Investment Clubs", "🤝 Leadership", "💻 STEM Labs", "🎤 Pitch Competitions"].map((tag, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.45 + i * 0.06, type: "spring" }}
                            className="px-4 py-1.5 bg-white rounded-full text-sm font-bold text-[#7c3a10] border-2 border-[#f0dece] shadow-sm hover:border-[#d9441e] hover:text-[#d9441e] transition-colors cursor-default"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                >
                    <Link href="/membership" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            className="btn-bounce w-full text-xl px-10 py-7 rounded-2xl font-black shadow-lg shadow-[#d9441e]/30 border-2 border-[#b83518]"
                            style={{ background: "linear-gradient(135deg, #d9441e, #ff6b35)" }}
                        >
                            🚀 Join KTU Today <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Link href="/about" className="w-full sm:w-auto">
                        <Button
                            size="lg"
                            variant="outline"
                            className="btn-bounce w-full text-xl px-10 py-7 rounded-2xl font-black border-2 border-[#d9441e]/40 text-[#d9441e] hover:bg-[#d9441e]/8 bg-white/80"
                        >
                            Learn More 🌟
                        </Button>
                    </Link>
                </motion.div>

                {/* Social proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.75 }}
                    className="flex flex-wrap items-center justify-center gap-6 mt-12"
                >
                    {[
                        { num: "50k+", label: "Young Dreamers", emoji: "👦🏽" },
                        { num: "10", label: "Years Strong", emoji: "🏆" },
                        { num: "500+", label: "Startups Born", emoji: "🚀" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.08, rotate: 1 }}
                            className="bg-white rounded-2xl px-6 py-4 shadow-md border-2 border-[#f0dece] text-center hover:border-[#d9441e]/30 transition-all"
                        >
                            <div className="text-2xl mb-1">{stat.emoji}</div>
                            <div className="text-2xl font-black text-[#d9441e]">{stat.num}</div>
                            <div className="text-xs font-bold text-[#9a6a4a] uppercase tracking-wide">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
            >
                <span className="text-xs font-bold text-[#9a6a4a] uppercase tracking-widest">Scroll</span>
                <div className="w-6 h-10 border-2 border-[#d9441e]/40 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-2.5 bg-[#d9441e] rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
