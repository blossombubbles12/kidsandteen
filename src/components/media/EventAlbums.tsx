"use client";

import { motion } from "framer-motion";
import { FolderHeart, ArrowRight } from "lucide-react";
import { CldImage } from "@/components/media/CldImage";
import { Button } from "@/components/ui/button";

const albums = [
    {
        title: "Sunday Dog Walk",
        date: "Jan 12, 2025",
        count: 24,
        cover: "/hero.png",
    },
    {
        title: "Puppy Playdate",
        date: "Dec 20, 2024",
        count: 15,
        cover: "/carnival.png",
    },
    {
        title: "Agility Training",
        date: "Nov 15, 2024",
        count: 42,
        cover: "/event-preview.png",
    },
];

export function EventAlbums() {
    return (
        <section className="py-16 bg-background">
            <div className="container px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Event Albums</h2>
                    <Button variant="ghost" className="gap-2">View All Albums <ArrowRight className="w-4 h-4" /></Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {albums.map((album, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                                <CldImage
                                    src={album.cover}
                                    fallback={album.cover}
                                    alt={album.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <FolderHeart className="w-3 h-3 text-primary" /> {album.count} Photos
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{album.title}</h3>
                            <p className="text-muted-foreground text-sm">{album.date}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
