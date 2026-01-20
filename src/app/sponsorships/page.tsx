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

            {/* Packages */}
            <section className="py-20 container px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Sponsorship Packages</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`p-8 h-full relative ${pkg.popular ? 'border-primary border-2 shadow-lg' : ''}`}>
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                                        Most Popular
                                    </div>
                                )}
                                <div className={`w-16 h-16 rounded-full ${pkg.bg} flex items-center justify-center mb-4`}>
                                    <pkg.icon className={`w-8 h-8 ${pkg.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                                <p className="text-3xl font-black text-primary mb-6">{pkg.price}</p>
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                                        Get Started
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Sponsor */}
            <section className="py-20 bg-secondary/10">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Sponsor My Dog and I?</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-background p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3">🎯 Targeted Audience</h3>
                            <p className="text-muted-foreground">
                                Reach affluent pet owners who spend an average of ₦50,000/month on their beloved pets.
                            </p>
                        </div>
                        <div className="bg-background p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3">📱 Digital Amplification</h3>
                            <p className="text-muted-foreground">
                                Your brand featured across our social channels with 100k+ combined followers.
                            </p>
                        </div>
                        <div className="bg-background p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3">🏆 World Record Exposure</h3>
                            <p className="text-muted-foreground">
                                Be part of history with the Guinness World Record attempt in 2026.
                            </p>
                        </div>
                        <div className="bg-background p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-3">💚 Community Goodwill</h3>
                            <p className="text-muted-foreground">
                                Support animal welfare and build positive brand association.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold mb-4">Ready to Join the Pack?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Let's discuss a custom sponsorship package that aligns with your brand goals.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="px-10">
                            Contact Our Sponsorship Team
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
