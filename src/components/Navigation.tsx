"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TopPromotionBanner } from "./TopPromotionBanner";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Membership", href: "/membership" },
    { name: "Carnival", href: "/carnival" },
    { name: "Media", href: "/media" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) return null;

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <TopPromotionBanner />
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        <Dog className="h-8 w-8 text-primary" />
                    </motion.div>
                    <span className="text-xl font-bold font-sans tracking-tight text-foreground">
                        My Dog & I
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative group",
                                pathname === item.href
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary"
                                />
                            )}
                        </Link>
                    ))}
                    <Link href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT" target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="sm" className="ml-4 bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
                            Join WhatsApp
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 md:hidden">
                    <Link href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT" target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="sm" className="font-bold bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
                            Join WhatsApp
                        </Button>
                    </Link>
                    <button
                        className="p-2 text-foreground"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b bg-background overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "text-lg font-medium py-2 border-b border-border/50 last:border-0",
                                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                                <Button className="w-full mt-4 bg-[#25D366] hover:bg-[#128C7E] text-white border-none" size="lg">
                                    Join WhatsApp Community
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
