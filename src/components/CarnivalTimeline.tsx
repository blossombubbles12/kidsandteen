"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Star, Lightbulb, Rocket, Award } from "lucide-react";

const history = [
    {
        year: "2024",
        title: "KTU Founded",
        description: "Kids and Teens University was founded with a vision to transform how young Africans learn entrepreneurship and leadership.",
        icon: Star,
    },
    {
        year: "2024",
        title: "First Cohort Launched",
        description: "50 young entrepreneurs aged 6-18 joined our inaugural programs — startup incubation, investment clubs, and STEM labs.",
        icon: Rocket,
    },
    {
        year: "2025",
        title: "KTU Shark Tank",
        description: "Our first pitch competition where kids and teens presented real business ideas to investors. Three startups received seed funding.",
        icon: Lightbulb,
    },
    {
        year: "2025",
        title: "Investment Simulation Challenge",
        description: "Launched our stock market and crypto simulation program. Members managed virtual portfolios and learned wealth strategies.",
        icon: Award,
    },
    {
        year: "2026",
        title: "Global Expansion",
        description: "KTU connects with international youth entrepreneurship networks. Exchange programs and global forums launch.",
        icon: Users,
    },
];

export function KtuTimeline() {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Journey</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        From a bold idea to Africa's leading youth entrepreneurship hub.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 md:px-0">
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full" />

                    <div className="space-y-12">
                        {history.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex items-center justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                                    } flex-col md:flex-row`}
                            >
                                <div className="hidden md:block w-5/12" />

                                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-background border-4 border-primary rounded-full z-10 flex items-center justify-center shadow-md">
                                    <item.icon className="w-4 h-4 text-primary" />
                                </div>

                                <div className="w-full md:w-5/12 pl-16 md:pl-0">
                                    <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all relative overflow-hidden group">
                                        <span className="text-4xl font-bold text-primary/5 absolute top-2 right-2 md:top-4 md:right-4 pointer-events-none group-hover:text-primary/10 transition-colors">
                                            {item.year}
                                        </span>
                                        <div className="flex items-center gap-2 mb-2 relative z-10">
                                            <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm relative z-10">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
