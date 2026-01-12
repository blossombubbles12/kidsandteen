"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FolderHeart, ArrowRight, FolderPlus } from "lucide-react";
import { CldImage } from "@/components/media/CldImage";
import { Button } from "@/components/ui/button";
import { AlbumData } from "@/app/actions/media";

interface EventAlbumsProps {
    albums?: AlbumData[];
}

export function EventAlbums({ albums = [] }: EventAlbumsProps) {
    if (!albums || albums.length === 0) {
        return (
            <section className="py-16 bg-background">
                <div className="container px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6 py-20 border-2 border-dashed rounded-3xl border-muted/50 bg-secondary/5"
                    >
                        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center text-primary mb-2 shadow-sm">
                            <FolderPlus className="w-10 h-10" />
                        </div>
                        <div className="text-center space-y-2 max-w-md">
                            <h3 className="text-2xl font-bold">No Albums Found</h3>
                            <p className="text-muted-foreground">
                                Organize your media into folders in Cloudinary, and they will automatically appear here as collection albums.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-background">
            <div className="container px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">Event Albums</h2>
                    <Button variant="ghost" className="gap-2">View All Albums <ArrowRight className="w-4 h-4" /></Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {albums.map((album) => (
                        <Link
                            key={album.path}
                            href={`/media/album/${album.path}`}
                            className="block"
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                                    {album.coverId ? (
                                        <CldImage
                                            src={album.coverId}
                                            alt={album.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary/20 flex items-center justify-center relative">
                                            <Image
                                                src="/hero.png"
                                                alt={album.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <FolderHeart className="w-3 h-3 text-primary" /> {album.count} items
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors capitalize">{album.name.replace(/[_-]/g, ' ')}</h3>
                                <p className="text-muted-foreground text-sm">Collection</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
