"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { RevealContact } from "./ui/RevealContact";
import { Logo } from "./Logo";
import { motion } from "framer-motion";

export function Footer() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) return null;

    return (
        <footer className="relative overflow-hidden bg-black text-white">
            {/* Top wave */}
            <div className="wave-top">
                <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ height: 60, width: "100%" }}>
                    <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#000000" />
                </svg>
            </div>

            {/* Blob decoration */}
            <div className="blob-bg w-80 h-80 bg-[#e50a1e]/12 -top-20 -right-20 absolute pointer-events-none" />
            <div className="blob-bg w-64 h-64 bg-[#545454]/10 bottom-10 left-10 absolute pointer-events-none" style={{ animationDelay: "3s" }} />

            <div className="container mx-auto px-4 md:px-6 pt-20 pb-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="space-y-5 md:col-span-2">
                        <Link href="/">
                            <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring" }}>
                                <Logo />
                            </motion.div>
                        </Link>
                        <p className="text-white/70 leading-relaxed font-semibold text-lg">
                            Kids and Teens University (KTU) is Africa's leading hub for youth entrepreneurship,
                            financial intelligence, and leadership excellence. Empowering children and teenagers
                            (ages 6–18) to launch businesses, manage investments, and lead with confidence. 🚀
                        </p>

                        {/* Social */}
                        <div className="flex gap-3">
                            {[
                                { href: "#", icon: Facebook, label: "Facebook", color: "hover:bg-[#1877f2]" },
                                { href: "https://www.instagram.com/ktuafrica", icon: Instagram, label: "Instagram", color: "hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#bc1888]" },
                                { href: "#", icon: Twitter, label: "Twitter", color: "hover:bg-[#1da1f2]" },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target={social.href !== "#" ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.15, rotate: -5 }}
                                    whileTap={{ scale: 0.92 }}
                                    className={`w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center ${social.color} transition-all duration-200 border border-white/10`}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Fun sticker badges */}
                        <div className="flex flex-wrap gap-2">
                            {["🌍 Africa-wide", "🏆 10 Years", "💡 50k+ Members"].map((badge, i) => (
                                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/80 border border-white/15">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-black text-[#e50a1e] mb-5 uppercase tracking-wide text-lg flex items-center gap-2">
                            🔗 Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/membership", label: "Membership" },
                                { href: "/programs", label: "Programs" },
                                { href: "/media", label: "Media" },
                                { href: "/about", label: "About Us" },
                                { href: "/contact", label: "Contact" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-lg font-semibold text-white/65 hover:text-[#e50a1e] transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-[#e50a1e] transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-black text-[#e50a1e] mb-5 uppercase tracking-wide text-lg flex items-center gap-2">
                            📬 Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group">
                                <div className="w-9 h-9 rounded-2xl bg-[#e50a1e]/30 flex items-center justify-center shrink-0 group-hover:bg-[#e50a1e]/50 transition-colors mt-0.5">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 font-bold uppercase tracking-wide mb-0.5">Email</p>
                                    <div className="text-lg">
                                        <RevealContact value="info@ktuafrica.org" type="email" />
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <div className="w-9 h-9 rounded-2xl bg-[#e50a1e]/30 flex items-center justify-center shrink-0 group-hover:bg-[#e50a1e]/50 transition-colors mt-0.5">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 font-bold uppercase tracking-wide mb-0.5">Phone</p>
                                    <div className="text-lg">
                                        <RevealContact value="+234 800 123 4567" type="phone" />
                                    </div>
                                </div>
                            </li>
                        </ul>

                        {/* WhatsApp CTA */}
                        <Link
                            href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-black px-5 py-3 rounded-2xl transition-all duration-200 text-sm btn-bounce"
                        >
                            💬 Join WhatsApp Community
                        </Link>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-lg">
                    <p className="text-white/50 font-semibold">
                        © {new Date().getFullYear()} Kids and Teens University (KTU). All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="text-white/40 hover:text-white/80 transition-colors font-semibold text-base">Privacy Policy</Link>
                        <span className="text-white/20">•</span>
                        <Link href="/terms" className="text-white/40 hover:text-white/80 transition-colors font-semibold text-base">Terms of Service</Link>
                    </div>
                    <p className="text-white/30 text-base font-bold tracking-wide">
                        Made with ❤️ for Africa's future leaders
                    </p>
                </div>
            </div>
        </footer>
    );
}
