"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand, Play } from "lucide-react";
import { CldImage } from "./CldImage";
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { MediaAsset } from "./GalleryGrid";

interface GalleryPreviewProps {
    media: MediaAsset[];
}

export function GalleryPreview({ media }: GalleryPreviewProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImage(null);
    };
    const nextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImage((prev) => (prev !== null && prev < media.length - 1 ? prev + 1 : 0));
    };
    const prevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setSelectedImage((prev) => (prev !== null && prev > 0 ? prev - 1 : media.length - 1));
    };

    if (!media || media.length === 0) return null;

    return (
        <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {media.map((img, index) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative group overflow-hidden rounded-2xl cursor-pointer ${index === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                            }`}
                        onClick={() => openLightbox(index)}
                    >
                        <CldImage
                            src={img.cloudinaryId || img.src}
                            fallback={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            crop="fill"
                            {...(img.type === 'video' ? { assetType: 'video' } : {})}
                        />

                        {img.type === 'video' && (
                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white z-10">
                                <Play className="w-4 h-4 fill-current" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <Expand className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
                        onClick={() => closeLightbox()}
                    >
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
                                {media[selectedImage].type === 'video' ? (
                                    <div className="w-full h-full max-h-[70vh] rounded-xl overflow-hidden shadow-2xl">
                                        <CldVideoPlayer
                                            width="1920"
                                            height="1080"
                                            src={media[selectedImage].cloudinaryId || ""}
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
                                        src={media[selectedImage].cloudinaryId || media[selectedImage].src}
                                        fallback={media[selectedImage].src}
                                        alt={media[selectedImage].alt}
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
                )}
            </AnimatePresence>
        </div>
    );
}
