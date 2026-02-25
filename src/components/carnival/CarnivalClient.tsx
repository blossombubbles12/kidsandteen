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
import { Calendar, MapPin, Users, Sparkles, ArrowRight } from "lucide-react";
import { AnniversaryBanner } from "@/components/AnniversaryBanner";
import { CldImage } from "@/components/media/CldImage";
import { MediaAsset } from "@/components/media/GalleryGrid";
import { GalleryPreview } from "@/components/media/GalleryPreview";
import { Sponsors } from "@/components/Sponsors";

interface CarnivalClientProps {
    galleryMedia: MediaAsset[];
}

export function CarnivalClient({ galleryMedia }: CarnivalClientProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Carnival Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/lagosdogcarnival.png"
                        alt="Lagos Dog Carnival Hero"
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
                                <span>December 13th, 2026</span>
                            </div>
                            <div className="hidden md:block w-2 h-2 bg-white rounded-full" />
                            <div className="flex items-center gap-2">
                                <MapPin className="text-yellow-400" />
                                <span>Tafawa Balewa Square, Lagos</span>
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

            {/* Stats */}
            <CarnivalStats />

            {/* What to Expect Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">What to Expect</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Get ready for a day filled with excitement, entertainment, and pure pet joy.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: "🎨", title: "Dog Fashion Show", desc: "Watch the most stylish pets on the runway" },
                            { icon: "🏎️", title: "Dog Races", desc: "High-speed thrills for our fastest friends" },
                            { icon: "🍦", title: "Pet Treats", desc: "Gourmet snacks for dogs and humans" },
                            { icon: "🎁", title: "Goody Bags", desc: "Exclusive gifts for all registered pets" },
                            { icon: "👨‍⚕️", title: "Vet Checks", desc: "On-site professionals for health tips" },
                            { icon: "🎶", title: "Live Music", desc: "Great vibes to keep the energy high" },
                            { icon: "📸", title: "Photo Ops", desc: "Capture memories in our creative booths" },
                            { icon: "🤝", title: "Networking", desc: "Connect with thousands of pet owners" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-all text-center group"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{item.icon}</div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center pb-8">
                        <Link href="/carnival/register" className="inline-block w-full sm:w-auto">
                            <Button size="lg" className="rounded-full px-12 py-9 text-xl font-bold bg-primary hover:bg-primary/90 shadow-2xl w-full sm:w-auto h-auto">
                                Register here <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* World Record Component */}
            <WorldRecord />

            {/* Previous Editions Gallery */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black mb-4 italic">THE VIBE</h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Relive the magic of past editions. This is where Africa's pet community comes alive.
                        </p>
                    </div>

                    <div className="mt-8">
                        <GalleryPreview media={galleryMedia} />
                    </div>
                </div>
            </section>

            {/* Competitions */}
            <Competitions />

            {/* Intermediate Registration CTA */}
            <section className="py-20 bg-primary text-white text-center">
                <div className="container px-4">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">Don't Let Your Dog Miss Out!</h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
                        Registration is open for all breeds. Be part of the historic Guinness World Record attempt.
                    </p>
                    <Link href="/carnival/register" className="inline-block w-full sm:w-auto">
                        <Button size="lg" className="bg-white text-primary hover:bg-slate-100 rounded-full px-12 py-9 text-xl font-black shadow-2xl w-full sm:w-auto h-auto">
                            Register My Pet
                        </Button>
                    </Link>
                </div>
            </section>

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
                        {/* Jackie */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-xl border border-primary/10 hover:shadow-2xl transition-all group"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all" />
                                <div className="relative w-full h-full rounded-full overflow-hidden z-10">
                                    <Image
                                        src="/jackie.jpg"
                                        alt="Jackie Idimogu"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black p-2 rounded-full shadow-lg z-20">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-black mb-2">Jackie Idimogu</h3>
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
                                <div className="relative w-full h-full rounded-full overflow-hidden z-10">
                                    <Image
                                        src="/gabby.jpg"
                                        alt="Gabby Idimogu"
                                        fill
                                        className="object-cover"
                                    />
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

            <Sponsors />

            {/* Final CTA Footer */}
            <section className="py-24 bg-slate-900 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="homepage2_gsja4s"
                        alt="Background"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="container px-4 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-8">Ready for Dec 13th?</h2>
                    <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
                        Join Africa's biggest pet celebration at TBS. Registration covers entry for 1 Pet & 1 Human.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                        <Link href="/carnival/register" className="w-full sm:w-auto">
                            <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 rounded-full px-12 py-10 text-2xl font-black shadow-2xl w-full h-auto">
                                Register Now
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-full px-12 py-10 text-2xl font-black w-full h-auto">
                                Vendor/Sponsor
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
