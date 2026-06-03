"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TopPromotionBanner } from "./TopPromotionBanner";
import { Logo } from "./Logo";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Membership", href: "/membership" },
    { name: "Media", href: "/media" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    React.useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    if (isAdminPage) return null;

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            )}
        >
            <TopPromotionBanner />

            {/* Main nav bar */}
            <div
                className={cn(
                    "transition-all duration-300",
                    scrolled
                        ? "bg-white/98 shadow-[0_2px_20px_rgba(229,10,30,0.08)] border-b border-[#e5e0db]"
                        : "bg-white/90 backdrop-blur-xl border-b border-[#e5e0db]/70"
                )}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-[62px]">

                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0 group">
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                <Logo />
                            </motion.div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-0.5">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "relative px-4 py-2 rounded-lg text-[0.82rem] font-extrabold tracking-wide uppercase transition-all duration-200",
                                            isActive
                                                ? "text-[#e50a1e]"
                                                : "text-[#545454] hover:text-[#e50a1e] hover:bg-[#e50a1e]/6"
                                        )}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-underline"
                                                className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full"
                                                style={{ background: "linear-gradient(90deg, #e50a1e, #545454)" }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/membership">
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl font-black text-[0.8rem] tracking-wide uppercase text-white shadow-md shadow-[#e50a1e]/25 transition-all"
                                    style={{
                                        background: "linear-gradient(135deg, #e50a1e 0%, #cc0000 100%)",
                                    }}
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Join KTU
                                </motion.button>
                            </Link>
                        </div>

                        {/* Mobile toggle */}
                        <motion.button
                            whileTap={{ scale: 0.88 }}
                            className="flex md:hidden w-9 h-9 items-center justify-center rounded-xl bg-[#e50a1e]/10 text-[#e50a1e]"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="md:hidden overflow-hidden bg-white border-b-2 border-[#e5e0db] shadow-lg shadow-[#e50a1e]/8"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                            {navItems.map((item, i) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-xl font-extrabold text-sm tracking-wide uppercase transition-all",
                                                isActive
                                                    ? "bg-[#e50a1e]/10 text-[#e50a1e]"
                                                    : "text-[#545454] hover:bg-[#e50a1e]/6 hover:text-[#e50a1e]"
                                            )}
                                        >
                                            {item.name}
                                            {isActive
                                                ? <Sparkles className="w-4 h-4" />
                                                : <ChevronRight className="w-4 h-4 opacity-30" />
                                            }
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            {/* Mobile CTA */}
                            <div className="pt-3 border-t border-[#e5e0db] mt-1">
                                <Link href="/membership" onClick={() => setIsOpen(false)}>
                                    <Button
                                        className="w-full font-black text-base h-12 rounded-xl text-white shadow-md uppercase tracking-wide"
                                        style={{ background: "linear-gradient(135deg, #e50a1e, #cc0000)" }}
                                    >
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Join KTU Today
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
