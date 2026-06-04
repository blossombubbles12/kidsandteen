"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const videos = [
    {
        id: 1,
        title: "KTU Shark Tank Highlights",
        duration: "2:30",
        image: "/kidspublicspeaking.jpeg"
    },
    {
        id: 2,
        title: "Kidspreneur Fair 2025",
        duration: "5:15",
        image: "/kidsboardroomleadership.jpeg"
    },
    {
        id: 3,
        title: "Student Success Stories",
        duration: "3:45",
        image: "/kidsteenleadership.jpeg"
    },
    {
        id: 4,
        title: "Investment Workshop",
        duration: "4:00",
        image: "/kidsfinancialliteracy.jpeg"
    },
];

export function Media() {
    return (
        <section className="py-24 bg-card">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                            KTU <span className="text-primary">Media</span>
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Watch highlights from Shark Tank, Kidspreneur Fairs, and student success stories.
                        </p>
                    </div>
                    <Button variant="outline">View Channel</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className={`relative aspect-video rounded-xl overflow-hidden bg-muted mb-3 shadow-sm group-hover:shadow-md transition-all`}>
                                <Image
                                    src={video.image}
                                    alt={video.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                        <Play className="h-6 w-6 text-foreground fill-foreground translate-x-0.5" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            </div>
                            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                {video.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
