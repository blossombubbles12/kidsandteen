"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GraduationCap, User, ArrowRight, ArrowLeft, PartyPopper, Mail, Phone, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createRegistration } from "@/app/actions/registration";
import { useRouter } from "next/navigation";

interface RegistrationWizardProps {
    plan?: string;
}

export default function RegistrationWizard({ plan }: RegistrationWizardProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        category: plan === "teens" ? "Teens (13-18)" : "Kids (6-12)",
        guest_count: 0,
        location: "",
        acceptedTerms: false
    });

    const updateData = (newData: any) => setData(prev => ({ ...prev, ...newData }));

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        const result = await createRegistration(data);
        if (result.success) {
            setStep(3);
        } else {
            setError(result.error || "Registration failed");
        }
        setLoading(false);
    };

    const isValidStep1 = data.name && data.email;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 py-20 px-4">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border/40 overflow-hidden relative">

                {/* Progress Bar */}
                <div className="h-2 bg-secondary/30 w-full">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-orange-500"
                        initial={{ width: "50%" }}
                        animate={{ width: `${(step / 2) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="p-8 md:p-12">
                    {step < 3 && (
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-black mb-2">{plan === "teens" ? "Future CEO" : "Young Innovator"} Registration</h1>
                            <p className="text-muted-foreground">Step {step} of 2</p>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                        <GraduationCap className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                                    <p className="text-muted-foreground">Get started with your KTU journey</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Full Name *</label>
                                        <input
                                            placeholder="Parent/Guardian or Student Name"
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 ring-primary/50 outline-none transition-all"
                                            value={data.name}
                                            onChange={(e) => updateData({ name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Email Address *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                placeholder="parent@example.com"
                                                type="email"
                                                className="w-full pl-12 p-4 rounded-xl border bg-background focus:ring-2 ring-primary/50 outline-none transition-all"
                                                value={data.email}
                                                onChange={(e) => updateData({ email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                placeholder="+234 800 000 0000"
                                                type="tel"
                                                className="w-full pl-12 p-4 rounded-xl border bg-background focus:ring-2 ring-primary/50 outline-none transition-all"
                                                value={data.phone}
                                                onChange={(e) => updateData({ phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Program</label>
                                        <select
                                            className="w-full p-4 rounded-xl border bg-background focus:ring-2 ring-primary/50 outline-none transition-all cursor-pointer"
                                            value={data.category}
                                            onChange={(e) => updateData({ category: e.target.value })}
                                        >
                                            <option value="Kids (6-12)">Kids Program (6-12) ⭐</option>
                                            <option value="Teens (13-18)">Teens Program (13-18) 🚀</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Location (State/City)</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                placeholder="Lagos, Nigeria"
                                                className="w-full pl-12 p-4 rounded-xl border bg-background focus:ring-2 ring-primary/50 outline-none transition-all"
                                                value={data.location}
                                                onChange={(e) => updateData({ location: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Additional Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                placeholder="0"
                                                className="w-full pl-12 p-4 rounded-xl border bg-background focus:ring-2 ring-primary/50 outline-none transition-all"
                                                value={data.guest_count}
                                                onChange={(e) => updateData({ guest_count: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Review & Confirm */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                        <User className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Review your details</h2>
                                    <p className="text-muted-foreground">Confirm everything looks correct</p>
                                </div>

                                <div className="bg-secondary/10 rounded-xl p-6 space-y-4 border">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Name</span>
                                        <span className="font-bold">{data.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Email</span>
                                        <span className="font-bold">{data.email}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Phone</span>
                                        <span className="font-bold">{data.phone || "Not provided"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Program</span>
                                        <span className="font-bold">{data.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Location</span>
                                        <span className="font-bold">{data.location || "Not provided"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground text-sm">Guests</span>
                                        <span className="font-bold">{data.guest_count}</span>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                                        {error}
                                    </div>
                                )}

                                {/* Terms Acceptance */}
                                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms-join"
                                            checked={data.acceptedTerms}
                                            onChange={(e) => updateData({ acceptedTerms: e.target.checked })}
                                            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        />
                                        <label htmlFor="terms-join" className="text-sm text-muted-foreground">
                                            I agree to the{" "}
                                            <a href="/terms" target="_blank" className="text-primary hover:underline font-medium">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="/privacy" target="_blank" className="text-primary hover:underline font-medium">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Success */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center space-y-6 py-10"
                            >
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 animate-bounce">
                                    <PartyPopper className="w-12 h-12" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">Welcome to KTU, {data.name.split(' ')[0]}!</h2>
                                    <p className="text-xl text-muted-foreground">
                                        Your journey to becoming a future CEO starts now! 🚀
                                    </p>
                                </div>
                                <div className="bg-secondary/20 p-6 rounded-xl max-w-md mx-auto">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        We've sent a confirmation email to:
                                    </p>
                                    <p className="font-bold text-lg">{data.email}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Check your inbox for next steps and program details!
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                    <Link href="/events">
                                        <Button size="lg" className="w-full sm:w-auto px-8">
                                            View Events
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                                            Contact Us
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {step < 3 && (
                        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border/30">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setStep(step - 1)}
                                disabled={step === 1}
                                className={step === 1 ? "invisible" : ""}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                            <Button
                                type="button"
                                onClick={step === 2 ? handleSubmit : () => setStep(step + 1)}
                                className="px-8 rounded-full font-bold"
                                disabled={(step === 1 && !isValidStep1) || (step === 2 && (!data.acceptedTerms || loading))}
                            >
                                {loading ? "Submitting..." : step === 2 ? "Confirm & Register" : "Review Details"} {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
