"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dog } from "lucide-react";

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export function Logo({ className, showText = false }: LogoProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="relative w-14 h-14 flex items-center justify-center">
                {!imgError ? (
                    <Image
                        src="/mydoglogo.png"
                        alt="My Dog & I Logo"
                        width={60}
                        height={60}
                        className="object-contain"
                        priority
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Dog className="w-8 h-8" />
                    </div>
                )}
            </div>
        </div>
    );
}
