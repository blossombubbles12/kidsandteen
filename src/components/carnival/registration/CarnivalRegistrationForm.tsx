"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Dog, User, Users, Plus, Trash2, Ticket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types
type DogDetail = {
    name: string;
    breed: string;
};

type FormData = {
    name: string;
    email: string;
    phone: string;
    category: "owner" | "spectator" | "vendor" | "media";
    guestCount: number;
    dogs: DogDetail[];
    acceptedTerms: boolean;
};

export default function CarnivalRegistrationForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        category: "owner",
        guestCount: 0,
        dogs: [{ name: "", breed: "" }],
        acceptedTerms: false
    });

    const updateData = (updates: Partial<FormData>) => setFormData(prev => ({ ...prev, ...updates }));

    const addDog = () => setFormData(prev => ({ ...prev, dogs: [...prev.dogs, { name: "", breed: "" }] }));

    const removeDog = (index: number) => {
        setFormData(prev => {
            const newDogs = [...prev.dogs];
            newDogs.splice(index, 1);
            return { ...prev, dogs: newDogs };
        });
    };

    const updateDog = (index: number, field: keyof DogDetail, value: string) => {
        setFormData(prev => {
            const newDogs = [...prev.dogs];
            newDogs[index] = { ...newDogs[index], [field]: value };
            return { ...prev, dogs: newDogs };
        });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-10 px-4 flex items-center justify-center">
            <div className="w-full max-w-xl bg-background rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">

                {step < 4 && (
                    <>
                        <h1 className="text-3xl font-black text-center mb-8 uppercase tracking-tighter">
                            World Record <span className="text-orange-500">Registration</span>
                        </h1>

                        {/* Progress */}
                        <div className="flex justify-between mb-10 relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -z-10" />
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>1</div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>2</div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'}`}>3</div>
                        </div>
                    </>
                )}

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">Who's Leading the Pack?</h2>
                                <p className="text-muted-foreground">Primary Contact Information</p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => updateData({ name: e.target.value })}
                                        placeholder="Tobi Adebayo"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Email Address</label>
                                    <Input
                                        value={formData.email}
                                        onChange={(e) => updateData({ email: e.target.value })}
                                        placeholder="tobi@example.com"
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Phone Number</label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => updateData({ phone: e.target.value })}
                                        placeholder="+234..."
                                        type="tel"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">Attendance Details</h2>
                                <p className="text-muted-foreground">Help us count for the Record!</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">I am attending as a:</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {(['owner', 'spectator', 'vendor', 'media'] as const).map((cat) => (
                                            <div
                                                key={cat}
                                                className={`cursor-pointer border-2 rounded-xl p-4 text-center capitalize transition-all ${formData.category === cat
                                                    ? 'border-primary bg-primary/5 text-primary font-bold'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                                onClick={() => updateData({ category: cat })}
                                            >
                                                {cat === 'owner' ? 'Dog Owner 🐕' : cat === 'spectator' ? 'Spectator 👀' : cat}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">Additional Guests (Humans)</label>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateData({ guestCount: Math.max(0, formData.guestCount - 1) })}
                                        >
                                            -
                                        </Button>
                                        <span className="text-2xl font-bold w-12 text-center">{formData.guestCount}</span>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateData({ guestCount: formData.guestCount + 1 })}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Excluding yourself. Total Humans: {formData.guestCount + 1}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">The Stars of the Show 🌟</h2>
                                <p className="text-muted-foreground">Register each dog for the official count.</p>
                            </div>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {formData.dogs.map((dog, index) => (
                                    <div key={index} className="bg-secondary/20 p-4 rounded-xl relative group">
                                        <div className="absolute top-2 right-2">
                                            {formData.dogs.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeDog(index)}
                                                    className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-medium mb-1 block">Dog's Name</label>
                                                <Input
                                                    value={dog.name}
                                                    onChange={(e) => updateDog(index, 'name', e.target.value)}
                                                    placeholder="Zues"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium mb-1 block">Breed</label>
                                                <Input
                                                    value={dog.breed}
                                                    onChange={(e) => updateDog(index, 'breed', e.target.value)}
                                                    placeholder="German Shepherd"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full border-dashed border-2 py-6"
                                    onClick={addDog}
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Add Another Dog
                                </Button>

                                {/* Terms Acceptance */}
                                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={formData.acceptedTerms}
                                        onChange={(e) => updateData({ acceptedTerms: e.target.checked })}
                                        className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                    <label htmlFor="terms" className="text-sm text-muted-foreground">
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

                    {step === 4 && (
                        <motion.div key="step4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8 text-center py-10">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-green-700">Registration Confirmed!</h2>
                                <p className="text-muted-foreground">You are officially part of history.</p>
                            </div>

                            <div className="bg-white border-2 border-black/10 rounded-3xl p-6 max-w-sm mx-auto shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
                                <div className="absolute -left-4 top-1/2 w-8 h-8 bg-secondary/5 rounded-full" />
                                <div className="absolute -right-4 top-1/2 w-8 h-8 bg-secondary/5 rounded-full" />

                                <div className="text-left space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Event</p>
                                            <h3 className="font-black text-xl leading-tight">Lagos Dog <br />Carnival '26</h3>
                                        </div>
                                        <Ticket className="w-8 h-8 text-orange-500" />
                                    </div>

                                    <div className="border-t border-dashed border-gray-300 my-4" />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase">Date</p>
                                            <p className="font-bold">Dec 13, 2026</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase">Location</p>
                                            <p className="font-bold">TBS Lagos</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase">Humans</p>
                                            <p className="font-bold">{formData.guestCount + 1}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase">Dogs</p>
                                            <p className="font-bold">{formData.dogs.length}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 text-center">
                                        <p className="text-xs text-muted-foreground mb-1">Entry ID</p>
                                        <p className="font-mono bg-black/5 py-1 rounded tracking-widest text-lg font-bold">
                                            LDC-{Math.floor(Math.random() * 10000)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={() => window.print()} variant="outline">Print Ticket</Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {step < 4 && (
                    <div className="flex justify-between mt-10 pt-6 border-t">
                        <Button type="button" variant="ghost" disabled={step === 1} onClick={prevStep}>
                            Back
                        </Button>
                        <Button
                            type="button"
                            onClick={nextStep}
                            className="px-8 font-bold"
                            disabled={step === 3 && !formData.acceptedTerms}
                        >
                            {step === 3 ? "Complete Registration" : "Next Step"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
