"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mic, Heart, Users, ArrowRight, ShieldCheck, PlayCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function CommunityPage() {
    const whatsappLink = "https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative px-6 py-20 md:py-32 lg:px-12 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/kidsteenleadership.jpeg"
                        alt="Community Hero"
                        fill
                        className="object-cover opacity-10"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-8 p-4 bg-primary/10 rounded-full inline-block"
                    >
                        <MessageCircle className="w-12 h-12 text-primary" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-600 to-amber-600 pb-2"
                    >
                        Connect With Young Leaders
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl leading-relaxed"
                    >
                        Join the <span className="text-primary font-bold">KTU community</span>. A vibrant group of young leaders dedicated to learning, growth, and building the future together.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="h-auto text-lg py-4 px-6 md:px-8 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all bg-[#25D366] hover:bg-[#128C7E] border-none text-white"
                        >
                            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <MessageCircle className="h-6 w-6 shrink-0" />
                                <span className="whitespace-normal">Join WhatsApp Community</span>
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="px-6 py-16 md:py-24 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
                            <CardHeader>
                                <Mic className="w-10 h-10 text-primary mb-2" />
                                <CardTitle className="text-2xl">Live Discussions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-lg">
                                    Participate in voice chats and text discussions about leadership, entrepreneurship, and personal development.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
                            <CardHeader>
                                <Heart className="w-10 h-10 text-primary mb-2" />
                                <CardTitle className="text-2xl">Mentorship & Guidance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-lg">
                                    Get advice from experienced mentors, industry professionals, and fellow young entrepreneurs.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
                            <CardHeader>
                                <Users className="w-10 h-10 text-primary mb-2" />
                                <CardTitle className="text-2xl">Connect & Collaborate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-lg">
                                    Connect directly with fellow young leaders. Find study partners, project collaborators, and a support system that understands.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
                            <CardHeader>
                                <Calendar className="w-10 h-10 text-primary mb-2" />
                                <CardTitle className="text-2xl">Event Updates</CardTitle>
                            </CardHeader>
                            <CardContent>
                                     <p className="text-muted-foreground text-lg">
                                         Be the first to know about upcoming events, workshops, and community meetups. Never miss a chance to connect and grow.
                                     </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Audio Participation */}
            <section className="px-6 py-20 md:py-28 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-br from-primary/10 to-orange-100 rounded-3xl p-8 md:p-16 text-center border border-primary/10"
                >
                    <PlayCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Speak Your Mind</h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                        We believe every young leader has a voice. Whether you are at home or on the go, our community lets you connect, learn, and grow together.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white/60 p-6 rounded-2xl">
                            <h3 className="font-bold text-lg mb-2 flex items-center"><Mic className="w-5 h-5 mr-2 text-primary" /> Share Ideas</h3>
                            <p className="text-sm text-muted-foreground">Jump into active discussions about leadership and entrepreneurship.</p>
                        </div>
                        <div className="bg-white/60 p-6 rounded-2xl">
                            <h3 className="font-bold text-lg mb-2 flex items-center"><Users className="w-5 h-5 mr-2 text-primary" /> Learn Together</h3>
                            <p className="text-sm text-muted-foreground">Absorb advice and stories from fellow young leaders on the go.</p>
                        </div>
                        <div className="bg-white/60 p-6 rounded-2xl">
                            <h3 className="font-bold text-lg mb-2 flex items-center"><Heart className="w-5 h-5 mr-2 text-primary" /> Support</h3>
                            <p className="text-sm text-muted-foreground">Give and receive encouragement through every step of your journey.</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* How It Works */}
            <section className="px-6 py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
                    <div className="relative">
                        {/* Connecting Line (Mobile hidden, Desktop visible) */}
                        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-1 bg-muted -translate-x-1/2" />

                        <div className="space-y-12 mb-12">
                            {[
                                { step: 1, title: "Click Invite Link", desc: "Use the button below to open the WhatsApp invite." },
                                { step: 2, title: "Join Group", desc: "Accept the invitation in your WhatsApp app." },
                                { step: 3, title: "Introduce Yourself", desc: "Share a bit about yourself and your goals!" },
                                { step: 4, title: "Stay Active", desc: "Join voice chats and planned meetups." }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 relative`}
                                >
                                    <div className="flex-1 text-center md:text-left">
                                        <div className={`p-6 bg-muted/30 rounded-2xl ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg">
                                        {item.step}
                                    </div>
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Rules */}
            <section className="px-6 py-16 md:py-24 bg-muted/20">
                <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/50">
                    <div className="flex items-center justify-center mb-8">
                        <ShieldCheck className="w-12 h-12 text-primary mr-4" />
                        <h2 className="text-3xl font-bold">Community Guidelines</h2>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Be kind and respectful to all members.",
                            "No spam or unrelated promotions.",
                            "Keep discussions constructive and on-topic.",
                            "Voice chats are for positive and friendly participation."
                        ].map((rule, i) => (
                            <li key={i} className="flex items-start text-lg text-muted-foreground">
                                <ArrowRight className="w-6 h-6 mr-3 text-primary shrink-0 mt-0.5" />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative px-6 py-24 md:py-32 text-center bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/kidspublicspeaking.jpeg"
                        alt="Join Our Community"
                        fill
                        className="object-cover opacity-30"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Join Our Community?</h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Connect with thousands of young entrepreneurs just like you.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="h-auto text-lg md:text-xl py-8 px-8 md:px-12 rounded-full shadow-2xl hover:shadow-[#25D366]/50 hover:scale-105 transition-all bg-[#25D366] hover:bg-[#128C7E] border-none text-white w-full md:w-auto"
                    >
                        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1">
                            <div className="flex items-center gap-3">
                                <MessageCircle className="h-8 w-8 shrink-0" />
                                <span className="whitespace-normal text-center">Join the KTU Community</span>
                            </div>
                            <span className="text-xs opacity-90 font-medium">(WhatsApp Group)</span>
                        </Link>
                    </Button>
                </motion.div>
            </section>
        </div>
    );
}
