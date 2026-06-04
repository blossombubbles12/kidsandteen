"use client";

import { motion } from "framer-motion";
import { Trophy, Scissors, Activity, Camera } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const competitions = [
    {
        title: "Pitch Competition",
        description: "Young entrepreneurs pitch their business ideas to a panel of judges.",
        icon: Trophy,
        prize: "₦500,000 Seed Funding",
    },
    {
        title: "Fashion Parade",
        description: "Showcase your creative style on the runway. Best outfit wins.",
        icon: Camera,
        prize: "Modeling Contract",
    },
    {
        title: "Innovation Challenge",
        description: "Solve real-world problems with creative thinking and teamwork.",
        icon: Activity,
        prize: "Tech Scholarship",
    },
    {
        title: "Creative Arts",
        description: "Show off your talent in music, art, drama, or public speaking.",
        icon: Scissors,
        prize: "Creative Award Package",
    },
];

export function Competitions() {
    return (
        <section className="py-24 bg-secondary/10">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Competitions & Activities</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Show off your talent and win big!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {competitions.map((comp, index) => (
                        <motion.div
                            key={comp.title}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:border-primary/50 transition-colors">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <comp.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle>{comp.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">{comp.description}</p>
                                    <div className="text-sm font-semibold text-primary bg-primary/5 py-1 px-3 rounded-full w-fit">
                                         {comp.prize}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
