import { Metadata } from "next";
import Link from "next/link";
import { Cpu, ArrowRight, Sparkles, Quote, Palette, ShieldCheck } from "lucide-react";
import { getFolderImages } from "@/app/actions/media";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Kids + AI Program | Kids and Teens University (KTU)",
    description: "Teaching kids how AI works and how to use it creatively, responsibly, and safely for the future.",
};

export const dynamic = 'force-dynamic';

export default async function ArtificialIntelligencePage() {
    const [uploadImages, sliderImages] = await Promise.all([
        getFolderImages("ktuafrica/uploads", 8),
        getFolderImages("ktuafrica/sliders", 6),
    ]);
    const heroBg = sliderImages.length > 0
        ? sliderImages[0].secure_url
        : uploadImages.length > 0
            ? uploadImages[0].secure_url
            : '';

    return (
        <div className="min-h-screen bg-[#faf8f5]">
            {/* Hero */}
            <section className="relative py-28 md:py-36 overflow-hidden text-white">
                <div className="absolute inset-0 z-0">
                    {heroBg ? (
                        <Image src={heroBg} alt="" fill className="object-cover" priority sizes="100vw" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#000]" />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 to-[#1a1a1a] z-10" />
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-sm font-semibold mb-4">
                            <Cpu className="w-4 h-4" /> Program
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
                            Kids + <span className="text-[#e50a1e]">AI</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-bold text-white/90 leading-relaxed">
                            Learning and growing <span className="text-[#e50a1e]">with technology</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 container px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-[#545454] font-semibold leading-relaxed mb-12">
                        AI (Artificial Intelligence) is becoming a big part of everyday life, and kids today are growing up in a world where technology is smarter than ever. Learning about AI early can help children understand how it works and how to use it in positive, creative, and safe ways.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: Cpu, title: "Understand AI", desc: "Kids learn what AI is, how it thinks, and where it shows up in their daily lives." },
                            { icon: Palette, title: "Creative with AI", desc: "Use AI tools for art, music, storytelling, and bringing big ideas to life." },
                            { icon: ShieldCheck, title: "Responsible Use", desc: "Learn the ethics of AI — privacy, bias, and how to use technology wisely." },
                        ].map((item) => (
                            <div key={item.title} className="bg-white p-6 rounded-2xl border-2 border-[#e5e0db] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-xl bg-[#e50a1e]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6 text-[#e50a1e]" />
                                </div>
                                <h3 className="font-black text-[#1a1a1a] mb-2">{item.title}</h3>
                                <p className="text-sm text-[#545454] font-semibold">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Content Block */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border-2 border-[#e50a1e]/20 shadow-sm">
                        <p className="text-lg text-[#545454] font-semibold leading-relaxed mb-6">
                            When kids learn about AI, they don&apos;t just use technology&mdash;they begin to understand it. This can help them build important skills like problem-solving, creativity, and critical thinking. AI can also support learning by making lessons more interactive, personal, and fun.
                        </p>
                        <p className="text-lg text-[#545454] font-semibold leading-relaxed mb-6">
                            Programs like Kids and Teens University help young learners explore AI in a simple way, showing them how it can be used for studying, creativity, communication, and even future careers.
                        </p>
                        <div className="relative p-6 md:p-8 bg-gradient-to-br from-[#e50a1e]/5 to-[#cc0000]/5 rounded-2xl border border-[#e50a1e]/15 text-center">
                            <Quote className="w-8 h-8 text-[#e50a1e]/30 absolute top-4 left-4" />
                            <p className="text-xl md:text-2xl font-black text-[#e50a1e] relative z-10">The goal is not to depend on AI&hellip; but to work with it wisely.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cloudinary Gallery */}
            {uploadImages.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12">
                            <span className="badge-fun bg-[#e50a1e]/10 text-[#e50a1e] border border-[#e50a1e]/20 mb-4"> IN ACTION</span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a]">Our Innovators in Action</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
                            {uploadImages.map((img: any, i: number) => (
                                <div key={img.public_id || i} className="relative aspect-square rounded-2xl overflow-hidden group cursor-default">
                                    <Image src={img.secure_url} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#e50a1e] to-[#cc0000] text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                <div className="container px-4 md:px-6 text-center relative z-10">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <Cpu className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to Explore AI?</h2>
                        <p className="text-lg text-white/80 font-semibold mb-8">Give your child the skills to understand, create, and lead with technology.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/membership">
                                <span className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base uppercase tracking-wide bg-white text-[#e50a1e] hover:scale-105 transition-all shadow-xl">
                                    Join KTU Today <Sparkles className="w-5 h-5" />
                                </span>
                            </Link>
                            <Link href="/contact">
                                <span className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base uppercase tracking-wide border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all">
                                    Talk to Us <ArrowRight className="w-5 h-5" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
