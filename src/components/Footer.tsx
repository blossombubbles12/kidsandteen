"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dog, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) return null;

    return (
        <footer className="bg-secondary/30 border-t border-border/50 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section - Expanded */}
                    <div className="space-y-4 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <Dog className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold">My Dog & I</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            My Dog and I Group is a non-profit pet service company actively building a pet-loving community
                            in Nigeria through social work, activism, and animal-related events. Starting on Instagram
                            in 2016, we&apos;ve grown into Africa&apos;s largest gathering of Pets with over 50,000 members.
                            Join us for the Lagos Dog Carnival, community walks, and more!
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/mydogandigroup2" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Navigation Menu */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/carnival" className="hover:text-primary transition-colors">Carnival</Link></li>
                            <li><Link href="/membership" className="hover:text-primary transition-colors">Membership</Link></li>
                            <li><Link href="/media" className="hover:text-primary transition-colors">Media</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors font-bold">Join WhatsApp Community</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/community" className="hover:text-primary transition-colors">Community</Link></li>
                            <li><Link href="/sponsorships" className="hover:text-primary transition-colors">Sponsorships</Link></li>
                            <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
                            <li><Link href="/carnival/register" className="hover:text-primary transition-colors">Register for Carnival</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact - NEW COLUMN */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <a href="mailto:mydogandigroup@yahoo.com" className="hover:text-primary transition-colors break-all">
                                    mydogandigroup@yahoo.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <Phone className="w-4 h-4 text-primary" />
                                </div>
                                <a href="tel:08168874616" className="hover:text-primary transition-colors">
                                    08168874616
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} My Dog & I. All rights reserved.</p>
                    <p className="mt-2 text-xs opacity-80">
                        Made with love ❤️ for dogs everywhere 🐾🐕. Celebrating 10 years of community impact.
                    </p>
                </div>
            </div>
        </footer>
    );
}
