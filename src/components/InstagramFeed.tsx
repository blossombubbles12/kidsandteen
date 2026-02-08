"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "@/components/media/CldImage";

const instagramPosts = [
    {
        id: 1,
        image: "homepage1_lnnftx",
        likes: "1.2k",
        comments: "84",
        link: "https://www.instagram.com/mydogandigroup2"
    },
    {
        id: 2,
        image: "homepage2_gsja4s",
        likes: "2.5k",
        comments: "156",
        link: "https://www.instagram.com/mydogandigroup2"
    },
    {
        id: 3,
        image: "homepage3_fqiznc",
        likes: "1.8k",
        comments: "92",
        link: "https://www.instagram.com/mydogandigroup2"
    },
    {
        id: 4,
        image: "homepage4_sdyykt",
        likes: "3.1k",
        comments: "210",
        link: "https://www.instagram.com/mydogandigroup2"
    },
    {
        id: 5,
        image: "homepage5_v0on8b",
        likes: "1.5k",
        comments: "65",
        link: "https://www.instagram.com/mydogandigroup2"
    },
    {
        id: 6,
        image: "homepage6_u4t2e9",
        likes: "2.2k",
        comments: "112",
        link: "https://www.instagram.com/mydogandigroup2"
    }
];

interface InstagramFeedProps {
    media?: MediaAsset[];
}

export function InstagramFeed({ media = [] }: InstagramFeedProps) {
    // If no media is provided, use the fallback posts
    const posts = media.length > 0
        ? media.map((m, i) => ({
            id: m.id,
            image: m.cloudinaryId || m.src,
            likes: `${(Math.floor(Math.random() * 50) + 10) / 10}k`, // Mock likes for aesthetic
            comments: Math.floor(Math.random() * 100) + 20,
            link: "https://www.instagram.com/mydogandigroup2"
        }))
        : instagramPosts;
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container px-4 md:px-6 mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-4">
                        <Instagram className="w-5 h-5" />
                        On Instagram
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Follow the <span className="text-primary">Movement</span>
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">
                        Get daily doses of cute, advocacy updates, and carnival preparations.
                    </p>
                </div>
                <Link
                    href="https://www.instagram.com/mydogandigroup2"
                    target="_blank"
                    className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl"
                >
                    @mydogandigroup2 <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="relative">
                <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative min-w-[280px] md:min-w-[350px] aspect-square rounded-3xl overflow-hidden group snap-center"
                        >
                            <CldImage
                                src={post.image}
                                alt="Instagram post"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-8 text-white">
                                <Link
                                    href={post.link}
                                    target="_blank"
                                    className="flex items-center gap-2 font-bold text-lg"
                                >
                                    <Heart className="w-6 h-6 fill-white" /> {post.likes}
                                </Link>
                                <Link
                                    href={post.link}
                                    target="_blank"
                                    className="flex items-center gap-2 font-bold text-lg"
                                >
                                    <MessageCircle className="w-6 h-6 fill-white" /> {post.comments}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Gradient Fades for Scroll */}
                <div className="absolute top-0 left-0 bottom-8 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none hidden md:block" />
                <div className="absolute top-0 right-0 bottom-8 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none hidden md:block" />
            </div>
        </section>
    );
}
