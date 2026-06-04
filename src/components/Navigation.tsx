"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TopPromotionBanner } from "./TopPromotionBanner";
import { Logo } from "./Logo";

type NavItem = {
    name: string;
    href: string;
    children?: { name: string; href: string; description: string }[];
};

const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Membership", href: "/membership" },
    {
        name: "Programs",
        href: "/programs",
        children: [
            { name: "Public Speaking", href: "/programs/public-speaking", description: "Voice, confidence & stage exposure" },
            { name: "Financial Literacy", href: "/programs/financial-literacy", description: "Money skills & smart habits" },
            { name: "Boardroom Leadership", href: "/programs/boardroom-leadership", description: "Professional mindset & collaboration" },
            { name: "Youth Leadership", href: "/programs/leadership", description: "Confidence, decisions & teamwork" },
            { name: "Kids + AI", href: "/programs/artificial-intelligence", description: "Learning and growing with technology" },
        ]
    },
    { name: "Media", href: "/media" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (isAdminPage) return null;

    const isActive = (href: string) => pathname === href;
    const isChildActive = (children: { href: string }[]) => children.some(c => pathname === c.href);

    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300")}>
            <TopPromotionBanner />

            <div className={cn(
                "transition-all duration-300",
                scrolled
                    ? "bg-white/98 shadow-[0_2px_20px_rgba(229,10,30,0.08)] border-b border-[#e5e0db]"
                    : "bg-white/90 backdrop-blur-xl border-b border-[#e5e0db]/70"
            )}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between h-[62px]">

                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0 group">
                            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                                <Logo />
                            </motion.div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-0.5" ref={dropdownRef}>
                            {navItems.map((item) => {
                                if (item.children) {
                                    const dropdownOpen = openDropdown === item.name;
                                    const childActive = isChildActive(item.children);
                                    return (
                                        <div key={item.name} className="relative"
                                            onMouseEnter={() => setOpenDropdown(item.name)}
                                            onMouseLeave={() => setOpenDropdown(null)}
                                        >
                                            <div className="flex items-center">
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "relative flex items-center gap-1 px-4 py-2 rounded-lg text-[0.82rem] font-extrabold tracking-wide uppercase transition-all duration-200",
                                                        childActive || isActive(item.href)
                                                            ? "text-[#e50a1e]"
                                                            : "text-[#545454] hover:text-[#e50a1e] hover:bg-[#e50a1e]/6"
                                                    )}
                                                >
                                                    {item.name}
                                                    {(childActive || isActive(item.href)) && (
                                                        <motion.div
                                                            layoutId="nav-underline"
                                                            className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full"
                                                            style={{ background: "linear-gradient(90deg, #e50a1e, #545454)" }}
                                                        />
                                                    )}
                                                </Link>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setOpenDropdown(dropdownOpen ? null : item.name); }}
                                                    className={cn(
                                                        "flex items-center justify-center w-6 h-6 rounded-lg text-[0.82rem] font-extrabold tracking-wide uppercase transition-all duration-200 -ml-1",
                                                        childActive || isActive(item.href)
                                                            ? "text-[#e50a1e]"
                                                            : "text-[#545454] hover:text-[#e50a1e] hover:bg-[#e50a1e]/6"
                                                    )}
                                                >
                                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                                                </button>
                                            </div>

                                            <AnimatePresence>
                                                {dropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-2xl border-2 border-[#e5e0db] shadow-xl shadow-black/5 overflow-hidden"
                                                    >
                                                        <div className="p-2">
                                                            {item.children.map((child) => (
                                                                <Link
                                                                    key={child.href}
                                                                    href={child.href}
                                                                    onClick={() => setOpenDropdown(null)}
                                                                    className={cn(
                                                                        "flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-all duration-150",
                                                                        isActive(child.href)
                                                                            ? "bg-[#e50a1e]/10 text-[#e50a1e]"
                                                                            : "text-[#545454] hover:bg-[#e50a1e]/6 hover:text-[#e50a1e]"
                                                                    )}
                                                                >
                                                                    <span className="font-extrabold text-sm tracking-wide uppercase">{child.name}</span>
                                                                    <span className="text-[11px] text-[#888888] font-semibold">{child.description}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "relative px-4 py-2 rounded-lg text-[0.82rem] font-extrabold tracking-wide uppercase transition-all duration-200",
                                            active
                                                ? "text-[#e50a1e]"
                                                : "text-[#545454] hover:text-[#e50a1e] hover:bg-[#e50a1e]/6"
                                        )}
                                    >
                                        {item.name}
                                        {active && (
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
                                    style={{ background: "linear-gradient(135deg, #e50a1e 0%, #cc0000 100%)" }}
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
                                if (item.children) {
                                    const expanded = mobileExpanded === item.name;
                                    const childActive = isChildActive(item.children);
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                        >
                                            <button
                                                onClick={() => setMobileExpanded(expanded ? null : item.name)}
                                                className={cn(
                                                    "flex items-center justify-between w-full px-4 py-3 rounded-xl font-extrabold text-sm tracking-wide uppercase transition-all",
                                                    childActive || isActive(item.href)
                                                        ? "bg-[#e50a1e]/10 text-[#e50a1e]"
                                                        : "text-[#545454] hover:bg-[#e50a1e]/6 hover:text-[#e50a1e]"
                                                )}
                                            >
                                                {item.name}
                                                <ChevronDown className={cn("w-4 h-4 transition-transform", expanded && "rotate-180")} />
                                            </button>
                                            <AnimatePresence>
                                                {expanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden pl-4"
                                                    >
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                onClick={() => { setIsOpen(false); setMobileExpanded(null); }}
                                                                className={cn(
                                                                    "flex flex-col gap-0.5 px-4 py-3 my-1 rounded-xl transition-all",
                                                                    isActive(child.href)
                                                                        ? "bg-[#e50a1e]/10 text-[#e50a1e]"
                                                                        : "text-[#545454] hover:bg-[#e50a1e]/6 hover:text-[#e50a1e]"
                                                                )}
                                                            >
                                                                <span className="font-extrabold text-sm tracking-wide uppercase">{child.name}</span>
                                                                <span className="text-xs text-[#888888] font-semibold">{child.description}</span>
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                }

                                const active = isActive(item.href);
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
                                                active
                                                    ? "bg-[#e50a1e]/10 text-[#e50a1e]"
                                                    : "text-[#545454] hover:bg-[#e50a1e]/6 hover:text-[#e50a1e]"
                                            )}
                                        >
                                            {item.name}
                                            {active
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
