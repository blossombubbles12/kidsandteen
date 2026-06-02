"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Rocket, Lightbulb, Users, Trophy, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sponsors } from "@/components/Sponsors";
import { AboutGallerySlider } from "@/components/AboutGallerySlider";

const values = [
    {
        emoji: "🚀",
        title: "Kidpreneurship First",
        description: "We don't do boring business plans. Students design, build, and pitch real products on actual marketplaces!",
        color: "from-[#d9441e]/15 to-[#ffb347]/15",
        border: "border-[#d9441e]/30 shadow-orange-100",
        textColor: "text-[#d9441e]"
    },
    {
        emoji: "🧠",
        title: "Future-Proof Skills",
        description: "Master financial IQ, stock simulations, creative coding, and design thinking—the superpowers standard schools miss.",
        color: "from-[#3b82f6]/15 to-[#06b6d4]/15",
        border: "border-[#3b82f6]/30 shadow-blue-100",
        textColor: "text-[#3b82f6]"
    },
    {
        emoji: "🤝",
        title: "Compassionate Leadership",
        description: "We raise leaders who build community. KTU students practice active philanthropy through food banks & clean energy projects.",
        color: "from-[#22c55e]/15 to-[#86efac]/15",
        border: "border-[#22c55e]/30 shadow-green-100",
        textColor: "text-[#22c55e]"
    },
    {
        emoji: "✨",
        title: "Limitless Curiosity",
        description: "We run on trial, error, and imagination. KTU is a judgment-free lab where failure is just a level-up in progress.",
        color: "from-[#a855f7]/15 to-[#ec4899]/15",
        border: "border-[#a855f7]/30 shadow-purple-100",
        textColor: "text-[#a855f7]"
    }
];

const stats = [
    { num: "500+", label: "Youth Leaders", bg: "bg-[#ffd93d]/20 text-[#855e0f]" },
    { num: "50+", label: "Startups Launched", bg: "bg-[#d9441e]/10 text-[#d9441e]" },
    { num: "12+", label: "Clubs & Societies", bg: "bg-[#3b82f6]/10 text-[#3b82f6]" },
    { num: "3+", label: "Real Funding Wins", bg: "bg-[#22c55e]/10 text-[#166534]" }
];

interface AboutPageContentProps {
    uploadImages: any[];
}

export default function AboutPageContent({ uploadImages }: AboutPageContentProps) {
    const hasUploads = uploadImages.length > 0;

    return (
        <div className="min-h-screen bg-[#fdf8f3] overflow-x-hidden pt-12">

            {/* Playful Floating Shapes Hero */}
            <section className="relative py-24 md:py-32 overflow-hidden flex items-center justify-center">
                {/* Floating Emojis */}
                {["🚀", "💡", "🎨", "🌟", "🔥", "🎓"].map((emoji, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 8, -8, 0],
                        }}
                        transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute text-4xl pointer-events-none select-none opacity-20 hidden md:block"
                        style={{
                            top: `${15 + (index * 14)}%`,
                            left: index % 2 === 0 ? `${8 + (index * 4)}%` : undefined,
                            right: index % 2 !== 0 ? `${8 + (index * 4)}%` : undefined,
                        }}
                    >
                        {emoji}
                    </motion.div>
                ))}

                {/* Decorative blob bg */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#ffd93d]/15 to-[#d9441e]/10 rounded-full blur-3xl pointer-events-none z-0" />

                <div className="container mx-auto px-5 relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="badge-fun bg-[#d9441e]/10 text-[#d9441e] border border-[#d9441e]/20 mb-6">
                            ⚡ OUR STORY
                        </span>

                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 text-[#2d1a0e] leading-[1.1] tracking-tight">
                            Building Africa's<br />
                            <span className="squiggle gradient-text">Next Gen of CEOs</span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-[#7c3a10] font-semibold max-w-2xl mx-auto leading-relaxed mb-8">
                            Kids and Teens University (KTU) isn't a conventional school. It's an imaginative, high-energy sandbox where kids (6–12) and teens (13–18) build active startups, simulate investment portfolios, and learn to change the world with kindness.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/membership">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#d9441e] to-[#ffb347] font-black text-sm uppercase tracking-wide text-white shadow-lg shadow-[#d9441e]/30"
                                >
                                    Join the Playground 🌟
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision: "The Big Sandbox Goals" */}
            <section className="py-20 relative bg-white border-y border-[#f0dece]">
                <div className="container mx-auto px-5">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative p-8 md:p-10 rounded-[2.5rem] border-2 border-[#ffd93d]/50 shadow-sm overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                        >
                            {/* Background image with overlay */}
                            {hasUploads && (
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={uploadImages[0].secure_url}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffd93d]/85 to-[#ffb347]/80" />
                                </div>
                            )}
                            <div className={`absolute top-4 right-4 text-5xl opacity-10 select-none ${!hasUploads ? '' : 'text-white/20'}`}>🎯</div>
                            <div className={`relative z-10 ${hasUploads ? 'text-white' : ''}`}>
                                <div className="w-14 h-14 bg-gradient-to-br from-[#ffd93d] to-[#ffb347] text-[#2d1a0e] rounded-2xl flex items-center justify-center mb-6 shadow shadow-orange-200">
                                    <Rocket className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Our Big Mission</h3>
                                <p className={`text-sm md:text-base font-semibold leading-relaxed ${hasUploads ? 'text-white/90' : 'text-[#7c3a10]'}`}>
                                    To spark a generation of bold, financially smart, and creative innovators who don't wait until they grow up to launch ideas, manage investments, and drive meaningful local value.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative p-8 md:p-10 rounded-[2.5rem] border-2 border-[#3b82f6]/30 shadow-sm overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                        >
                            {/* Background image with overlay */}
                            {hasUploads && uploadImages.length > 1 && (
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={uploadImages[1].secure_url}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/85 to-[#06b6d4]/80" />
                                </div>
                            )}
                            <div className={`absolute top-4 right-4 text-5xl opacity-10 select-none ${!hasUploads ? '' : 'text-white/20'}`}>🔮</div>
                            <div className={`relative z-10 ${hasUploads ? 'text-white' : ''}`}>
                                <div className="w-14 h-14 bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] text-white rounded-2xl flex items-center justify-center mb-6 shadow shadow-blue-200">
                                    <Lightbulb className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Our Big Dream</h3>
                                <p className={`text-sm md:text-base font-semibold leading-relaxed ${hasUploads ? 'text-white/90' : 'text-[#7c3a10]'}`}>
                                    To establish Africa's premier modern educational sandbox, raising thousands of confident children and teens who are certified and ready to disrupt global markets.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Playground Stats and Impact */}
            <section className="py-20 bg-[#fdf8f3]">
                <div className="container mx-auto px-5 text-center max-w-4xl">
                    <span className="badge-fun bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 mb-6">
                        🎈 KTU IMPACT
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-[#2d1a0e] mb-12">
                        Playground Highlights 🏆
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white p-6 rounded-[2rem] border-2 border-[#f0dece] hover:shadow-md transition-all duration-300 flex flex-col justify-center items-center"
                            >
                                <span className={`text-3xl md:text-4xl font-black mb-1.5 px-3 py-0.5 rounded-xl ${stat.bg}`}>
                                    {stat.num}
                                </span>
                                <span className="text-xs text-[#9a6a4a] font-black uppercase tracking-wider text-center">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Slider Gallery */}
            <AboutGallerySlider images={uploadImages} />

            {/* Core Values: "The KTU Code of Awesome" */}
            <section className="py-24 bg-white border-t border-[#f0dece] relative overflow-hidden">
                <div className="blob-bg w-80 h-80 bg-[#a855f7]/5 -bottom-20 -left-20 absolute pointer-events-none" />

                <div className="container mx-auto px-5 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="badge-fun bg-[#a855f7]/12 text-[#7c3aed] border border-[#a855f7]/20 mb-5">
                            ✊ VALUES
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#2d1a0e]">
                            The KTU Code of Awesome ⚡
                        </h2>
                        <p className="text-base text-[#7c3a10] font-semibold mt-4">
                            These core parameters define every session, game, pitch, and young leader we nurture!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {values.map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className={`bg-gradient-to-br ${val.color} border-2 ${val.border} p-8 rounded-[2rem] text-center hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div className="text-4xl mb-4 animate-bounce-gentle inline-block">{val.emoji}</div>
                                <h3 className={`text-xl font-black mb-3 ${val.textColor}`}>{val.title}</h3>
                                <p className="text-sm text-[#7c3a10] font-semibold leading-relaxed">{val.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Playful Creative Success Story */}
            <section className="py-24 bg-[#fdf8f3] border-t border-[#f0dece]">
                <div className="container mx-auto px-5 max-w-4xl">
                    <div className="relative border-2 border-[#d9441e]/30 rounded-[2.5rem] p-8 md:p-12 shadow-xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#d9441e]/5 rounded-bl-[100px]" />

                        {/* Background image with overlay */}
                        {hasUploads && uploadImages.length > 2 && (
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={uploadImages[2].secure_url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70" />
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#ffd93d]/20 border-2 border-[#ffd93d] text-4xl sm:text-5xl flex items-center justify-center rounded-full shadow-inner animate-float shrink-0">
                                👑
                            </div>
                            <div>
                                <span className="badge-fun bg-[#d9441e]/10 text-[#d9441e] text-[10px] tracking-widest mb-3">
                                    💡 STUDENT SUCCESS HIGHLIGHT
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black text-[#2d1a0e] mb-4">
                                    From Lemonade to Real Trade!
                                </h3>
                                <p className="text-sm sm:text-base text-[#7c3a10] font-semibold leading-relaxed mb-4">
                                    "KTU taught me how to keep track of real profit, how to talk confidently to crowds, and how to pitch my art prints online! I ended up launching my startup during the Kidspreneur Fair and raised real capital."
                                </p>
                                <span className="text-xs text-[#9a6a4a] font-bold">— Gabriella A., Age 11, KTU Kidpreneur Club Member</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Playground Final CTA Card */}
            <section className="py-24 bg-[#fdf8f3]">
                <div className="container mx-auto px-5 max-w-4xl">
                    <div className="relative rounded-[3rem] p-8 sm:p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2d1a0e] via-[#451f0a] to-[#1a0f07] z-0" />

                        {/* Background image with overlay */}
                        {hasUploads && uploadImages.length > 3 && (
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={uploadImages[3].secure_url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#2d1a0e]/90 via-[#451f0a]/85 to-[#1a0f07]/90" />
                            </div>
                        )}

                        <div className="absolute inset-0 confetti-bg opacity-15 pointer-events-none z-0" />

                        <div className="relative z-10">
                            <div className="text-5xl mb-6">🚀</div>
                            <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
                                Ready to Unleash Your<br />
                                <span className="text-[#ffd93d]">Creative Genius?</span>
                            </h2>
                            <p className="text-sm sm:text-base text-white/80 font-semibold max-w-xl mx-auto leading-relaxed mb-10">
                                Join the active hub where children and teenagers master business intelligence, financial freedom, and global innovation.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/membership" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ffd93d] to-[#ffb347] font-black text-sm uppercase tracking-wide text-[#2d1a0e]"
                                    >
                                        Enroll Today
                                    </motion.button>
                                </Link>
                                <Link href="/contact" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-8 py-4 rounded-2xl border-2 border-white/30 bg-white/10 text-white font-black text-sm uppercase tracking-wide"
                                    >
                                        Talk to Us
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Sponsors />
        </div>
    );
}
