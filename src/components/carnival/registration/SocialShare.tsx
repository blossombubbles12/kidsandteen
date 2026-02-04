"use client";

import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check, MessageCircle, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface SocialShareProps {
    title?: string;
    description?: string;
    url?: string;
    variant?: "compact" | "full";
}

export default function SocialShare({
    title = "I just registered for the Lagos Dog Carnival 2026! 🐾",
    description = "Join me and let's break a world record together at the biggest dog event in Africa! 🇳🇬",
    url = "https://lagosdogcarnival.com/carnival/register",
    variant = "full"
}: SocialShareProps) {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const shareData = {
        title,
        text: `${title}\n${description}`,
        url,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast({
                title: "Link Copied!",
                description: "Share it with your friends and family!",
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareData.text)}`,
        discord: `https://discord.com/channels/@me`, // Discord doesn't have a direct URI share, usually requires copy-paste or bot
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareData.text + "\n\n" + url)}`,
    };

    if (variant === "compact") {
        return (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-green-50 hover:text-green-600 hover:border-green-500 transition-all duration-300"
                    onClick={() => window.open(shareLinks.whatsapp, "_blank")}
                    title="Share on WhatsApp"
                >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                    onClick={() => window.open(shareLinks.facebook, "_blank")}
                    title="Share on Facebook"
                >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-500 transition-all duration-300"
                    onClick={() => window.open(shareLinks.telegram, "_blank")}
                    title="Share on Telegram"
                >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
                    onClick={() => window.open(shareLinks.twitter, "_blank")}
                    title="Share on X (Twitter)"
                >
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300"
                    onClick={() => window.open(shareLinks.linkedin, "_blank")}
                    title="Share on LinkedIn"
                >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 transition-all duration-300"
                    onClick={() => window.open(shareLinks.email, "_blank")}
                    title="Share via Email"
                >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share(shareData).catch(console.error);
                        } else {
                            handleCopyLink();
                        }
                    }}
                    title="More Share Options"
                >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border-2 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-500 transition-all duration-300"
                    onClick={handleCopyLink}
                    title="Copy Link"
                >
                    {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </Button>
            </div>
        );
    }

    const shareButtons = [
        { name: "WhatsApp", icon: MessageCircle, color: "hover:border-green-500 hover:bg-green-50", iconBg: "bg-green-100 text-green-600", activeBg: "group-hover:bg-green-500", link: shareLinks.whatsapp },
        { name: "X / Twitter", icon: Twitter, color: "hover:border-blue-400 hover:bg-blue-50", iconBg: "bg-blue-100 text-blue-400", activeBg: "group-hover:bg-blue-400", link: shareLinks.twitter },
        { name: "Facebook", icon: Facebook, color: "hover:border-blue-600 hover:bg-blue-50", iconBg: "bg-blue-100 text-blue-600", activeBg: "group-hover:bg-blue-600", link: shareLinks.facebook },
        { name: "Telegram", icon: Send, color: "hover:border-sky-500 hover:bg-sky-50", iconBg: "bg-sky-100 text-sky-500", activeBg: "group-hover:bg-sky-500", link: shareLinks.telegram },
        { name: "LinkedIn", icon: Linkedin, color: "hover:border-blue-700 hover:bg-blue-50", iconBg: "bg-blue-100 text-blue-700", activeBg: "group-hover:bg-blue-700", link: shareLinks.linkedin },
        { name: "Email", icon: Mail, color: "hover:border-gray-500 hover:bg-gray-50", iconBg: "bg-gray-100 text-gray-500", activeBg: "group-hover:bg-gray-500", link: shareLinks.email },
    ];

    return (
        <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm font-bold text-gray-500 uppercase tracking-widest">Spread the Word</span>
                </div>
            </div>

            <div className="text-center space-y-2">
                <h3 className="font-black text-2xl mb-1 text-orange-600 uppercase italic tracking-tighter">Bring the Whole Pack! 🐾</h3>
                <p className="text-sm text-balance text-muted-foreground leading-relaxed italic">
                    Tell everyone about history in the making. Let's break this record together!
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {shareButtons.map((btn) => (
                    <Button
                        key={btn.name}
                        variant="outline"
                        className={`flex flex-col items-center gap-2 py-6 h-auto border-2 rounded-2xl group transition-all ${btn.color}`}
                        onClick={() => window.open(btn.link, "_blank")}
                    >
                        <div className={`p-2.5 rounded-full group-hover:text-white transition-all transform group-hover:rotate-12 ${btn.iconBg} ${btn.activeBg}`}>
                            <btn.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tight">{btn.name}</span>
                    </Button>
                ))}

                <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto border-2 rounded-2xl hover:border-orange-500 hover:bg-orange-50 group transition-all"
                    onClick={handleCopyLink}
                >
                    <div className={`p-2.5 rounded-full transition-all transform group-hover:rotate-12 ${copied ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'}`}>
                        {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight">{copied ? 'Copied!' : 'Copy Link'}</span>
                </Button>

                {/* Native Share Trigger (Mobile/System) */}
                <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-6 h-auto border-2 rounded-2xl border-primary/20 hover:border-primary hover:bg-primary/5 group transition-all"
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share(shareData).catch(console.error);
                        } else {
                            handleCopyLink();
                        }
                    }}
                >
                    <div className="p-2.5 bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12">
                        <Share2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight">More options</span>
                </Button>
            </div>

            <div className="flex items-center justify-center gap-4 bg-slate-900 text-white p-4 rounded-2xl">
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">Join the movement</p>
                    <p className="text-xs font-bold italic">#LagosDogCarnival #GWR2026</p>
                </div>
            </div>
        </div>
    );
}
