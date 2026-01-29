"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CldImage } from "@/components/media/CldImage";
import Link from "next/link";

// Mock event data
const events = [
    {
        id: 1,
        title: "Lagos Dog Carnival 2026",
        date: "December 13, 2026",
        time: "9:00 AM - 6:00 PM",
        location: "Tafawa Balewa Square, Lagos",
        category: "carnival",
        attendees: 2500,
        image: "lagos_dog_carnival_20242_ekato6",
        featured: true,
        description: "Africa's largest gathering of Pets. Guinness World Record attempt!",
        price: "Free"
    },
    {
        id: 2,
        title: "Sunday Dog Walk - Lekki",
        date: "January 12, 2026",
        time: "7:00 AM - 9:00 AM",
        location: "Freedom Park, Lekki Phase 1",
        category: "walk",
        attendees: 45,
        image: "homepage4_sdyykt",
        description: "Join fellow pet parents for a relaxing morning walk and socialization.",
        price: "Free"
    },
    {
        id: 3,
        title: "Puppy Training Workshop",
        date: "January 18, 2026",
        time: "10:00 AM - 2:00 PM",
        location: "My Dog & I Training Center",
        category: "training",
        attendees: 20,
        image: "homepage9_mhc0oh",
        description: "Learn basic obedience commands and socialization techniques for puppies.",
        price: "₦15,000"
    },
    {
        id: 4,
        title: "Adoption Drive",
        date: "January 25, 2026",
        time: "11:00 AM - 5:00 PM",
        location: "Victoria Island Dog Park",
        category: "adoption",
        attendees: 100,
        image: "homepage2_gsja4s",
        description: "Meet adorable rescue dogs looking for their forever homes.",
        price: "Free"
    },
    {
        id: 5,
        title: "Dog Agility Competition",
        date: "February 8, 2026",
        time: "9:00 AM - 4:00 PM",
        location: "Ikoyi Sports Ground",
        category: "competition",
        attendees: 80,
        image: "homepage1_lnnftx",
        description: "Watch talented dogs navigate obstacle courses. Prizes for top performers!",
        price: "₦5,000"
    },
    {
        id: 6,
        title: "Beach Day with Dogs",
        date: "February 15, 2026",
        time: "8:00 AM - 12:00 PM",
        location: "Elegushi Beach",
        category: "social",
        attendees: 60,
        image: "homepage3_fqiznc",
        description: "Let your dogs run free on the beach! Swimming, fetch, and fun.",
        price: "₦2,000"
    }
];

const categories = [
    { value: "all", label: "All Events" },
    { value: "carnival", label: "Carnival" },
    { value: "walk", label: "Dog Walks" },
    { value: "training", label: "Training" },
    { value: "adoption", label: "Adoptions" },
    { value: "competition", label: "Competitions" },
    { value: "social", label: "Social" }
];

export default function EventsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="homepage8_zaj3az"
                        alt="Join the Pack"
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
                            Upcoming Events
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            From casual walks to major competitions - find the perfect event for you and your pet.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 border-b bg-white sticky top-16 z-40 shadow-sm">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${selectedCategory === cat.value
                                        ? "bg-primary text-white"
                                        : "bg-secondary/30 hover:bg-secondary/50"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16 container px-4">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-20">
                        <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-2xl font-bold mb-2">No events found</h3>
                        <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className={`overflow-hidden h-full hover:shadow-xl transition-all duration-300 ${event.featured ? "ring-2 ring-primary" : ""
                                    }`}>
                                    {event.featured && (
                                        <div className="bg-primary text-white text-xs font-bold px-3 py-1 absolute top-4 right-4 rounded-full z-10">
                                            FEATURED
                                        </div>
                                    )}

                                    <div className="relative aspect-video overflow-hidden">
                                        <CldImage
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-sm font-medium">{event.price}</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-3 line-clamp-2">{event.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {event.description}
                                        </p>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="w-4 h-4 text-primary" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Users className="w-4 h-4 text-primary" />
                                                <span>{event.attendees} attending</span>
                                            </div>
                                        </div>

                                        <Link href={event.id === 1 ? "/carnival/register" : "/membership"}>
                                            <Button className="w-full">Get Tickets</Button>
                                        </Link>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="homepage8_zaj3az"
                        alt="Host an Event"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="container px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Have an idea for a pet event? We'd love to help you organize it and connect you with our community.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="px-10">
                            Contact Us <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
