"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedMember() {
    return (
        <section className="py-16 bg-secondary/10">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row items-center gap-10 bg-background rounded-3xl p-8 md:p-12 shadow-sm border border-border/50">
                    <div className="relative w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden">
                        <Image
                            src="/event-preview.png"
                            alt="Featured Member"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Quote className="w-4 h-4 fill-primary" />
                            Student Spotlight
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold">
                            Meet Chidi — Age 14, Founder
                        </h2>

                        <p className="text-lg text-muted-foreground italic">
                            "I joined KTU's Startup Incubation program with just an idea for a fashion line.
                            Now I have 12 employees, I've paid my school fees, and I'm mentoring other
                            teens. KTU didn't just teach me business — it showed me I could be a CEO."
                        </p>

                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div>
                                <p className="font-bold text-foreground">Chidi M.</p>
                                <p className="text-sm text-muted-foreground">KTU Member since 2024</p>
                            </div>
                            <Button variant="outline" size="sm">Read Full Story</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
