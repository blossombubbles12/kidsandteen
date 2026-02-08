"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealContactProps {
    value: string;
    type: "email" | "phone";
    className?: string;
}

export function RevealContact({ value, type, className }: RevealContactProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    const maskValue = (val: string, type: "email" | "phone") => {
        if (type === "email") {
            const [user, domain] = val.split("@");
            return `${user.slice(0, 3)}***@${domain}`;
        }
        return `${val.slice(0, 4)}***${val.slice(-3)}`;
    };

    const href = type === "email" ? `mailto:${value}` : `tel:${value}`;

    return (
        <div className={cn("inline-flex items-center gap-2", className)}>
            <AnimatePresence mode="wait">
                {isRevealed ? (
                    <motion.a
                        key="revealed"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        href={href}
                        className="hover:text-primary transition-colors flex items-center gap-2"
                    >
                        {value}
                    </motion.a>
                ) : (
                    <motion.button
                        key="masked"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        onClick={() => setIsRevealed(true)}
                        className="hover:text-primary transition-colors flex items-center gap-2 text-muted-foreground/80 italic text-sm"
                        title="Click to reveal"
                    >
                        {maskValue(value, type)}
                        <Eye className="w-3 h-3 opacity-50" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
