"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Expand, Play, FileVideo } from "lucide-react";
import { CldImage } from "./CldImage";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { cn } from "@/lib/utils";

export interface MediaAsset {
    id: string;
    src: string;
    cloudinaryId?: string;
    alt: string;
    caption?: string;
    type?: 'image' | 'video';
    format?: string;
}

interface GalleryGridProps {
    initialMedia?: MediaAsset[];
    allowEmpty?: boolean;
}

// Fallback Data
const fallbackMedia: MediaAsset[] = [
    { id: "1", src: "/event-preview.png", alt: "Studio Portrait", caption: "The Focused Gaze", type: "image", format: "png" },
    { id: "2", src: "/hero.png", alt: "Community Walk", caption: "Sunday Morning at Freedom Park", type: "image", format: "png" },
    { id: "3", src: "/carnival.png", alt: "Owner & Dog", caption: "Unconditional Love", type: "image", format: "png" },
    { id: "4", src: "/hero.png", alt: "Playful Moments", caption: "Golden Hour Play", type: "image", format: "png" },
    { id: "5", src: "/carnival.png", alt: "Carnival Vibes", caption: "Lagos Dog Carnival 2025", type: "image", format: "png" },
    { id: "6", src: "/event-preview.png", alt: "Portrait 2", caption: "Elegance", type: "image", format: "png" },
];

export function GalleryGrid({ initialMedia, allowEmpty = false }: GalleryGridProps) {
    const [items, setItems] = useState<MediaAsset[]>([]);
    const [visibleCount, setVisibleCount] = useState(20);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'gif'>('all');

    useEffect(() => {
        let baseItems = (!allowEmpty && (!initialMedia || initialMedia.length === 0)) ? fallbackMedia : (initialMedia || []);
        // Shuffle items to keep it fresh
        const shuffled = [...baseItems].sort(() => Math.random() - 0.5);
        setItems(shuffled);
    }, [initialMedia, allowEmpty]);

    const filteredItems = items.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'video') return item.type === 'video';
        const isGif = item.format === 'gif' || (item.src && item.src.endsWith('.gif'));
        if (filter === 'gif') return isGif;
        if (filter === 'image') return item.type === 'image' && !isGif;
        return true;
    });

    const visibleItems = filteredItems.slice(0, visibleCount);

    useEffect(() => {
        setSelectedImage(null);
    }, [filter]);

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImage(null);
    };
    const nextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImage((prev) => (prev !== null && prev < visibleItems.length - 1 ? prev + 1 : 0));
    };
    const prevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : visibleItems.length - 1));
    };

    const hasGifs = items.some(i => i.format === 'gif' || (i.src && i.src.endsWith('.gif')));
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'image', label: 'Images' },
        { id: 'video', label: 'Videos' },
        ...(hasGifs ? [{ id: 'gif', label: 'GIFs' }] : [])
    ];

    return (
        <section className="py-20 container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Featured Shots</h2>

            <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {filters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id as any)}
                        className={cn(
                            "px-5 py-2 rounded-full text-sm font-medium transition-all relative",
                            filter === f.id ? "text-white" : "text-muted-foreground hover:bg-secondary/20"
                        )}
                    >
                        {filter === f.id && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-primary rounded-full z-0"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{f.label}</span>
                    </button>
                ))}
            </div>

            <motion.div layout className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                {visibleItems.map((img, index) => (
                    <motion.div
                        layout
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="relative group break-inside-avoid overflow-hidden rounded-2xl cursor-pointer"
                        onClick={() => openLightbox(index)}
                    >
                        <CldImage
                            src={img.cloudinaryId || img.src}
                            fallback={img.src}
                            alt={img.alt}
                            width={600}
                            height={800}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            crop="fill"
                            {...(img.type === 'video' ? { assetType: 'video' } : {})}
                        />

                        {img.type === 'video' && (
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white z-10">
                                <Play className="w-5 h-5 fill-current" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                                    {img.type === 'video' ? (
                                        <><Play className="w-4 h-4" /> Watch Video</>
                                    ) : (
                                        <><Expand className="w-4 h-4" /> View Fullscreen</>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Load More Button */}
            {visibleCount < filteredItems.length && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 20)}
                        className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        Load More Magic
                    </button>
                </div>
            )}

            <AnimatePresence>
                {
                    selectedImage !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
                            onClick={() => closeLightbox()}
                        >
                            {/* Improved Close Button */}
                            <button
                                className="absolute top-8 right-8 text-white/70 hover:text-white hover:scale-110 transition-all z-[110] bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20"
                                onClick={(e) => closeLightbox(e)}
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <button
                                className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-all z-[110]"
                                onClick={(e) => prevImage(e)}
                            >
                                <ChevronLeft className="w-12 h-12" />
                            </button>

                            <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {visibleItems[selectedImage].type === 'video' ? (
                                        <div className="w-full h-full max-h-[70vh] rounded-xl overflow-hidden shadow-2xl">
                                            <CldVideoPlayer
                                                width="1920"
                                                height="1080"
                                                src={visibleItems[selectedImage].cloudinaryId || ""}
                                                colors={{
                                                    accent: "#ea580c",
                                                    base: "#000000",
                                                    text: "#ffffff"
                                                }}
                                                fontFace="Outfit"
                                            />
                                        </div>
                                    ) : (
                                        <CldImage
                                            src={visibleItems[selectedImage].cloudinaryId || visibleItems[selectedImage].src}
                                            fallback={visibleItems[selectedImage].src}
                                            alt={visibleItems[selectedImage].alt}
                                            fill
                                            className="object-contain"
                                        />
                                    )}
                                </div>
                            </div>

                            <button
                                className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-all z-[110]"
                                onClick={(e) => nextImage(e)}
                            >
                                <ChevronRight className="w-12 h-12" />
                            </button>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </section >
    );
}
