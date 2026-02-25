"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Users, Trophy, Target, Eye, Sparkles, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnniversaryBanner } from "@/components/AnniversaryBanner";
import { CldImage } from "@/components/media/CldImage";
import { Sponsors } from "@/components/Sponsors";

const timeline = [
    {
        year: "2016",
        title: "Where It All Began",
        description: "The journey started on Instagram, marking the birth of a movement dedicated to pet owners and lovers across Nigeria. Registered membership is now available for doglovers across our social platforms.",
        stats: "Instagram Launch • The Foundation",
        highlight: "Started on Instagram in 2016"
    },
    {
        year: "2019",
        title: "Lagos Dog Carnival 2019",
        description: "The very first Lagos Dog Carnival. A historic gathering that sparked the movement of pet lovers in Nigeria.",
        stats: "150 Dogs • First Carnival",
        highlight: "Launched the Annual Lagos Dog Carnival"
    },
    {
        year: "2020",
        title: "Lagos Dog Carnival 2020",
        description: "Maintained our consistency despite global challenges, celebrating with a unique theme that united our growing community.",
        stats: "Consistent Growth • Unique Theme",
        highlight: "LDC Annual Consistency"
    },
    {
        year: "2021",
        title: "Carnival & Soiree 2021",
        description: "Returned to the streets and launched the 'My Dog and I Group Soiree', broadening our community experiences.",
        stats: "500+ Attendees • Two Major Events",
        highlight: "My Dog and I Group Soiree 2021"
    },
    {
        year: "2022",
        title: "Lagos Dog Carnival 2022",
        description: "Introduced the famous runway show and expanded our reach to national television.",
        stats: "1,200 Dogs • Fashion Focus",
        highlight: "Launched Doggy Fashion Runway"
    },
    {
        year: "2023",
        title: "Carnival 2023 & ACMS",
        description: "A year of advocacy. We marched for the 'Animal Cruelty Must Stop' (ACMS) campaign alongside the carnival.",
        stats: "United for Welfare • Advocacy",
        highlight: "Animal Cruelty Must Stop March"
    },
    {
        year: "2024",
        title: "Carnival 2024 & Playground",
        description: "Introduced the 'Doggie Playground' concept, making our events more interactive than ever before.",
        stats: "Interactive Zones • Landmark Year",
        highlight: "Doggie Playground Launch"
    },
    {
        year: "2025",
        title: "Lagos Dog Carnival 2025",
        description: "The biggest prelude to our record attempt. A massive celebration across Victoria Island.",
        stats: "3,000 Dogs • Record Prep",
        highlight: "Setting the Stage for Guinness World Record"
    }
];

const values = [
    {
        icon: Heart,
        title: "Community First",
        description: "Every decision we make puts our members and their furry companions at the heart of everything."
    },
    {
        icon: Users,
        title: "Inclusivity",
        description: "All breeds, all sizes, all backgrounds welcome. We celebrate diversity in our pack."
    },
    {
        icon: Trophy,
        title: "Excellence",
        description: "From safety standards to event quality, we never compromise on delivering the best experience."
    },
    {
        icon: Sparkles,
        title: "Innovation",
        description: "We're constantly evolving, introducing new activities, and setting trends in the pet community space."
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <CldImage
                        src="homepage7_dl6l1z"
                        alt="Our Community"
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
                </div>

                <div className="container px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <Heart className="w-4 h-4" /> Our Story
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            More Than Events.<br />
                            <span className="text-primary">We're a Movement.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            <strong>My Dog and I Group</strong> is a non-profit pet service company actively building a pet-loving community in Nigeria through social work, activism, and animal-related events.
                            Starting on Instagram in 2016, we've grown into <strong>Africa's largest gathering of Pets</strong>, building connections and celebrating the unconditional love between humans and their animal companions across several platforms.
                        </p>
                    </motion.div>
                </div>
            </section>

            <AnniversaryBanner />

            {/* Mission & Vision */}
            <section className="py-20 bg-secondary/5">
                <div className="container px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-primary/10 to-orange-50 p-10 rounded-3xl border border-primary/20"
                        >
                            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-6">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                To create Africa's most vibrant, inclusive, and supportive community for pet lovers,
                                where every connection is celebrated, every bond is strengthened, and every member feels
                                they belong to something bigger than themselves.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-3xl border border-blue-200"
                        >
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                To be recognized globally as the pioneering force that transformed pet ownership culture
                                in Africa, setting world records, creating lasting impact, and inspiring communities
                                across the continent to celebrate their beloved animal family members.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 7-Year Journey Timeline */}
            <section className="py-20 bg-background">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                            <Calendar className="w-4 h-4" /> Our Journey
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            7 Years of Tail-Wagging Success
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            At My Dog And I Group, we’ve celebrated meaningful milestones through impactful events like the Animal Cruelty Must Stop March and the renowned Lagos Dog Carnival. These events have united animal lovers, raised awareness, and promoted animal welfare. We continue to build on these experiences, with exciting upcoming events that bring together the <strong>largest gathering of Pets in Africa</strong>.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto relative px-4">
                        {/* Vertical Line - Now visible on all screens */}
                        <div className="absolute left-[2.5rem] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-orange-400 to-yellow-400 -translate-x-1/2" />

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        } flex-col gap-8`}
                                >
                                    {/* Year Badge - Centered on line */}
                                    <div className="absolute left-[2.5rem] md:left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm md:text-lg shadow-lg z-10 border-4 border-background">
                                        {item.year.slice(2)}
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                        } pl-16 md:pl-0`}>
                                        <div className="bg-card border border-border/50 rounded-2xl p-5 md:p-8 shadow-lg hover:shadow-xl transition-all hover:border-primary/30">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                                                <span className="text-2xl md:text-4xl font-black text-primary/20">{item.year}</span>
                                            </div>
                                            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-primary mb-3">
                                                <TrendingUp className="w-4 h-4" />
                                                {item.stats}
                                            </div>
                                            <div className="bg-primary/5 border-l-4 border-primary px-3 py-2 md:px-4 md:py-3 rounded">
                                                <p className="text-xs md:text-sm font-medium">✨ {item.highlight}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2026 World Record Section */}
            <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="homepage2_gsja4s"
                        alt="World Record History"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 opacity-30" />

                <div className="container px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider mb-6 shadow-lg">
                            <Trophy className="w-5 h-5" /> Making History
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            2026: Breaking the<br />
                            <span className="text-primary">Guinness World Record</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                            This isn't just another carnival. On December 13th, 2026, we're attempting to gather
                            the <strong>Africa's largest gathering of Pets</strong> at Tafawa Balewa Square.
                            This is our moment to show the world what African pet lovers can achieve together.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <p className="text-4xl font-black text-primary mb-2">2,500+</p>
                                <p className="text-sm font-medium text-muted-foreground">Target Attendees</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <p className="text-4xl font-black text-primary mb-2">2,000+</p>
                                <p className="text-sm font-medium text-muted-foreground">Dogs Expected</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-primary">
                                <p className="text-4xl font-black text-primary mb-2">2,000+</p>
                                <p className="text-sm font-medium text-muted-foreground">Pets Rehomed<br />(Including Cats & Rabbits)</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <p className="text-4xl font-black text-primary mb-2">1st</p>
                                <p className="text-sm font-medium text-muted-foreground">In Africa</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/carnival/register">
                                <Button size="lg" className="text-lg px-10 font-bold shadow-xl">
                                    Be Part of History
                                </Button>
                            </Link>
                            <Link href="/carnival">
                                <Button size="lg" variant="outline" className="text-lg px-10 font-bold border-2">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pack Leaders - Team Section */}
            <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                            <Users className="w-4 h-4" /> Meet the Pack
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            The Pack Leaders
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The humans behind the movement. Three unique personalities united by one mission:
                            making Lagos the most dog-friendly city in Africa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Jackie - CEO/Founder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary">
                                <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-orange-100 flex items-center justify-center">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl z-10">
                                        <Image
                                            src="/jackie.jpg"
                                            alt="Jackie Idimogu"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold z-20">
                                        👑 PRESIDENT
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-black mb-1">Jackie Idimogu</h3>
                                    <p className="text-primary font-bold mb-4">President, My Dog and I Group</p>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        The visionary leader who transformed a passion for pets into Nigeria's largest movement. As President, she drives the strategic direction and advocacy efforts of the group.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                            🎯 Strategic
                                        </span>
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                            💡 Innovative
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Gabby - Dog Person */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-orange-400">
                                <div className="relative aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl z-10">
                                        <Image
                                            src="/gabby.jpg"
                                            alt="Gabby Idimogu"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 bg-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold z-20">
                                        ⭐ VICE PRESIDENT
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-black mb-1">Gabby Idimogu</h3>
                                    <p className="text-orange-600 font-bold mb-4">Vice President</p>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        Co-leader of the movement with a deep expertise in animal behavior and community engagement. Ensures every event reflects our core values of pet welfare and member joy.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                                            🐾 Dog Expert
                                        </span>
                                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                                            ❤️ Empathetic
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Charlie - Regular Guy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-400">
                                <div className="relative aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-blue-600 text-white rounded-full flex items-center justify-center text-5xl font-black">
                                        CC
                                    </div>
                                    <div className="absolute top-4 right-4 bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        🚀 TECH LEAD
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-black mb-1">Charlie Charlie</h3>
                                    <p className="text-blue-600 font-bold mb-4">Head of Technology & Community Ops</p>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                        The digital architect behind the movement. Charlie designs and manages the infrastructure that connects our 50,000+ members, ensuring our Guinness World Record prep and community platforms run flawlessly behind the scenes.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                            💻 Systems Architect
                                        </span>
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                            📊 Community Tech
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-muted-foreground italic">
                            "Three different personalities, one shared obsession: making every dog in Lagos feel loved." 🐕❤️
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-background">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">What We Stand For</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            These values guide every decision we make and every event we organize.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
                            >
                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join CTA */}
            <section className="relative py-20 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <CldImage
                        src="homepage9_mhc0oh"
                        alt="Join the Pack"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="container px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        Ready to Be Part of Our Story?
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Join 50,000+ pet lovers who are already part of this incredible journey.
                    </p>
                    <Link href="/membership">
                        <Button size="lg" variant="secondary" className="text-lg px-10 font-bold shadow-xl">
                            Join the Pack Today
                        </Button>
                    </Link>
                </div>
            </section>

            <Sponsors />
        </div>
    );
}
