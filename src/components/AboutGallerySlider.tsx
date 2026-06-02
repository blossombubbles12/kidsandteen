"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AboutGallerySliderProps {
    images: any[];
}

export function AboutGallerySlider({ images }: AboutGallerySliderProps) {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    if (!images || images.length === 0) return null;

    const next = () => setCurrent((c) => (c + 1) % images.length);
    const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

    useEffect(() => {
        if (paused || images.length <= 1) return;
        const t = setInterval(next, 4000);
        return () => clearInterval(t);
    }, [paused, images.length]);

    return (
        <section
            className="py-24 bg-[#1a0f07] relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="container mx-auto px-5">
                <div className="text-center mb-12">
                    <span className="badge-fun bg-white/10 text-white border border-white/20 mb-5">
                        📸 KTU IN ACTION
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white">
                        Moments That <span className="text-[#ffd93d]">Matter</span> ✨
                    </h2>
                    <p className="text-base text-white/60 font-semibold mt-4 max-w-xl mx-auto">
                        A glimpse into the energy, creativity, and community that makes KTU special.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -80 }}
                            transition={{ duration: 0.4 }}
                            className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <img
                                src={images[current].secure_url}
                                alt={images[current].context?.alt || `KTU moment ${current + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                            {/* KTU watermark */}
                            <div className="absolute top-5 left-5 w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-xs font-black text-white border border-white/20">
                                KTU
                            </div>
                            {/* Counter */}
                            <div className="absolute bottom-5 right-5 px-3 py-1.5 bg-black/40 backdrop-blur rounded-full text-white/80 text-xs font-bold">
                                {current + 1} / {images.length}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots */}
                {images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {images.slice(0, 8).map((_: any, i: number) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === current ? "w-8 bg-[#ffd93d]" : "w-2 bg-white/25 hover:bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
