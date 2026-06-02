"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

interface SlideData {
    id: number;
    badge: string;
    heading: string;
    highlight: string;
    sub: string;
    cta: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    accent: string;
    accentLight: string;
    img: string;
    tag: string;
}

const defaultSlides: SlideData[] = [
    {
        id: 1,
        badge: "🎓 Africa's #1 Youth Program",
        heading: "Raising Africa's Next",
        highlight: "Generation of CEOs",
        sub: "Empowering kids & teens ages 6–18 with entrepreneurship, financial literacy, and leadership.",
        cta: { label: "Join KTU", href: "/membership" },
        ctaSecondary: { label: "Learn More", href: "/about" },
        accent: "#d9441e",
        accentLight: "#ffb347",
        img: "/hero.png",
        tag: "🚀 500+ Active Members",
    },
    {
        id: 2,
        badge: "💡 Signature Events",
        heading: "Pitch, Compete &",
        highlight: "Lead on Real Stages",
        sub: "From KTU Shark Tank to the Global Teens Forum — real-world experience that top schools can't teach.",
        cta: { label: "See Events", href: "/membership" },
        ctaSecondary: { label: "View Media", href: "/media" },
        accent: "#3b82f6",
        accentLight: "#06b6d4",
        img: "/hero.png",
        tag: "🏆 12+ Clubs & Societies",
    },
    {
        id: 3,
        badge: "🌍 Community & Impact",
        heading: "Building Futures,",
        highlight: "One Child at a Time",
        sub: "Through food banks, community drives, and mentorship — KTU students learn to give back as they grow.",
        cta: { label: "Get Involved", href: "/membership" },
        ctaSecondary: { label: "Contact Us", href: "/contact" },
        accent: "#22c55e",
        accentLight: "#86efac",
        img: "/foodbank-banner.png",
        tag: "❤️ 50+ Startups Launched",
    },
];

interface HeroSliderProps {
    cloudinarySlides?: { url: string }[];
}

const AUTOPLAY_DELAY = 5500;

export function HeroSlider({ cloudinarySlides }: HeroSliderProps) {
    const slides: SlideData[] = defaultSlides.map((s, i) => ({
        ...s,
        img: cloudinarySlides?.[i % cloudinarySlides.length]?.url || s.img,
    }));

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, AUTOPLAY_DELAY);
        return () => clearInterval(t);
    }, [paused, next]);

    const slide = slides[current];

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: "min(75vh, 550px)" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Background image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${current}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    {slide.img.startsWith("http") ? (
                        <Image
                            src={slide.img}
                            alt={slide.heading}
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="100vw"
                        />
                    ) : (
                        <Image
                            src={slide.img}
                            alt={slide.heading}
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="100vw"
                        />
                    )}
                    {/* dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-5 md:px-16 lg:px-24">
                <div className="max-w-xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`content-${current}`}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            {/* Badge */}
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest mb-4 border"
                                style={{
                                    background: `${slide.accent}28`,
                                    borderColor: `${slide.accent}50`,
                                    color: slide.accentLight,
                                }}
                            >
                                {slide.badge}
                            </span>

                            {/* Heading */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow mb-1">
                                {slide.heading}
                            </h1>
                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
                                style={{
                                    background: `linear-gradient(90deg, ${slide.accent}, ${slide.accentLight})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {slide.highlight}
                            </h2>

                            {/* Sub */}
                            <p className="text-sm md:text-base text-white/75 font-semibold mb-6 leading-relaxed">
                                {slide.sub}
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap gap-3 mb-5">
                                <Link href={slide.cta.href}>
                                    <motion.button
                                        whileHover={{ scale: 1.04, y: -1 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide text-white shadow-lg transition-all"
                                        style={{
                                            background: `linear-gradient(135deg, ${slide.accent}, ${slide.accentLight})`,
                                            boxShadow: `0 6px 24px ${slide.accent}50`,
                                        }}
                                    >
                                        <Sparkles className="w-3.5 h-3.5" />
                                        {slide.cta.label}
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                </Link>
                                <Link href={slide.ctaSecondary.href}>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide text-white border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition-all"
                                    >
                                        {slide.ctaSecondary.label}
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Tag pill */}
                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs font-bold">
                                {slide.tag}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Arrow buttons */}
            <button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/30 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all"
            >
                <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setCurrent(i)}
                        aria-label={`Slide ${i + 1}`}
                        className="relative h-1.5 rounded-full transition-all duration-300 overflow-hidden"
                        style={{
                            width: i === current ? 28 : 6,
                            background: i === current ? slide.accent : "rgba(255,255,255,0.35)",
                        }}
                    >
                        {i === current && !paused && (
                            <motion.span
                                key={`prog-${current}`}
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{ background: slide.accentLight }}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Slide counter */}
            <div className="absolute bottom-8 right-5 z-20 text-white/40 text-[10px] font-black tracking-widest">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
        </section>
    );
}
