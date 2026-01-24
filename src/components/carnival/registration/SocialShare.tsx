"use client";

import { useState } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check, MessageCircle } from "lucide-react";
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
    };

    if (variant === "compact") {
        return (
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8 hover:bg-green-50 hover:text-green-600 transition-colors"
                    onClick={() => window.open(shareLinks.whatsapp, "_blank")}
                    title="Share on WhatsApp"
                >
                    <MessageCircle className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8 hover:bg-blue-50 hover:text-blue-400 transition-colors"
                    onClick={() => window.open(shareLinks.twitter, "_blank")}
                    title="Share on X (Twitter)"
                >
                    <Twitter className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    onClick={handleCopyLink}
                    title="Copy Link"
                >
                    {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                </Button>
            </div>
        );
    }

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
                <h3 className="font-black text-2xl mb-1 text-orange-600">Bring the Whole Pack! 🐾</h3>
                <p className="text-sm text-balance text-muted-foreground leading-relaxed">
                    Registrations are growing fast! Invite your friends and fellow dog lovers to join this history-making event.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-8 h-auto border-2 rounded-2xl hover:border-green-500 hover:bg-green-50 group transition-all"
                    onClick={() => window.open(shareLinks.whatsapp, "_blank")}
                >
                    <div className="p-3 bg-green-100 text-green-600 rounded-full group-hover:bg-green-500 group-hover:text-white transition-all transform group-hover:rotate-12">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight">WhatsApp</span>
                </Button>

                <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-8 h-auto border-2 rounded-2xl hover:border-blue-400 hover:bg-blue-50 group transition-all"
                    onClick={() => window.open(shareLinks.twitter, "_blank")}
                >
                    <div className="p-3 bg-blue-100 text-blue-400 rounded-full group-hover:bg-blue-400 group-hover:text-white transition-all transform group-hover:rotate-12">
                        <Twitter className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight">X / Twitter</span>
                </Button>

                <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-8 h-auto border-2 rounded-2xl hover:border-blue-600 hover:bg-blue-50 group transition-all"
                    onClick={() => window.open(shareLinks.facebook, "_blank")}
                >
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                        <Facebook className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight">Facebook</span>
                </Button>

                <Button
                    variant="outline"
                    className="flex flex-col items-center gap-2 py-8 h-auto border-2 rounded-2xl hover:border-orange-500 hover:bg-orange-50 group transition-all"
                    onClick={handleCopyLink}
                >
                    <div className={`p-3 rounded-full transition-all transform group-hover:rotate-12 ${copied ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'}`}>
                        {copied ? <Check className="w-6 h-6" /> : <LinkIcon className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight">{copied ? 'Copied!' : 'Copy Link'}</span>
                </Button>
            </div>

            {navigator.share && (
                <Button
                    variant="secondary"
                    className="w-full font-bold py-7 rounded-2xl border-2 border-transparent hover:border-orange-200 transition-all flex items-center justify-center gap-3"
                    onClick={() => {
                        navigator.share(shareData).catch(console.error);
                    }}
                >
                    <Share2 className="w-5 h-5 text-orange-500" />
                    <span>More Share Options</span>
                </Button>
            )}

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-medium">
                #LagosDogCarnival #GWR2026
            </p>
        </div>
    );
}
