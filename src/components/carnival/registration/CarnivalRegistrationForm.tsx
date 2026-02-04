"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Dog, User, Users, Plus, Trash2, Ticket, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/app/actions/carnival";
import { useToast } from "@/hooks/use-toast";
import SocialShare from "./SocialShare";


// Types
type PetDetail = {
    type: string;
    name: string;
    breed: string;
};

type FormData = {
    name: string;
    email: string;
    phone: string;
    sex: string;
    category: "owner" | "spectator";
    location: string;
    donationInterest: string;
    petType: string;
    petCount: number;
    petNames: string;
    isVaccinated: string;
    guestCount: number;
    dogs: PetDetail[]; // renamed pets in backend but kept variable name for compatibility or will update
    acceptedTerms: boolean;
};

export default function CarnivalRegistrationForm() {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [entryId, setEntryId] = useState<string>("");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        sex: "",
        category: "owner",
        location: "",
        donationInterest: "",
        petType: "Dog",
        petCount: 1,
        petNames: "",
        isVaccinated: "Yes",
        guestCount: 0,
        dogs: [{ type: "Dog", name: "", breed: "" }],
        acceptedTerms: false
    });

    const updateData = (updates: Partial<FormData>) => {
        setFormData(prev => {
            const newData = { ...prev, ...updates };
            // Auto-sync petCount if it's a dog owner and dogs are managed dynamically
            if (updates.dogs) {
                newData.petCount = updates.dogs.length;
                newData.petNames = updates.dogs.map(d => d.name).filter(Boolean).join(", ");
            }
            return newData;
        });
    };

    const addDog = () => updateData({ dogs: [...formData.dogs, { type: formData.petType || "Dog", name: "", breed: "" }] });

    const removeDog = (index: number) => {
        const newDogs = [...formData.dogs];
        newDogs.splice(index, 1);
        updateData({ dogs: newDogs });
    };

    const updateDog = (index: number, field: keyof PetDetail, value: string) => {
        const newDogs = [...formData.dogs];
        newDogs[index] = { ...newDogs[index], [field]: value };
        updateData({ dogs: newDogs });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
        if (!formData.acceptedTerms) return;

        setIsSubmitting(true);
        try {
            const res = await registerUser(formData);
            if (res.success) {
                // Use the actual DB ID if available, otherwise fallback (though DB ID should always exist on success)
                const regId = res.registrationId ? res.registrationId.toString().padStart(4, '0') : Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                setEntryId(`LDC-${regId}`);
                setStep(4);
                toast({
                    title: "Registration Successful!",
                    description: "You have successfully registered for the Lagos Dog Carnival.",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Registration Failed",
                    description: res.error || "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-10 px-4 flex items-center justify-center print:hidden">
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
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Sex</label>
                                        <select
                                            value={formData.sex}
                                            onChange={(e) => updateData({ sex: e.target.value })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">Select Sex</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-2">Details</h2>
                                    <p className="text-muted-foreground">Help us know you better!</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Attending as:</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {(['owner', 'spectator'] as const).map((cat) => (
                                                <div
                                                    key={cat}
                                                    className={`cursor-pointer border-2 rounded-xl p-4 text-center capitalize transition-all ${formData.category === cat
                                                        ? 'border-primary bg-primary/5 text-primary font-bold'
                                                        : 'border-border hover:border-primary/50'
                                                        }`}
                                                    onClick={() => updateData({ category: cat })}
                                                >
                                                    {cat === 'owner' ? 'Pet Owner 🐕' : 'Spectator 👀'}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Location</label>
                                        <Input
                                            value={formData.location}
                                            onChange={(e) => updateData({ location: e.target.value })}
                                            placeholder="e.g. Lagos Island, Ikeja..."
                                        />
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

                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Would you like to donate towards the Record attempt?</label>
                                        <div className="flex gap-4">
                                            {['Yes', 'No', 'Maybe later'].map((opt) => (
                                                <Button
                                                    key={opt}
                                                    type="button"
                                                    variant={formData.donationInterest === opt ? "default" : "outline"}
                                                    onClick={() => updateData({ donationInterest: opt })}
                                                    className="flex-1"
                                                >
                                                    {opt}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {formData.category === 'spectator' && (
                                        <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-xl border border-border">
                                            <input
                                                type="checkbox"
                                                id="terms-spectator"
                                                checked={formData.acceptedTerms}
                                                onChange={(e) => updateData({ acceptedTerms: e.target.checked })}
                                                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                            />
                                            <label htmlFor="terms-spectator" className="text-sm text-muted-foreground">
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
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-2">Pet Details 🐾</h2>
                                    <p className="text-muted-foreground">Tell us about your companions.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Default Pet Type</label>
                                            <select
                                                value={formData.petType}
                                                onChange={(e) => {
                                                    const newType = e.target.value;
                                                    updateData({ petType: newType });
                                                }}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="Dog">Dog 🐕</option>
                                                <option value="Cat">Cat 🐱</option>
                                                <option value="Bird">Bird 🦜</option>
                                                <option value="Rabbit">Rabbit 🐰</option>
                                                <option value="Hamster">Hamster 🐹</option>
                                                <option value="Lizard">Lizard 🦎</option>
                                                <option value="Turtle">Turtle 🐢</option>
                                                <option value="Fish">Fish 🐠</option>
                                                <option value="Snake">Snake 🐍</option>
                                                <option value="Horse">Horse 🐎</option>
                                                <option value="Monkey">Monkey 🐒</option>
                                                <option value="Other">Other ✨</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Quick Add</label>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full h-10 font-bold border-dashed"
                                                onClick={addDog}
                                            >
                                                <Plus className="w-4 h-4 mr-2" /> Add {formData.petType}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold flex items-center gap-2 text-primary">
                                            <Dog className="w-4 h-4" /> Your Registered Pets ({formData.dogs.length})
                                        </label>
                                        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                            {formData.dogs.map((pet, index) => (
                                                <div key={index} className="bg-secondary/5 p-4 rounded-2xl border border-border relative group transition-all hover:border-primary/20">
                                                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/50">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 bg-primary text-white text-[10px] font-black rounded-lg flex items-center justify-center">
                                                                {index + 1}
                                                            </div>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pet Participant</span>
                                                        </div>
                                                        {formData.dogs.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); removeDog(index); }}
                                                                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                                <span className="text-[10px] font-bold uppercase">Remove</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] uppercase font-black text-muted-foreground/60 block px-1">Type</label>
                                                            <select
                                                                value={pet.type}
                                                                onChange={(e) => updateDog(index, 'type', e.target.value)}
                                                                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                                                            >
                                                                <option value="Dog">Dog</option>
                                                                <option value="Cat">Cat</option>
                                                                <option value="Bird">Bird</option>
                                                                <option value="Rabbit">Rabbit</option>
                                                                <option value="Hamster">Hamster</option>
                                                                <option value="Lizard">Lizard</option>
                                                                <option value="Turtle">Turtle</option>
                                                                <option value="Fish">Fish</option>
                                                                <option value="Snake">Snake</option>
                                                                <option value="Horse">Horse</option>
                                                                <option value="Monkey">Monkey</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] uppercase font-black text-muted-foreground/60 block px-1">Name</label>
                                                            <Input
                                                                value={pet.name}
                                                                onChange={(e) => updateDog(index, 'name', e.target.value)}
                                                                placeholder="e.g. Max"
                                                                className="h-10 rounded-xl bg-background border-input focus:ring-primary/20"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10px] uppercase font-black text-muted-foreground/60 block px-1">Breed/Desc</label>
                                                            <Input
                                                                value={pet.breed}
                                                                onChange={(e) => updateDog(index, 'breed', e.target.value)}
                                                                placeholder="e.g. Golden"
                                                                className="h-10 rounded-xl bg-background border-input focus:ring-primary/20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium mb-1 block">State if the pet is duly vaccinated?</label>
                                        <div className="flex gap-4">
                                            {['Yes', 'No', 'Partially'].map((opt) => (
                                                <Button
                                                    key={opt}
                                                    type="button"
                                                    variant={formData.isVaccinated === opt ? "default" : "outline"}
                                                    onClick={() => updateData({ isVaccinated: opt })}
                                                    className="flex-1"
                                                >
                                                    {opt}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

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
                        )
                        }
                        {step === 4 && (
                            <motion.div key="step4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8 text-center py-10">
                                <div className="space-y-4">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-green-700 font-black tracking-tight">Registration Confirmed!</h2>
                                        <p className="text-muted-foreground">You are officially part of history.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <TicketCard formData={formData} entryId={entryId} />

                                    <div className="flex flex-col gap-3">
                                        <Button onClick={() => window.print()} variant="outline" className="w-full py-6 font-bold border-2 rounded-2xl hover:bg-secondary/5 transition-all">
                                            Print My Ticket
                                        </Button>

                                        <div className="border-t border-dashed my-6" />

                                        <SocialShare
                                            title="I just registered for the Lagos Dog Carnival 2026! 🐾"
                                            description="I'm officially part of the World Record attempt! Join me and let's make history together."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {step < 4 && (
                        <div className="mt-10">
                            <div className="flex justify-between pt-6 border-t mb-8">
                                <Button type="button" variant="ghost" disabled={step === 1} onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={(step === 3 || (step === 2 && formData.category === 'spectator')) ? handleSubmit : nextStep}
                                    className="px-8 font-bold rounded-xl"
                                    disabled={
                                        ((step === 3 || (step === 2 && formData.category === 'spectator')) && !formData.acceptedTerms) || isSubmitting
                                    }
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Registering...</>
                                    ) : (
                                        (step === 3 || (step === 2 && formData.category === 'spectator')) ? "Complete Registration" : "Next Step"
                                    )}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-full">
                                        <Users className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-wider text-orange-900 leading-none mb-0.5">Invite a friend!</p>
                                        <p className="text-[10px] text-orange-700/70 leading-none">Help us break the record together.</p>
                                    </div>
                                </div>
                                <SocialShare variant="compact" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {step === 4 && (
                <div className="hidden print:flex print:fixed print:inset-0 print:bg-white print:items-center print:justify-center print:z-[9999]">
                    <div className="transform scale-125">
                        <TicketCard formData={formData} entryId={entryId} />
                    </div>
                </div>
            )}

        </>
    );
}

function TicketCard({ formData, entryId }: { formData: FormData; entryId: string }) {
    return (
        <div className="bg-white border-2 border-black/10 rounded-3xl p-6 max-w-sm mx-auto shadow-xl relative overflow-hidden break-inside-avoid">
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
                        <p className="font-bold truncate">{formData.location || "TBS Lagos"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">Owner</p>
                        <p className="font-bold truncate">{formData.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">Humans</p>
                        <p className="font-bold">{1 + (formData.guestCount || 0)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">Pets</p>
                        <p className="font-bold">{formData.petCount}</p>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-xs text-muted-foreground uppercase">Registered Pets</p>
                    <div className="space-y-1">
                        {formData.dogs.map((pet, i) => (
                            <p key={i} className="font-bold text-sm">
                                {pet.name || 'Unnamed'} ({pet.type}{pet.breed ? ` - ${pet.breed}` : ''})
                            </p>
                        ))}
                    </div>
                </div>

                <div className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Entry ID</p>
                    <p className="font-mono bg-black/5 py-1 rounded tracking-widest text-lg font-bold">
                        {entryId}
                    </p>
                </div>
            </div>
        </div>
    );
}

