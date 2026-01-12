"use client";

import { motion } from "framer-motion";
import { Play, Dog } from "lucide-react";
import { useState, useRef } from "react";
import { MediaAsset } from "./GalleryGrid";
import { CinematicPlayer } from "./CinematicPlayer";

interface MediaHeroProps {
    media: MediaAsset[];
}

const BGM_URL = "https://res.cloudinary.com/dtw0ajpwa/video/upload/v1768145404/Djo_iaad1s.mp3";

export function MediaHero({ media }: MediaHeroProps) {
    const [isCinematicOpen, setIsCinematicOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-secondary/5 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
                {/* Visual texture/particles could go here */}
            </div>

            <div className="container px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center gap-6"
                >
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block mb-3 text-primary font-bold tracking-[0.2em] uppercase text-xs"
                        >
                            The Visual Anthology
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60"
                        >
                            Media & Moments
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
                        >
                            Capturing the soul, the joy, and the unbreakable bond of the pack.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 relative"
                    >
                        {/* Play Here Hint */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute -left-28 md:-left-32 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20 pointer-events-none"
                        >
                            <span className="font-handwriting text-primary/80 text-sm md:text-lg -rotate-12 whitespace-nowrap">Play Here</span>
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-primary/60 -rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10,50 Q50,20 90,50 T10,50" strokeDasharray="5,5" className="opacity-0" /> {/* Hidden guide */}
                                <path d="M20,50 C40,20 70,80 90,50" strokeLinecap="round" />
                                <path d="M80,45 L90,50 L82,60" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>

                        {/* Playful Dog Icon */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, -5, 5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-12 -right-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary z-20 border-2 border-primary/20"
                        >
                            <Dog className="w-6 h-6" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"
                            />
                        </motion.div>
                        <button
                            onClick={() => setIsCinematicOpen(true)}
                            className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary text-white shadow-[0_0_50px_rgba(234,88,12,0.3)] hover:shadow-[0_0_70px_rgba(234,88,12,0.5)] transition-all duration-500 hover:scale-110 active:scale-95"
                        >
                            {/* Rotating Ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/30 animate-[spin_8s_linear_infinite]" />

                            <div className="relative z-10 flex flex-col items-center gap-1">
                                <Play className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-1" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cinematic</span>
                            </div>

                            {/* Hover Ripple */}
                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping group-hover:opacity-20 pointer-events-none" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            <CinematicPlayer
                isOpen={isCinematicOpen}
                onClose={() => setIsCinematicOpen(false)}
                media={media}
                audioRef={audioRef}
            />

            <audio
                ref={audioRef}
                src={BGM_URL}
                loop
                preload="auto"
                className="hidden"
            />
        </section>
    );
}
