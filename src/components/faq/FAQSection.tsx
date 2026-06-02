"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is Kids and Teens University (KTU)?",
        answer: "KTU is Africa's leading hub for youth entrepreneurship, financial intelligence, and leadership excellence. We empower children and teenagers (ages 6-18) to launch businesses, manage investments, and lead with confidence through hands-on projects, mentorship, and global exposure.",
        category: "general"
    },
    {
        question: "How can I join KTU?",
        answer: "You can join by selecting the appropriate membership plan on our Membership page. Kids (ages 6-12) and Teens (ages 13-18) have tailored programs. As a member, you'll gain access to business incubators, investment clubs, mentorship, and exclusive events.",
        category: "general"
    },
    {
        question: "What programs are available for kids (6-12)?",
        answer: "Kids enjoy Mini-Business Ventures (lemonade stands, crafts, toy businesses), Financial Literacy Games, Leadership & Character building, STEM Explorers (robotics, coding, science fairs), and Creative Expression (arts, drama, music showcases).",
        category: "programs"
    },
    {
        question: "What programs are available for teens (13-18)?",
        answer: "Teens participate in Startup Incubation (fashion lines, apps, online stores), Investment Clubs (stock market, crypto simulations, budgeting), Career Readiness (internships, CV building, global exchange), Innovation Labs (hackathons, prototyping), and Leadership & Global Citizenship.",
        category: "programs"
    },
    {
        question: "How do I become a sponsor or partner?",
        answer: "We love partners! You can view our partnership packages on the 'Sponsorships' page or reach out to us through the contact form. We offer various levels of brand visibility and youth program activation zones.",
        category: "business"
    },
    {
        question: "Does KTU offer scholarships?",
        answer: "Yes! KTU is committed to making entrepreneurship education accessible. We offer need-based scholarships and merit-based awards. Contact us for more information about our scholarship programs.",
        category: "general"
    }
];

export function FAQSection({ limit }: { limit?: number }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

    return (
        <div className="space-y-4">
            {displayFaqs.map((faq, index) => (
                <div
                    key={index}
                    className="border border-border/50 rounded-2xl overflow-hidden bg-card transition-all hover:border-primary/30 shadow-sm"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-lg"
                    >
                        <span className="flex-1">{faq.question}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-primary text-white' : 'bg-secondary'}`}>
                            {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                    <div className="pt-2 border-t border-border/30">
                                        {faq.answer}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
