"use client";

import { motion } from "framer-motion";
import { FAQSection } from "@/components/faq/FAQSection";
import { HelpCircle, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CldImage } from "@/components/media/CldImage";

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="homepage1_lnnftx"
                        alt="Support Hero"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="container px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <HelpCircle className="w-4 h-4" /> Support Center
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about the pack, the carnival, and how we care for our furry friends.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Grid */}
            <section className="py-20 container px-4">
                <div className="max-w-4xl mx-auto">
                    <FAQSection />
                </div>
            </section>

            {/* Support CTA */}
            <section className="py-20 bg-secondary/10">
                <div className="container px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Still have questions?</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <div className="bg-background p-8 rounded-3xl shadow-sm border border-border/50">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Social Community</h3>
                            <p className="text-muted-foreground mb-6">Join our WhatsApp or Telegram groups for instant support from fellow members.</p>
                            <Link href="/community">
                                <Button variant="outline" className="w-full font-bold">Visit Community</Button>
                            </Link>
                        </div>

                        <div className="bg-background p-8 rounded-3xl shadow-sm border border-border/50">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Direct Contact</h3>
                            <p className="text-muted-foreground mb-6">Our team is ready to help you with specific inquiries about partnerships or health.</p>
                            <Link href="/contact">
                                <Button className="w-full font-bold">Contact Support</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
