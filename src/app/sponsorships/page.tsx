"use client";

import { motion } from "framer-motion";
import { Check, Star, Trophy, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CldImage } from "@/components/media/CldImage";

const packages = [
    {
        name: "Bronze Paw",
        price: "₦500,000",
        icon: Star,
        color: "text-orange-700",
        bg: "bg-orange-50",
        features: [
            "Logo on event materials",
            "Social media mentions (2x)",
            "Booth space at carnival",
            "50 event tickets"
        ]
    },
    {
        name: "Silver Collar",
        price: "₦1,500,000",
        icon: Trophy,
        color: "text-gray-600",
        bg: "bg-gray-50",
        popular: true,
        features: [
            "Everything in Bronze",
            "Logo on main stage banner",
            "Social media campaign (5x)",
            "Speaking opportunity",
            "150 event tickets",
            "VIP lounge access"
        ]
    },
    {
        name: "Gold Leash",
        price: "₦3,000,000+",
        icon: Megaphone,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        features: [
            "Everything in Silver",
            "Title sponsor recognition",
            "Dedicated social media series",
            "Branded competition category",
            "300 event tickets",
            "Exclusive brand activation zone"
        ]
    }
];

export default function SponsorshipsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="homepage7_dl6l1z"
                        alt="Partner with Us"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="container px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Partner with the Pack
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Join Africa's largest gathering of Pets and connect with 50,000+ passionate pet owners.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 text-left">
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-3xl font-bold text-primary">2,500+</p>
                                <p className="text-sm text-muted-foreground">Event Attendees</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-3xl font-bold text-primary">50k+</p>
                                <p className="text-sm text-muted-foreground">Online Community</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-3xl font-bold text-primary">100k+</p>
                                <p className="text-sm text-muted-foreground">Social Reach</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Brand Activation Section */}
            <section className="py-24 container px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            Beyond Just a <span className="text-primary">Logo</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            We don't just put your brand on a banner. We create immersive experiences that allow our community to touch, feel, and fall in love with your brand.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Star className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Experiential Marketing</h3>
                                    <p className="text-muted-foreground">Product launches, live demonstrations, and direct consumer engagement during Africa's largest pet gathering.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                                    <Trophy className="text-orange-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Brand Legacy</h3>
                                    <p className="text-muted-foreground">Attach your brand to the historic 2026 Guinness World Record attempt. A memory that will last forever in the minds of thousands.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center shrink-0">
                                    <Megaphone className="text-yellow-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl mb-1">Multi-Channel Dominance</h3>
                                    <p className="text-muted-foreground">Seamless integration across our Instagram, TikTok, WhatsApp, and physical event spaces for 360-degree visibility.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                        <CldImage
                            src="lagos_dog_carnival_20242_ekato6"
                            alt="Brand Activation"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <p className="text-2xl font-black italic">"The most engaged audience we've ever seen in Lagos."</p>
                            <p className="text-white/80 mt-2">— Past Corporate Partner</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Sponsor */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="container px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Why Partner With Us?</h2>
                        <p className="text-xl text-muted-foreground">
                            Nigeria's pet industry is booming. My Dog and I Group is the gateway to this highly lucrative and passionate market.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Targeted Reach</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Directly access over 50,000 verified pet owners. Our audience consists of high-intent consumers in the lifestyle and pet care sectors.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">GWR Exposure</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                The 2026 Guinness World Record attempt will attract global media coverage. Be a part of Africa's biggest historical pet moment.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">CSR Impact</h3>
                            <p className="text-xl font-medium text-purple-900 mb-2">2,000+ Pets Rehomed</p>
                            <p className="text-muted-foreground leading-relaxed">
                                Align your brand with our social advocacy and activism efforts that have impacted thousands of lives across the continent.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Custom Solutions Section */}
            <section className="py-24 container px-4">
                <div className="max-w-4xl mx-auto text-center border-2 border-dashed border-primary/20 rounded-[3rem] p-12 md:p-20 bg-primary/5">
                    <h2 className="text-4xl md:text-6xl font-black mb-8">Tailored Opportunities</h2>
                    <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
                        We don't believe in one-size-fits-all. Every brand has a unique story, and we're here to help you tell it. Let's create a custom activation plan that meets your exact KPI's.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="h-auto py-6 px-12 text-2xl font-black rounded-full shadow-2xl hover:scale-105 transition-all">
                            Request Partner Deck
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
