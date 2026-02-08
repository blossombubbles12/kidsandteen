"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CldImage } from "@/components/media/CldImage";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Trophy, Star, Heart } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Africa's Largest Pet Gathering",
        description: "Celebrating 10 years of love, advocacy, and Pet-tastic community building across Nigeria.",
        image: "/hero.png",
        cloudinaryId: "homepage1_lnnftx",
        primaryCTA: { text: "Find Events", url: "/events" },
        secondaryCTA: { text: "Join the Pack", url: "/membership" },
        accent: "text-primary-foreground",
        icon: Heart
    },
    {
        id: 2,
        title: "Breaking History in 2026",
        description: "Be part of our Guinness World Record attempt at Tafawa Balewa Square. December 13th, 2026.",
        image: "/carnival.png",
        cloudinaryId: "homepage2_gsja4s",
        primaryCTA: { text: "Explore Carnival", url: "/carnival" },
        secondaryCTA: { text: "Register Now", url: "/carnival/register" },
        accent: "text-yellow-400",
        icon: Trophy
    },
    {
        id: 3,
        title: "The Inner Circle Membership",
        description: "Unlock premium benefits, official ID cards, and VIP access to Africa's largest pet events.",
        image: "/event-preview.png",
        cloudinaryId: "homepage3_fqiznc",
        primaryCTA: { text: "View Plans", url: "/membership" },
        secondaryCTA: { text: "Join Today", url: "/membership" },
        accent: "text-blue-400",
        icon: Star
    }
];

export function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-16 md:pt-20 pb-12">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://res.cloudinary.com/dtw0ajpwa/image/upload/v1736611417/homepage8_zaj3az.jpg"
                    className="w-full h-full object-cover brightness-[0.5] scale-105"
                >
                    <source src="https://res.cloudinary.com/dtw0ajpwa/video/upload/so_20,du_30,q_auto,f_auto/v1768755605/JUSTICE_FOR_ROXIE_-_My_dog_and_i_group_480p_h264_youtube_dz2zue.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto relative z-10 px-4 md:px-6 flex flex-col items-center text-center pt-12 pb-20 md:pt-16 md:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl space-y-8 md:space-y-12"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2.5 md:px-8 md:py-3 rounded-full border border-white/20 text-white text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-8 shadow-2xl">
                        <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                        Guinness World Record Attempt 2026
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-2xl leading-[1.05] uppercase">
                        Lagos Dog <span className="text-yellow-400">Carnival</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-white/90 max-w-3xl mx-auto drop-shadow-sm font-medium leading-relaxed">
                        Join Africa&apos;s largest gathering of Pets. Making history on <span className="text-yellow-400 font-bold">Dec 13th, 2026</span> at Tafawa Balewa Square.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 pb-8">
                        <Link href="/carnival" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full text-xl px-12 py-9 rounded-2xl shadow-2xl bg-yellow-400 text-black hover:bg-yellow-300 transition-all font-black group">
                                Explore Carnival <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/carnival/register" className="w-full sm:w-auto">
                            <Button size="lg" variant="outline" className="w-full text-xl px-12 py-9 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-black transition-all font-black">
                                Register Now
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 hidden md:block"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}

/* 
// Previous Slider implementation commented out temporarily
export function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0"
                >
                    <CldImage
                        src={slides[current].cloudinaryId || slides[current].image}
                        fallback={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className="object-cover brightness-[0.7]"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </motion.div>
            </AnimatePresence>

            <motion.div
                className="container mx-auto relative z-10 px-4 md:px-6 flex flex-col items-center text-center pt-20 pb-32 md:py-20 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                    if (info.offset.x > 100) prevSlide();
                    else if (info.offset.x < -100) nextSlide();
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="max-w-4xl space-y-6"
                    >
                        <div className="flex justify-center mb-2">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-sm font-bold uppercase tracking-widest">
                                {(() => {
                                    const Icon = slides[current].icon;
                                    return Icon ? <Icon className="w-4 h-4 text-primary" /> : null;
                                })()}
                                {current === 0 ? "10th Anniversary" : current === 1 ? "Making History" : "Elite Status"}
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-2xl leading-[1.1]">
                            {slides[current].title.split(" ").map((word, i) => (
                                <span key={i} className={i >= slides[current].title.split(" ").length - 2 ? slides[current].accent : ""}>
                                    {word}{" "}
                                </span>
                            ))}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-sm font-medium leading-relaxed">
                            {slides[current].description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 w-full sm:w-auto">
                            <Link href={slides[current].primaryCTA.url} className="w-full sm:w-auto">
                                <Button size="lg" className="w-full text-lg sm:text-xl px-10 py-6 sm:py-8 rounded-2xl shadow-2xl hover:shadow-primary/20 transition-all font-black group">
                                    {slides[current].primaryCTA.text} <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href={slides[current].secondaryCTA.url} className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full text-lg sm:text-xl px-10 py-6 sm:py-8 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-primary transition-all font-black">
                                    {slides[current].secondaryCTA.text}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            <div className="absolute bottom-4 md:bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 transition-all duration-300 rounded-full ${current === i ? "w-12 bg-primary shadow-[0_0_15px_rgba(255,107,0,0.5)]" : "w-2 bg-white/40 hover:bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
        </section>
    );
}
*/
