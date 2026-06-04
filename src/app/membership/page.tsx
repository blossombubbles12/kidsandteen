"use client";

import { motion } from "framer-motion";
import { Check, Star, Crown, Shield, Zap, Heart, Trophy, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFolderImages } from "@/app/actions/media";

export default function MembershipPage() {
    const [heroImages, setHeroImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getFolderImages("ktuafrica/sliders", 6).then((images) => {
            if (images.length > 0) setHeroImages(images.map((i: any) => i.secure_url));
        });
    }, []);

    useEffect(() => {
        if (heroImages.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div className="min-h-screen bg-[#faf8f5]">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden bg-[#1a1a1a] text-white">
                {heroImages.length > 0 && heroImages.map((url, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                        style={{
                            backgroundImage: `url('${url}')`,
                            opacity: i === currentIndex ? 1 : 0,
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e50a1e]/30 via-[#1a1a1a]/90 to-[#1a1a1a]" />
                <div className="container px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#e50a1e]/20 border border-[#e50a1e]/30 text-sm font-semibold mb-4 text-white">
                            <Sparkles className="w-4 h-4" /> KTU Membership
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                            Your Future Starts<br />With One <span className="text-[#e50a1e]">Choice</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Two tracks. One mission: turning young energy into entrepreneurial greatness. Pick the path that fits your child&apos;s age and ambition.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Intro Content */}
            <section className="py-24 md:py-32 container px-4 max-w-5xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e50a1e]/10 text-[#e50a1e] border border-[#e50a1e]/20 text-sm font-black mb-4">
                         TWO PATHS, ONE MISSION
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
                        Every Age Has Its<br /><span className="text-[#e50a1e]">Own Adventure</span>
                    </h2>
                    <p className="text-lg text-[#545454] font-semibold leading-relaxed mb-6">
                        We know that a 7-year-old and a 15-year-old learn differently. That&apos;s why we&apos;ve created two distinct tracks — each one built for how that age group thinks, plays, and grows.
                    </p>
                    <p className="text-base text-[#545454] leading-relaxed">
                        Both tracks share the same KTU foundation: real-world skills, expert mentorship, and a supportive community. The difference is in the depth, the complexity, and how far your child can take it. Whether they&apos;re launching their first lemonade stand or pitching to real investors, there&apos;s a place for them here.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-center mb-6">
                    {[
                        { icon: "", title: "Learning Through Play", desc: "Games, challenges, and hands-on projects that feel like fun but build real skills." },
                        { icon: "", title: "1-on-1 Mentorship", desc: "Every child gets a dedicated mentor who guides their journey and celebrates their wins." },
                        { icon: "", title: "Real-World Showcases", desc: "From Kidspreneur Fairs to Shark Tanks — every track ends with a real audience." },
                    ].map((item) => (
                        <div key={item.title} className="bg-white p-6 rounded-2xl border-2 border-[#e5e0db] hover:shadow-lg transition-all">
                            <div className="text-3xl mb-3">{item.icon}</div>
                            <h3 className="font-black text-[#1a1a1a] mb-2">{item.title}</h3>
                            <p className="text-sm text-[#545454] font-semibold">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Membership Options */}
            <section className="py-24 container px-4 -mt-16 relative z-20">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Kids Membership */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-[3rem] overflow-hidden border-2 border-[#e50a1e]/30 shadow-xl bg-[#faf8f5]"
                    >
                        <div className="bg-gradient-to-br from-[#e50a1e] to-[#cc0000] p-8 text-white text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black mb-1">Young Innovator</h3>
                            <p className="text-white/80 text-lg font-medium">Kids (6-12)</p>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Mini-Business Ventures",
                                    "Financial Literacy Games",
                                    "STEM Explorers",
                                    "Creative Expression",
                                    "Leadership & Character",
                                    "Recognition Badges",
                                    "Kidspreneur Fair Access"
                                ].map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e50a1e]/10 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-[#e50a1e]" />
                                        </div>
                                        <span className="text-[#545454] text-sm font-medium">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/membership/join?plan=kids" className="block w-full">
                                <Button size="lg" className="w-full py-6 text-base font-bold rounded-2xl shadow-lg hover:scale-105 transition-all bg-[#e50a1e] hover:bg-[#cc0000]">
                                    Join Kids Program
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Teens Membership */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-[3rem] overflow-hidden border-2 border-[#545454]/30 shadow-xl bg-[#faf8f5]"
                    >
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#000000] p-8 text-white text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                                <Crown className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black mb-1">Future CEO</h3>
                            <p className="text-white/80 text-lg font-medium">Teens (13-18)</p>
                        </div>
                        <div className="p-8">
                            <ul className="space-y-3 mb-8">
                                {[
                                    "Startup Incubation",
                                    "Investment Clubs",
                                    "Career Readiness",
                                    "Innovation Labs",
                                    "Global Leadership",
                                    "Internships",
                                    "KTU Shark Tank Access"
                                ].map((benefit) => (
                                    <li key={benefit} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#545454]/10 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-[#545454]" />
                                        </div>
                                        <span className="text-[#545454] text-sm font-medium">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/membership/join?plan=teens" className="block w-full">
                                <Button size="lg" className="w-full py-6 text-base font-bold rounded-2xl shadow-lg hover:scale-105 transition-all bg-gradient-to-r from-[#1a1a1a] to-[#000000] hover:from-[#000000] hover:to-[#000000]">
                                    Join Teens Program
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-24 bg-white">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <span className="badge-fun bg-[#e50a1e]/10 text-[#e50a1e] border border-[#e50a1e]/20 mb-6">
                             WHY KTU
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">More Than a Classroom</h2>
                        <p className="text-lg text-[#545454] max-w-2xl mx-auto">
                            We don&apos;t just teach — we transform. Every child walks away with real skills, real confidence, and a real plan for the future.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: Shield, title: "Real Experience", desc: "They don't just learn — they launch businesses, manage portfolios, and lead real initiatives." },
                            { icon: Zap, title: "Expert Mentorship", desc: "Successful entrepreneurs and industry leaders guide them every step of the way." },
                            { icon: Heart, title: "Community That Builds", desc: "Surrounded by ambitious young leaders who push each other to grow across Africa." },
                            { icon: Trophy, title: "Global Recognition", desc: "They graduate with portfolios, ventures, and credentials that open doors worldwide." }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#faf8f5] p-8 rounded-3xl border border-[#e50a1e]/10 text-center hover:border-[#e50a1e]/30 transition-all hover:shadow-md"
                            >
                                <div className="w-14 h-14 bg-[#e50a1e]/10 text-[#e50a1e] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h4 className="font-bold text-[#1a1a1a] mb-2">{item.title}</h4>
                                <p className="text-sm text-[#545454]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="py-24 bg-[#faf8f5]">
                <div className="container px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge-fun bg-[#1a1a1a]/10 text-[#1a1a1a] border border-[#1a1a1a]/20 mb-6">
                             SIDE BY SIDE
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">Which Track Fits Best?</h2>
                        <p className="text-lg text-[#545454] max-w-2xl mx-auto">
                            Both tracks build entrepreneurs — the difference is depth, complexity, and how far they can take it.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-8 rounded-3xl border-2 border-[#e50a1e]/20 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-[#e50a1e]/10 flex items-center justify-center mb-4">
                                <Star className="w-6 h-6 text-[#e50a1e]" />
                            </div>
                            <h3 className="text-xl font-black text-[#1a1a1a] mb-2">Young Innovator <span className="text-sm font-semibold text-[#545454]">(6&ndash;12)</span></h3>
                            <p className="text-[#545454] font-semibold text-sm mb-4">Building the foundation</p>
                            <ul className="space-y-2">
                                {["Fun, game-based learning", "First business experience", "Creativity & confidence boost", "Kidspreneur Fair showcase"].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-[#545454]">
                                        <Check className="w-4 h-4 text-[#e50a1e] flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border-2 border-[#545454]/20 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-[#1a1a1a]/10 flex items-center justify-center mb-4">
                                <Crown className="w-6 h-6 text-[#1a1a1a]" />
                            </div>
                            <h3 className="text-xl font-black text-[#1a1a1a] mb-2">Future CEO <span className="text-sm font-semibold text-[#545454]">(13&ndash;18)</span></h3>
                            <p className="text-[#545454] font-semibold text-sm mb-4">Accelerating the journey</p>
                            <ul className="space-y-2">
                                {["Real business incubation", "Investment portfolio management", "Internship & career readiness", "KTU Shark Tank competition"].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-[#545454]">
                                        <Check className="w-4 h-4 text-[#1a1a1a] flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-sm text-[#545454] font-semibold">
                            Not sure? No problem. <Link href="/contact" className="text-[#e50a1e] underline underline-offset-2 hover:no-underline">Talk to our team</Link> and we&apos;ll help you decide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 bg-[#faf8f5] relative overflow-hidden">
                <div className="blob-bg w-[500px] h-[500px] bg-[#e50a1e]/5 -top-40 -right-40 absolute pointer-events-none" />
                <div className="blob-bg w-[400px] h-[400px] bg-[#545454]/5 -bottom-40 -left-40 absolute pointer-events-none" />
                <div className="container px-4 text-center max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-8 italic leading-tight">&ldquo;Every child is a genius. KTU gives them the tools to prove it.&rdquo;</h2>
                    <div className="p-8 md:p-10 rounded-[2.5rem] border-2 border-[#e50a1e]/20" style={{ background: "linear-gradient(135deg, rgba(229,10,30,0.05) 0%, rgba(84,84,84,0.05) 100%)" }}>
                        <p className="text-lg text-[#545454] font-semibold mb-2">We believe no child should miss out due to financial constraints.</p>
                        <h3 className="text-2xl font-black text-[#1a1a1a] mb-2">Scholarships Available</h3>
                        <p className="text-[#545454] mb-8 max-w-xl mx-auto">Speak with our team to learn about partial and full scholarship opportunities, sibling discounts, and payment plans.</p>
                        <Link href="/contact">
                            <Button variant="outline" className="border-[#e50a1e]/30 text-[#e50a1e] hover:bg-[#e50a1e] hover:text-white px-10 py-6 text-base font-bold rounded-2xl transition-all hover:scale-105">
                                Inquire About Scholarships
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
