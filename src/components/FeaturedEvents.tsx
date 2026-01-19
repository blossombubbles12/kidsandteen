"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CldImage } from "@/components/media/CldImage";

const events = [
    {
        id: 1,
        title: "Sunday Dog Walk - Lekki",
        date: "Jan 12 • 7:00 AM",
        location: "Freedom Park, Lekki",
        image: "homepage4_sdyykt",
        category: "Social",
    },
    {
        id: 2,
        title: "Puppy Training Workshop",
        date: "Jan 18 • 10:00 AM",
        location: "My Dog & I Center",
        image: "homepage1_lnnftx",
        category: "Training",
    },
    {
        id: 3,
        title: "Beach Day Fun",
        date: "Feb 15 • 8:00 AM",
        location: "Elegushi Beach",
        image: "homepage3_fqiznc",
        category: "Social",
    },
];

export function FeaturedEvents() {
    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground"
                        >
                            Upcoming Events
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 text-lg text-muted-foreground"
                        >
                            Join the fun! Here are some popular events happening soon.
                        </motion.p>
                    </div>
                    <Link href="/events">
                        <Button variant="ghost" className="group">
                            View All Events <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full overflow-hidden border-border/50 bg-card/50 hover:bg-card transition-colors">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <CldImage
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider text-foreground">
                                        {event.category}
                                    </div>
                                </div>
                                <CardHeader className="p-6 pb-2">
                                    <CardTitle className="text-xl">{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-2 pb-4 space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                                        {event.location}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <Button className="w-full" variant="secondary">Details</Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
