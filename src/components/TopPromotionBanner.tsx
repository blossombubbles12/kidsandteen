"use client";

import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

const messages = [
    "🎉 JOIN KTU — Africa's #1 Youth Entrepreneur Hub!",
    "🚀 Launch your startup BEFORE you turn 18!",
    "💡 Financial freedom starts NOW — ages 6 to 18!",
    "🌍 Building Africa's next generation of CEOs!",
];

export function TopPromotionBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [msgIndex] = useState(0);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden"
            style={{ background: "linear-gradient(90deg, #d9441e, #ff6b35, #ffb347, #d9441e)", backgroundSize: "300% 100%" }}
        >
            <div className="animate-shimmer absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", backgroundSize: "200% 100%" }} />

            <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 relative z-10">
                <Sparkles className="w-4 h-4 text-white shrink-0 animate-wiggle" />
                <div className="overflow-hidden">
                    <div className="animate-marquee flex gap-16 whitespace-nowrap">
                        {[...messages, ...messages].map((msg, i) => (
                            <span key={i} className="text-white font-black text-xs md:text-sm tracking-wide">{msg}</span>
                        ))}
                    </div>
                </div>
                <Sparkles className="w-4 h-4 text-white shrink-0 animate-wiggle delay-300" />

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-3 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close banner"
                >
                    <X className="w-3.5 h-3.5 text-white/80" />
                </button>
            </div>
        </motion.div>
    );
}
