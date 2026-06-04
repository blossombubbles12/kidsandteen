"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Tribe", "Community", "Network", "Family"];

export function RotatingWord() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((i) => (i + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-block align-bottom" style={{ verticalAlign: "baseline" }}>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={words[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="inline-block text-[#e50a1e] whitespace-nowrap"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
