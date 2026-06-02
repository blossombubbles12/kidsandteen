"use client";

import { motion } from "framer-motion";
import { Check, Star, Crown, Shield, Zap, Heart, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "@/components/media/CldImage";

export default function MembershipPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 opacity-20">
                    <CldImage
                        src="homepage9_mhc0oh"
                        alt="Membership"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <div className="container px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-sm font-medium mb-4">
                            <Star className="inline w-4 h-4 mr-1 -mt-0.5" /> KTU Membership
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                            Choose Your <span className="text-primary">Path</span>
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
                        className="bg-card rounded-[3rem] overflow-hidden border-2 border-blue-300 shadow-xl"
                    >
                        <div className="bg-blue-600 p-8 text-white text-center">
                            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 shadow-xl">
                                <Star className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black mb-1">Young Innovator</h3>
                            <p className="text-blue-100 text-lg font-medium">Kids (6-12)</p>
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
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <span className="text-muted-foreground text-sm font-medium">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/membership/join?plan=kids" className="block w-full">
                                <Button size="lg" className="w-full py-6 text-base font-bold rounded-2xl shadow-lg hover:scale-105 transition-all bg-blue-600 hover:bg-blue-700">
                                    Join Kids Program
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Teens Membership */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-card rounded-[3rem] overflow-hidden border-2 border-purple-300 shadow-xl"
                    >
                        <div className="bg-purple-700 p-8 text-white text-center">
                            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-4 shadow-xl">
                                <Crown className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black mb-1">Future CEO</h3>
                            <p className="text-purple-100 text-lg font-medium">Teens (13-18)</p>
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
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-purple-600" />
                                        </div>
                                        <span className="text-muted-foreground text-sm font-medium">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/membership/join?plan=teens" className="block w-full">
                                <Button size="lg" className="w-full py-6 text-base font-bold rounded-2xl shadow-lg hover:scale-105 transition-all bg-purple-700 hover:bg-purple-800">
                                    Join Teens Program
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-24 bg-secondary/10">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Why Join KTU?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                                className="bg-white p-8 rounded-3xl border border-border/50 text-center hover:border-primary/30 transition-colors"
                            >
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold mb-2">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24">
                <div className="container px-4 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 italic">&ldquo;Every child is a genius. KTU gives them the tools to prove it.&rdquo;</h2>
                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                        <h3 className="text-xl font-bold mb-4 text-blue-900">Ready to get started?</h3>
                        <p className="text-blue-800 mb-6">Speak with our team to learn about scholarship opportunities and program details.</p>
                        <Link href="/contact">
                            <Button variant="outline" className="border-blue-300 text-blue-900 hover:bg-blue-100">Contact Us for Scholarship Info</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
