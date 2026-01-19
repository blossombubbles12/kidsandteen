"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { CldImage } from "@/components/media/CldImage";

const team = [
    {
        name: "Jackie Idimogu",
        role: "Chief Convener",
        bio: "The architectural mind behind the Carnival. Jackie ensures every detail is perfect for the gold standard of pet events.",
        image: "homepage4_sdyykt",
    },
    {
        name: "Gabby Idimogu",
        role: "Convener",
        bio: "Our resident 'Animal Whisperer'. Gabby ensures 100% tail-wagging satisfaction for every pet that joins our community.",
        image: "homepage5_eejwzt",
    },
    {
        name: "Community Support",
        role: "The Team",
        bio: "Dedicated individuals working 24/7 to support our community and the 50,000+ members of our movement.",
        image: "homepage2_gsja4s",
    },
];

export function TeamSection() {
    return (
        <section className="py-24 bg-secondary/10">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Pack Leaders</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The passionate humans working behind the scenes to make every bark count.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative aspect-[3/3] overflow-hidden">
                                <CldImage
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                <p className="text-primary font-medium mb-4">{member.role}</p>
                                <p className="text-muted-foreground mb-6 line-clamp-3">{member.bio}</p>

                                <div className="flex gap-4">
                                    <button className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></button>
                                    <button className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></button>
                                    <button className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
