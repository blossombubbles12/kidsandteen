"use client";

import { motion } from "framer-motion";
import { Play, Heart, ShieldAlert, Users, Calendar, MapPin } from "lucide-react";
import { CldVideo } from "@/components/media/CldVideo";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { Badge } from "@/components/ui/badge";

interface ACMSPageContentProps {
    initialMedia: any[];
}

export function ACMSPageContent({ initialMedia }: ACMSPageContentProps) {
    // Transforming initialMedia to MediaAsset format for GalleryGrid
    const galleryItems = initialMedia.map((asset: any) => ({
        id: asset.public_id,
        src: asset.secure_url,
        cloudinaryId: asset.public_id,
        alt: asset.context?.custom?.alt || "ACMS March Image",
        type: asset.resource_type === 'video' ? 'video' : 'image',
        format: asset.format
    }));

    const videoSrc = "JUSTICE_FOR_ROXIE_-_My_dog_and_i_group_480p_h264_youtube_dz2zue";

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover grayscale opacity-50"
                        src="https://res.cloudinary.com/dtw0ajpwa/video/upload/so_20,du_30,q_auto,f_auto/v1768755605/JUSTICE_FOR_ROXIE_-_My_dog_and_i_group_480p_h264_youtube_dz2zue.mp4"
                    />
                </div>

                <div className="container relative z-20 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
                            Official Awareness Campaign
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
                    >
                        ANIMAL CRUELTY <br />
                        <span className="text-red-600">MUST STOP.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium"
                    >
                        Revisiting the historic 2023 ACMS March. A movement born from compassion,
                        fueled by justice, and sustained by the My Dog and I community.
                    </motion.p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </div>
            </section>

            {/* The Story Section */}
            <section className="py-24 container px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                            The Day We Marched <br />
                            <span className="text-primary italic">For the Voiceless.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                In March 2023, hundreds of pet owners, lovers, and advocates converged with a single mission:
                                to demand better protection and treatment for animals across Nigeria.
                            </p>
                            <p>
                                The "Animal Cruelty Must Stop" (ACMS) march wasn't just a walk; it was a loud
                                declaration that every pet deserves a life free from pain, neglect, and abuse.
                                We walked through the streets of Lagos, carrying banners and the hopes of animals who couldn't speak for themselves.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Calendar className="text-primary w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">March 2023</h4>
                                        <p className="text-sm">Historic Rally</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center shrink-0">
                                        <MapPin className="text-primary w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Lagos, Nigeria</h4>
                                        <p className="text-sm">Street Awareness</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -rotate-2 z-0" />
                        <CldVideo
                            src={videoSrc}
                            width="1920"
                            height="1080"
                            className="relative z-10 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl"
                        />
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                            <Play className="w-4 h-4" /> Watch the Justice for Roxie tribute
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Impact Cards */}
            <section className="py-20 bg-secondary/30 relative overflow-hidden">
                <div className="container px-4 sm:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Why We Do It</h2>
                        <p className="text-muted-foreground text-lg">
                            The ACMS movement is built on four core pillars of animal advocacy and protection.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Heart, title: "Compassion", desc: "Building a culture that values animal lives as sentient beings.", color: "bg-pink-500/10 text-pink-600" },
                            { icon: ShieldAlert, title: "Protection", desc: "Advocating for stronger laws against animal abuse and neglect.", color: "bg-orange-500/10 text-orange-600" },
                            { icon: Users, title: "Community", desc: "Educating pet owners on responsible and ethical pet care.", color: "bg-blue-500/10 text-blue-600" },
                            { icon: Play, title: "Awareness", desc: "Using media and rallies to keep the conversation alive.", color: "bg-primary/10 text-primary" },
                        ].map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-background border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${pillar.color} flex items-center justify-center mb-6`}>
                                    <pillar.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 bg-background">
                <div className="container px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-black mb-4">March Memories</h2>
                            <p className="text-muted-foreground text-lg italic">
                                Captured moments from the "Animal Cruelty Must Stop March".
                                Visual evidence of the passion and unity of our community.
                            </p>
                        </div>
                    </div>

                    <GalleryGrid initialMedia={galleryItems} allowEmpty={true} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 mb-10">
                <div className="container px-4 sm:px-6">
                    <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to Take a Stand?</h2>
                            <p className="text-xl text-white/80 mb-10">
                                Join the My Dog and I community and be the first to know about our next
                                ACMS march and awareness campaigns.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/membership"
                                    className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-white/90 transition-colors shadow-xl"
                                >
                                    Become a Member
                                </a>
                                <a
                                    href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT"
                                    target="_blank"
                                    className="px-8 py-4 bg-black/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/30 transition-colors"
                                >
                                    Join Our Community
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
