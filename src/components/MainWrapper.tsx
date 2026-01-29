"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <main className={cn(
            "flex-1",
            !isAdmin && "pt-20 md:pt-24"
        )}>
            {children}
        </main>
    );
}
