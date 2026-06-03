"use client";

import { motion } from "framer-motion";
import { Check, Star, Crown, Shield, Zap, Heart, Trophy, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MembershipPage() {
    return (
        <div className="min-h-screen bg-[#faf8f5]">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden bg-[#1a1a1a] text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e50a1e]/30 via-[#1a1a1a]/90 to-[#1a1a1a]" />
                <div className="container px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#e50a1e]/20 border border-[#e50a1e]/30 text-sm font-semibold mb-4 text-white">
                            <Sparkles className="w-4 h-4" /> KTU Membership
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                            Choose Your <span className="text-[#e50a1e]">Path</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                            Two membership tracks designed for different stages of your entrepreneurial journey.
                        </p>
                    </motion.div>
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
                            ✨ WHY KTU
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">Why Join KTU?</h2>
                        <p className="text-lg text-[#545454] max-w-2xl mx-auto">
                            Beyond the classroom, we build real-world leaders and changemakers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: Shield, title: "Real Experience", desc: "Launch actual businesses and manage real investment portfolios." },
                            { icon: Zap, title: "Expert Mentorship", desc: "Learn from successful entrepreneurs and industry leaders." },
                            { icon: Heart, title: "Community", desc: "Join a network of ambitious young leaders across Africa." },
                            { icon: Trophy, title: "Global Recognition", desc: "Graduate with portfolios and ventures that open doors worldwide." }
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

            {/* Bottom CTA */}
            <section className="py-24 bg-[#faf8f5]">
                <div className="container px-4 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-8 italic">&ldquo;Every child is a genius. KTU gives them the tools to prove it.&rdquo;</h2>
                    <div className="p-8 md:p-10 rounded-[2.5rem] border-2 border-[#e50a1e]/20" style={{ background: "linear-gradient(135deg, rgba(229,10,30,0.05) 0%, rgba(84,84,84,0.05) 100%)" }}>
                        <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">Ready to get started?</h3>
                        <p className="text-[#545454] mb-8 max-w-xl mx-auto">Speak with our team to learn about scholarship opportunities and program details.</p>
                        <Link href="/contact">
                            <Button variant="outline" className="border-[#e50a1e]/30 text-[#e50a1e] hover:bg-[#e50a1e] hover:text-white px-8 py-6 text-base font-bold rounded-2xl transition-all">
                                Contact Us for Scholarship Info
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
