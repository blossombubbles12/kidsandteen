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
    audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export function CinematicPlayer({ isOpen, onClose, media, audioRef }: CinematicPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledMedia, setShuffledMedia] = useState<MediaAsset[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isUIVisible, setIsUIVisible] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const uiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Shuffle media on start
    useEffect(() => {
        if (isOpen && media.length > 0) {
            const shuffled = [...media].sort(() => Math.random() - 0.5);
            setShuffledMedia(shuffled);
            setCurrentIndex(0);
            setIsPaused(false);
            setIsMuted(false);
            showUI();
        }
    }, [isOpen, media]);

    // UI Auto-hide logic
    const showUI = useCallback(() => {
        setIsUIVisible(true);
        if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
        uiTimeoutRef.current = setTimeout(() => {
            if (!isPaused) setIsUIVisible(false);
        }, 3000);
    }, [isPaused]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("mousemove", showUI);
            window.addEventListener("click", showUI);
            return () => {
                window.removeEventListener("mousemove", showUI);
                window.removeEventListener("click", showUI);
                if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
            };
        }
    }, [isOpen, showUI]);

    // Handle background music
    useEffect(() => {
        if (isOpen && audioRef?.current) {
            if (isPaused) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => console.log("Audio play failed:", err));
            }
        } else if (!isOpen && audioRef?.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [isOpen, isPaused, audioRef]);

    useEffect(() => {
        if (audioRef?.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted, audioRef]);

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
                className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center overflow-hidden cursor-none" // hidden cursor to enhance immersion when UI is gone? maybe just rely on UI element fade
                style={{ cursor: isUIVisible ? "auto" : "none" }}
            >
                {/* Background Ken Burns Effect for Images */}
                <div className="absolute inset-0 z-0 pointer-events-none">
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

                {/* Overlays Wrapper */}
                <motion.div
                    animate={{ opacity: isUIVisible ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 pointer-events-none"
                >
                    {/* Top Section */}
                    <div className="flex justify-between items-start pointer-events-auto">
                        <div className="max-w-xl">
                            <motion.div
                                key={`info-${currentIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-1"
                            >
                                <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] block">
                                    Now Showing
                                </span>
                                <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
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

                    {/* Bottom Controls */}
                    <div className="flex justify-center pointer-events-auto">
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
                </motion.div>

                {/* Emotional Branding (Always visible or also faded? Let's fade it for total black) */}
                <motion.div
                    animate={{ opacity: isUIVisible ? 0.4 : 0 }}
                    className="absolute bottom-6 right-8 pointer-events-none"
                >
                    <p className="text-xl font-bold font-serif italic tracking-widest text-white">My Dog and I</p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
