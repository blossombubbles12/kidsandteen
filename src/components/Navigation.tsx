"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TopPromotionBanner } from "./TopPromotionBanner";
import { Logo } from "./Logo";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Membership", href: "/membership" },
    { name: "Carnival", href: "/carnival" },
    { name: "Media", href: "/media" },
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
                <Link href="/" className="flex items-center">
                    <Logo />
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
                    <Link href="/carnival/register">
                        <Button variant="default" size="sm" className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold border-none">
                            Register
                        </Button>
                    </Link>
                    <Link href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT" target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="sm" className="ml-4 bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
                            Join WhatsApp
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Controls */}
                <div className="flex items-center md:hidden">
                    <button
                        className="p-2 text-foreground bg-secondary/20 rounded-full"
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
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
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
                            <div className="flex flex-col gap-3 pt-4 pb-2">
                                <Link href="/carnival/register" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black text-lg h-14 rounded-2xl border-none shadow-lg">
                                        Register for Carnival
                                    </Button>
                                </Link>
                                <Link href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-lg h-14 rounded-2xl border-none shadow-lg" size="lg">
                                        Join WhatsApp Community
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
