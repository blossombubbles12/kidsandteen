"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
    uploadImages?: { secure_url: string; public_id?: string }[];
}

export function Hero({ uploadImages }: HeroProps) {
    const images = uploadImages?.slice(0, 6) || [];
    const [slideIdx, setSlideIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        if (images.length === 0) return;
        setSlideIdx((c) => (c + 1) % images.length);
    }, [images.length]);

    const prev = () => {
        if (images.length === 0) return;
        setSlideIdx((c) => (c - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (paused || images.length === 0) return;
        const t = setInterval(next, 4000);
        return () => clearInterval(t);
    }, [paused, next, images.length]);

    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20">
            {/* Warm light gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] via-[#f5f0eb] to-[#efe8e0]" />

            {/* Blob shapes */}
            <div className="blob-bg w-[600px] h-[600px] bg-[#e50a1e]/6 -top-40 -left-40 absolute" />
            <div className="blob-bg w-[500px] h-[500px] bg-[#545454]/8 -bottom-32 -right-32 absolute delay-300" style={{ animationDelay: "3s" }} />

            {/* Confetti dots */}
            <div className="absolute inset-0 confetti-bg opacity-30" />

            {/* Main content */}
            <div className="container mx-auto relative z-10 px-4 md:px-6 py-20 md:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    {/* LEFT — Content */}
                    <div className="flex flex-col text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="badge-fun bg-[#e50a1e]/10 text-[#e50a1e] mb-8 border border-[#e50a1e]/20 shadow-sm inline-flex self-center lg:self-start"
                        >
                            <GraduationCap className="w-4 h-4" />
                            Africa's #1 Youth Entrepreneurship Platform
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
                        >
                            <span className="text-[#1a1a1a]">Kids &amp; Teens</span>{" "}
                            <br className="hidden sm:block" />
                            <span className="squiggle gradient-text">University</span>
                            <span className="text-[#e50a1e] ml-2"></span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="text-xl md:text-2xl text-[#545454] max-w-2xl mx-auto lg:mx-0 mb-4 font-semibold leading-relaxed"
                        >
                            Where kids and teens learn to run businesses, master investments, and shape the future.{" "}
                            <span className="text-[#e50a1e] font-black">Ages 6–18.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start"
                        >
                            {[" Mini-Businesses", " Investment Clubs", " Leadership", " STEM Labs", " Pitch Competitions"].map((tag, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.45 + i * 0.06, type: "spring" }}
                                    className="px-4 py-1.5 bg-white rounded-full text-sm font-bold text-[#545454] border-2 border-[#e5e0db] shadow-sm hover:border-[#e50a1e] hover:text-[#e50a1e] transition-colors cursor-default"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/membership" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="btn-bounce w-full text-xl px-10 py-7 rounded-2xl font-black shadow-lg shadow-[#e50a1e]/25 border-2 border-[#cc0000]"
                                    style={{ background: "linear-gradient(135deg, #e50a1e, #cc0000)" }}
                                >
                                     Join KTU Today <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/about" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="btn-bounce w-full text-xl px-10 py-7 rounded-2xl font-black border-2 border-[#e50a1e]/30 text-[#e50a1e] hover:bg-[#e50a1e]/8 bg-white/80"
                                >
                                    Learn More 
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.75 }}
                            className="flex flex-wrap items-center gap-6 mt-12 justify-center lg:justify-start"
                        >
                            {[
                                { num: "50k+", label: "Young Dreamers" },
                                { num: "10", label: "Years Strong" },
                                { num: "500+", label: "Startups Born" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.08, rotate: 1 }}
                                    className="bg-white rounded-2xl px-6 py-4 shadow-md border-2 border-[#e5e0db] text-center hover:border-[#e50a1e]/25 transition-all"
                                >
                                    <div className="text-2xl font-black text-[#e50a1e]">{stat.num}</div>
                                    <div className="text-xs font-bold text-[#545454] uppercase tracking-wide">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT — Sliding Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block relative"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/80">
                            {images.length > 0 ? (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={slideIdx}
                                        initial={{ opacity: 0, x: 60 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -60 }}
                                        transition={{ duration: 0.45, ease: "easeOut" }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={images[slideIdx].secure_url}
                                            alt={`KTU moment ${slideIdx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="50vw"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                                    <p className="text-[#545454] font-semibold">Gallery moments loading...</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>

                        {images.length > 1 && (
                            <>
                                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center hover:bg-white transition-all">
                                    <ChevronLeft className="w-4 h-4 text-[#1a1a1a]" />
                                </button>
                                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur shadow-md flex items-center justify-center hover:bg-white transition-all">
                                    <ChevronRight className="w-4 h-4 text-[#1a1a1a]" />
                                </button>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSlideIdx(i)}
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                i === slideIdx ? "w-6 bg-white" : "w-2 bg-white/50"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
            >
                <span className="text-xs font-bold text-[#545454] uppercase tracking-widest">Scroll</span>
                <div className="w-6 h-10 border-2 border-[#e50a1e]/30 rounded-full flex justify-center p-1">
                    <div className="w-1.5 h-2.5 bg-[#e50a1e] rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
