"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterSignup() {
    return (
        <section className="py-20 bg-primary/5">
            <div className="container px-4 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">The Weekly KTU Digest</h2>
                <p className="text-lg text-muted-foreground mb-8">
                    Get the latest community stories, tips, and event updates delivered straight to your inbox every Friday.
                </p>

                <form className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                    <Button size="lg" className="rounded-lg">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4">
                    No spam, just value. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
