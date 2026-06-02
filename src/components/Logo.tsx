"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="relative flex-shrink-0">
                {!imgError ? (
                    <Image
                        src="/logo.png"
                        alt="Kids and Teens University Logo"
                        width={44}
                        height={44}
                        className="object-contain"
                        priority
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <GraduationCap className="w-8 h-8 text-[#d9441e]" />
                )}
            </div>
            <div className="flex flex-col leading-none">
                <span className="font-black tracking-tight text-[#d9441e] text-sm leading-tight">
                    Kids &amp; Teens
                </span>
                <span className="font-black tracking-widest uppercase text-[#2d1a0e]" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", lineHeight: 1.3 }}>
                    University
                </span>
            </div>
        </div>
    );
}
