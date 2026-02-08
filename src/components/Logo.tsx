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
            <div className="relative w-24 h-24 flex items-center justify-center">
                {!imgError ? (
                    <Image
                        src="/mydoglogo.png"
                        alt="My Dog & I Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                        priority
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Dog className="w-12 h-12" />
                    </div>
                )}
            </div>
        </div>
    );
}
