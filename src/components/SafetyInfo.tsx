"use client";

import { ShieldCheck, Users, AlertTriangle } from "lucide-react";

export function SafetyInfo() {
    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <div className="bg-orange-50 border border-orange-200 rounded-3xl p-8 md:p-12">
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                            <ShieldCheck className="w-8 h-8 text-orange-600" />
                            Safety First
                        </h2>
                        <p className="text-lg opacity-90">
                            Your safety is our top priority. We enforce strict protocols at all KTU events to ensure a secure and enjoyable experience for everyone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-orange-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Supervised Events</h3>
                                <p className="text-muted-foreground">
                                    All KTU events are staffed with trained supervisors and first-aid responders to ensure a safe environment for every participant.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Code of Conduct</h3>
                                <p className="text-muted-foreground">
                                    All participants and guardians must follow our code of conduct. Respectful behavior is expected at all KTU programs and events.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
