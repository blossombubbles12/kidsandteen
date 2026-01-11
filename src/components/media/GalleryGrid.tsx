"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand, Play, FileVideo } from "lucide-react";
import { CldImage } from "./CldImage";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export interface MediaAsset {
    id: string;
    src: string;
    cloudinaryId?: string;
    alt: string;
    caption?: string;
    type?: 'image' | 'video';
}

interface GalleryGridProps {
    initialMedia?: MediaAsset[];
}

// Fallback Data
const fallbackMedia: MediaAsset[] = [
    { id: "1", src: "/event-preview.png", alt: "Studio Portrait", caption: "The Focused Gaze" },
    { id: "2", src: "/hero.png", alt: "Community Walk", caption: "Sunday Morning at Freedom Park" },
    { id: "3", src: "/carnival.png", alt: "Owner & Dog", caption: "Unconditional Love" },
    { id: "4", src: "/hero.png", alt: "Playful Moments", caption: "Golden Hour Play" },
    { id: "5", src: "/carnival.png", alt: "Carnival Vibes", caption: "Lagos Dog Carnival 2025" },
    { id: "6", src: "/event-preview.png", alt: "Portrait 2", caption: "Elegance" },
];

export function GalleryGrid({ initialMedia }: GalleryGridProps) {
    const galleryItems = initialMedia && initialMedia.length > 0 ? initialMedia : fallbackMedia;
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);
    const nextImage = () => setSelectedImage((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
    const prevImage = () => setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));

    return (
        <section className="py-20 container px-4 mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Featured Shots</h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryItems.map((img, index) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
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
                                <p className="text-white font-medium text-lg">{img.caption}</p>
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
            </div>

            {selectedImage !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={closeLightbox}>
                        <X className="w-8 h-8" />
                    </button>

                    <button
                        className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        <ChevronLeft className="w-12 h-12" />
                    </button>

                    <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-full flex items-center justify-center">
                            {galleryItems[selectedImage].type === 'video' ? (
                                <div className="w-full h-full max-h-[70vh] rounded-xl overflow-hidden shadow-2xl">
                                    <CldVideoPlayer
                                        width="1920"
                                        height="1080"
                                        src={galleryItems[selectedImage].cloudinaryId || ""}
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
                                    src={galleryItems[selectedImage].cloudinaryId || galleryItems[selectedImage].src}
                                    fallback={galleryItems[selectedImage].src}
                                    alt={galleryItems[selectedImage].alt}
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </div>
                        <p className="text-white mt-8 text-lg font-medium tracking-wide">
                            {galleryItems[selectedImage].caption}
                        </p>
                    </div>

                    <button
                        className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        <ChevronRight className="w-12 h-12" />
                    </button>
                </motion.div>
            )}
        </section>
    );
}
