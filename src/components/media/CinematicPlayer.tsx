"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, SkipForward } from "lucide-react";
import { MediaAsset } from "./GalleryGrid";
import { CldImage } from "./CldImage";
import { CldVideoPlayer } from "next-cloudinary";

interface CinematicPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    media: MediaAsset[];
}

export function CinematicPlayer({ isOpen, onClose, media }: CinematicPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledMedia, setShuffledMedia] = useState<MediaAsset[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Shuffle media on start
    useEffect(() => {
        if (isOpen && media.length > 0) {
            const shuffled = [...media].sort(() => Math.random() - 0.5);
            setShuffledMedia(shuffled);
            setCurrentIndex(0);
            setIsPaused(false);
        }
    }, [isOpen, media]);

    const nextMedia = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % shuffledMedia.length);
    }, [shuffledMedia.length]);

    // Handle image timing
    useEffect(() => {
        if (isOpen && !isPaused && shuffledMedia[currentIndex]?.type !== "video") {
            timerRef.current = setTimeout(nextMedia, 5000); // 5 seconds for images
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isOpen, currentIndex, isPaused, shuffledMedia, nextMedia]);

    if (!isOpen || shuffledMedia.length === 0) return null;

    const currentItem = shuffledMedia[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Background Ken Burns Effect for Images */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentItem.id}
                            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1.02, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                            className="w-full h-full"
                        >
                            {currentItem.type === "video" ? (
                                <div className="w-full h-full bg-black flex items-center justify-center">
                                    <CldVideoPlayer
                                        width="1920"
                                        height="1080"
                                        src={currentItem.cloudinaryId || ""}
                                        autoPlay
                                        muted={isMuted}
                                        onEnded={nextMedia}
                                        className="w-full h-full object-contain"
                                        controls={false}
                                    />
                                </div>
                            ) : (
                                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                                    <motion.div
                                        className="relative w-full h-full"
                                        animate={{
                                            scale: [1.02, 1.1],
                                            x: [-10, 10],
                                            y: [-5, 5]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "linear"
                                        }}
                                    >
                                        <CldImage
                                            src={currentItem.cloudinaryId || currentItem.src}
                                            alt={currentItem.alt}
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                    {/* Sublte radial gradient for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Overlays */}
                <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-start z-20">
                    <div className="max-w-xl">
                        <motion.div
                            key={`caption-${currentItem.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">
                                Now Showing
                            </span>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white drop-shadow-2xl">
                                {currentItem.caption || "A Moment with the Pack"}
                            </h3>
                            <p className="text-white/40 mt-4 text-sm font-medium tracking-widest uppercase">
                                {currentIndex + 1} &mdash; {shuffledMedia.length}
                            </p>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="group p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-2xl transition-all active:scale-90 border border-white/10"
                        >
                            {isMuted ? <VolumeX className="w-6 h-6 text-white/60 group-hover:text-white" /> : <Volume2 className="w-6 h-6 text-white/60 group-hover:text-white" />}
                        </button>
                        <button
                            onClick={onClose}
                            className="group p-4 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-2xl transition-all active:scale-90 border border-white/10"
                        >
                            <X className="w-6 h-6 text-white/60 group-hover:text-white" />
                        </button>
                    </div>
                </div>

                {/* Bottom Center Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20">
                    <div className="flex items-center gap-10 px-10 py-5 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-2xl">
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="text-white/70 hover:text-primary transition-all active:scale-90"
                        >
                            {isPaused ? <Play className="w-10 h-10 fill-current" /> : <Pause className="w-10 h-10 fill-current" />}
                        </button>

                        <div className="w-40 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`progress-${currentItem.id}-${isPaused}`}
                                    initial={{ width: 0 }}
                                    animate={isPaused || currentItem.type === 'video' ? { width: '0%' } : { width: '100%' }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    className="h-full bg-primary shadow-[0_0_15px_rgba(234,88,12,0.8)]"
                                />
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={nextMedia}
                            className="text-white/70 hover:text-primary transition-all active:scale-90"
                        >
                            <SkipForward className="w-10 h-10 fill-current" />
                        </button>
                    </div>
                </div>

                {/* Emotional Branding */}
                <div className="absolute bottom-6 right-8 opacity-40 pointer-events-none">
                    <p className="text-xl font-bold font-serif italic tracking-widest">My Dog and I</p>
                </div>

            </motion.div>
        </AnimatePresence>
    );
}
