"use client";

import { motion } from "framer-motion";
import { WorldRecord } from "@/components/WorldRecord";
import { CarnivalTimeline } from "@/components/CarnivalTimeline";
import { CarnivalStats } from "@/components/CarnivalStats";
import { Competitions } from "@/components/Competitions";
import { SafetyInfo } from "@/components/SafetyInfo";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { AnniversaryBanner } from "@/components/AnniversaryBanner";
import { CldImage } from "@/components/media/CldImage";

export default function CarnivalPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Carnival Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="lagos_dog_carnival_20242_ekato6"
                        alt="Lagos Dog Carnival Crowd"
                        fill
                        className="object-cover brightness-[0.7]"
                        priority
                    />
                </div>

                <div className="container relative z-10 px-4 text-center text-white">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-sm">
                            LAGOS DOG CARNIVAL
                        </h1>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl md:text-2xl font-semibold mb-10">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-yellow-400" />
                                <span>October 1st, 2026</span>
                            </div>
                            <div className="hidden md:block w-2 h-2 bg-white rounded-full" />
                            <div className="flex items-center gap-2">
                                <MapPin className="text-yellow-400" />
                                <span>Eko Atlantic City, Lagos</span>
                            </div>
                        </div>

                        <Link href="/carnival/register">
                            <Button size="lg" className="text-xl px-10 py-6 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 border-none shadow-xl cursor-pointer">
                                Register for Africa's Largest Pet Gathering
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <AnniversaryBanner />

            {/* World Record Component */}
            <WorldRecord />

            {/* Stats */}
            <CarnivalStats />

            {/* Competitions */}
            <Competitions />

            {/* Timeline Component */}
            <CarnivalTimeline />

            {/* Organizers Section */}
            <section className="py-24 bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden">
                <div className="container px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                            <Users className="w-4 h-4" /> The Visionaries
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">The Minds Behind the Magic</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The team dedicated to making the Lagos Dog Carnival the most unforgettable experience for you and your pets.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {/* Jacklyn */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-xl border border-primary/10 hover:shadow-2xl transition-all group"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all" />
                                <div className="relative w-full h-full bg-primary text-white rounded-full flex items-center justify-center text-4xl font-black z-10">
                                    JI
                                </div>
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black p-2 rounded-full shadow-lg z-20">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-black mb-2">Jacklyn Idimogu</h3>
                                <p className="text-primary font-bold mb-4 uppercase tracking-wider text-sm">Chief Convener / Creator</p>
                                <p className="text-muted-foreground leading-relaxed">
                                    The architectural mind behind the Carnival. She breathes life into every detail, from the grand parade to the historical record attempts, ensuring the Lagos Dog Carnival stays the gold standard of pet events in Africa.
                                </p>
                            </div>
                        </motion.div>

                        {/* Gabby */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-xl border border-orange-200 hover:shadow-2xl transition-all group"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="absolute inset-0 bg-orange-200 rounded-full blur-2xl group-hover:bg-orange-300 transition-all" />
                                <div className="relative w-full h-full bg-orange-500 text-white rounded-full flex items-center justify-center text-4xl font-black z-10">
                                    GI
                                </div>
                                <div className="absolute -top-2 -right-2 bg-orange-400 text-white p-2 rounded-full shadow-lg z-20">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-black mb-2">Gabby Idimogu</h3>
                                <p className="text-orange-600 font-bold mb-4 uppercase tracking-wider text-sm">Convener</p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our resident "Animal Whisperer" and master of fun. Gabby is responsible for the chaos, the play, and the magic. If you see a dog wearing a tuxedo or a cat judging a competition, that's likely her doing. She ensures 100% tail-wagging satisfaction!
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Safety Info */}
            <SafetyInfo />

            {/* CTA Footer */}
            <section className="py-20 bg-background text-center">
                <div className="container px-4">
                    <h2 className="text-3xl font-bold mb-6">Want to be a Vendor or Sponsor?</h2>
                    <Button variant="outline" size="lg">Contact Organizers</Button>
                </div>
            </section>
        </div>
    );
}
