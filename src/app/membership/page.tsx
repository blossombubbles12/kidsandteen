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
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-sm font-medium mb-4 text-orange-200">
                            The Inner Circle
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                            Elevate Your <span className="text-primary text-glow">Bond</span>
                        </h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                            Explore the exclusive benefits and perks of joining the Woof Pack. Become a registered member of Africa's largest gathering of Pets and enjoy exceptional features.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Unified Membership Section */}
            <section className="py-24 container px-4 -mt-16 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto bg-card rounded-[3rem] overflow-hidden border-2 border-primary shadow-2xl"
                >
                    <div className="grid md:grid-cols-5">
                        <div className="md:col-span-2 bg-primary p-10 text-white flex flex-col justify-center text-center md:text-left">
                            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-xl">
                                <Trophy className="w-10 h-10" />
                            </div>
                            <h3 className="text-4xl font-black mb-4">The Official Pack</h3>
                            <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                                One movement, one membership. Join our verified inner circle of pet lovers and enjoy every exclusive perk we offer.
                            </p>
                            <Link href="/join" className="block w-full">
                                <Button size="lg" variant="secondary" className="w-full py-8 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">
                                    Become a Member
                                </Button>
                            </Link>
                        </div>

                        <div className="md:col-span-3 p-10 bg-white">
                            <h4 className="text-2xl font-black mb-8 flex items-center gap-2">
                                <Star className="text-primary w-6 h-6 fill-primary" /> Member Benefits
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                                {[
                                    "Official Membership ID Card",
                                    "Lagos Dog Carnival Discounts",
                                    "Priority Event Registration",
                                    "Member-Only Meetups & Walks",
                                    "Exclusive 'Pro' Digital Badge",
                                    "Partner Brand Gift Vouchers",
                                    "VIP Lounge Access at Events",
                                    "Direct Pet Health Expert Line",
                                    "Community Voting Rights",
                                    "Early Access to Merch Drops",
                                    "Monthly Insider Newsletter",
                                    "Verified Community Status"
                                ].map((benefit) => (
                                    <div key={benefit} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        <span className="text-muted-foreground text-sm font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-6 bg-secondary/20 rounded-2xl border border-secondary/30">
                                <p className="text-sm text-secondary-foreground font-medium flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Lifetime verification on all My Dog & I platforms.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Why Join Section */}
            <section className="py-24 bg-secondary/10">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Why Become a Registered Member?</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Beyond the discounts, you're supporting a non-profit dedicated to pet welfare and advocacy in Nigeria.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {[
                            { icon: Shield, title: "Official Recognition", desc: "Get your official ID card and be recognized as a verified pet parent." },
                            { icon: Zap, title: "Priority Service", desc: "Skip the lines at the Carnival and get first dibs on all limited events." },
                            { icon: Heart, title: "Advocacy Support", desc: "Your fees go directly towards our Animal Cruelty Must Stop campaigns." },
                            { icon: Trophy, title: "Exclusive Access", desc: "Special workshops, private forum, and unique networking opportunities." }
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

            {/* FAQ Preview */}
            <section className="py-24">
                <div className="container px-4 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 italic">"Building the most engaged pet community in Nigeria starts with YOU."</h2>
                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                        <h3 className="text-xl font-bold mb-4 text-blue-900">Have questions about membership?</h3>
                        <p className="text-blue-800 mb-6">Our team is happy to help you choose the right pack for you and your beloved pets.</p>
                        <Link href="/contact">
                            <Button variant="outline" className="border-blue-300 text-blue-900 hover:bg-blue-100">Contact Support</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
