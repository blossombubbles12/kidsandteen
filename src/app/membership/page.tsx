"use client";

import { motion } from "framer-motion";
import { Check, Star, Crown, Shield, Zap, Heart, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "@/components/media/CldImage";

const plans = [
    {
        name: "Basic Pack",
        price: "Free",
        description: "Join the movement and stay informed about our events and community walks.",
        icon: Heart,
        color: "bg-blue-500",
        benefits: [
            "Access to public community walks",
            "Monthly newsletter access",
            "Join our public social platforms",
            "Basic event notifications",
            "Community forum access"
        ],
        cta: "Join Now",
        link: "/join",
        popular: false
    },
    {
        name: "Pro Parent",
        price: "₦15,000",
        period: "/per year",
        description: "The official membership for dedicated pet owners. Get verified and enjoy exclusive perks.",
        icon: Star,
        color: "bg-primary",
        benefits: [
            "Official Membership ID Card",
            "15% Discount on Carnival Tickets",
            "Priority access to Training Workshops",
            "Exclusive 'Pro' community badge",
            "Access to Member-only meetups",
            "Partner brand discounts"
        ],
        cta: "Get Started",
        link: "/join",
        popular: true
    },
    {
        name: "Elite Pack",
        price: "₦50,000",
        period: "/per year",
        description: "The ultimate tier for our most passionate members. VIP access to everything we do.",
        icon: Crown,
        color: "bg-yellow-500",
        benefits: [
            "Everything in Pro Parent",
            "Free Lagos Dog Carnival Ticket",
            "VIP Lounge access at any event",
            "Complimentary 10th Anniversary Merch",
            "Featured Spotlight for your pet",
            "Voting rights on community initiatives",
            "Direct line to pet health experts"
        ],
        cta: "Go Elite",
        link: "/join",
        popular: false
    }
];

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
                            Choose a plan that fits your lifestyle. Become a registered member of Africa's largest gathering of Pets and enjoy exclusive benefits.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Plans Grid */}
            <section className="py-24 container px-4 -mt-16 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex flex-col bg-card rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl ${plan.popular ? "border-primary shadow-xl scale-105" : "border-border/50"
                                }`}
                        >
                            {plan.popular && (
                                <div className="bg-primary text-white text-center py-2 text-sm font-black uppercase tracking-widest">
                                    Most Popular Choice
                                </div>
                            )}

                            <div className="p-8 pb-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.color} text-white shadow-lg`}>
                                    <plan.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-black">{plan.price}</span>
                                    {plan.period && <span className="text-muted-foreground font-medium">{plan.period}</span>}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="p-8 pt-4 flex-grow">
                                <ul className="space-y-4 mb-10">
                                    {plan.benefits.map((benefit) => (
                                        <li key={benefit} className="flex items-start gap-3 text-sm">
                                            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-muted-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href={plan.link} className="mt-auto">
                                    <Button
                                        className={`w-full py-6 text-lg font-bold rounded-2xl shadow-lg transition-transform hover:scale-[1.02] ${plan.popular ? "bg-primary hover:bg-orange-600" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                            }`}
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
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
