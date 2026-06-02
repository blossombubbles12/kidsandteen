"use client";

import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { RevealContact } from "../ui/RevealContact";

export function ContactInfo() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground text-lg">
                    Have questions about our programs? Want to partner with us?
                    We'd love to hear from you.
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold">Email Us</h3>
                        <RevealContact value="info@ktuafrica.org" type="email" />
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold">Call Us</h3>
                        <RevealContact value="+234 800 123 4567" type="phone" />
                    </div>
                </div>
            </div>
        </div>
    );
}
