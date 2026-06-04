import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getFolderImages } from "@/app/actions/media";

const programs = [
    {
        title: "Public Speaking",
        href: "/programs/public-speaking",
        tagline: "The future is speaking… and it's powerful.",
        description: "We raise confident voices, bold thinkers, and inspiring speakers through structured training and real-stage exposure.",
        image: "/kidspublicspeaking.jpeg",
        color: "#e50a1e",
        tag: "Communication"
    },
    {
        title: "Financial Literacy",
        href: "/programs/financial-literacy",
        tagline: "Building smart money habits for life.",
        description: "Teaching kids and teens how money works — earning, saving, budgeting, and making smart financial decisions early.",
        image: "/kidsfinancialliteracy.jpeg",
        color: "#545454",
        tag: "Money Skills"
    },
    {
        title: "Boardroom Leadership",
        href: "/programs/boardroom-leadership",
        tagline: "The boardroom is no longer just for adults.",
        description: "Grooming young minds to think, speak, and lead with confidence in professional environments.",
        image: "/kidsboardroomleadership.jpeg",
        color: "#e50a1e",
        tag: "Professional"
    },
    {
        title: "Youth Leadership",
        href: "/programs/leadership",
        tagline: "Leadership they can start building today.",
        description: "Building confidence, clarity, and courage to express ideas, make decisions, and take positive initiative.",
        image: "/kidsteenleadership.jpeg",
        color: "#545454",
        tag: "Leadership"
    },
    {
        title: "Kids + AI",
        href: "/programs/artificial-intelligence",
        tagline: "Learning and growing with technology.",
        description: "Teaching kids how AI works and how to use it creatively, responsibly, and safely for the future.",
        image: "/kidsartificialintelligence.jpeg",
        color: "#e50a1e",
        tag: "Technology"
    },
];

export default async function ProgramsPage() {
    const sliderImages = await getFolderImages("ktuafrica/sliders", 6);
    const heroBg = sliderImages.length > 0 ? sliderImages[0].secure_url : '';

    return (
        <div className="min-h-screen bg-[#faf8f5]">
            <style>{`
                @keyframes crossfade {
                    0%, 20% { opacity: 1; }
                    25%, 100% { opacity: 0; }
                }
            `}</style>
            {/* Hero */}
            <section className="relative py-28 md:py-36 overflow-hidden bg-[#1a1a1a] text-white">
                {sliderImages.length > 0 && sliderImages.slice(0, 4).map((img: any, i: number) => (
                    <div
                        key={img.public_id || i}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('${img.secure_url}')`,
                            animation: `crossfade ${sliderImages.length * 5}s infinite`,
                            animationDelay: `${i * 5}s`,
                        }}
                    />
                ))}
                {sliderImages.length === 0 && heroBg && (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroBg}')` }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e50a1e]/20 via-[#1a1a1a]/90 to-[#1a1a1a]" />
                <div className="container px-4 md:px-6 relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#e50a1e]/20 border border-[#e50a1e]/30 text-sm font-semibold mb-4 text-white">
                        <Sparkles className="w-4 h-4" /> KTU Programs
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        Four Programs.<br />One <span className="text-[#e50a1e]">Big Future</span>.
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-semibold leading-relaxed">
                        Every child is born with a gift. We give them the stage, the skills, and the confidence to turn it into something extraordinary.
                    </p>
                </div>
            </section>

            {/* Intro Content */}
            <section className="py-24 md:py-32 container px-4 md:px-6 max-w-5xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e50a1e]/10 text-[#e50a1e] border border-[#e50a1e]/20 text-sm font-black mb-4">
                         DESIGNED FOR IMPACT
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
                        Real Skills. Real Confidence.<br />Real <span className="text-[#e50a1e]">Results</span>.
                    </h2>
                    <p className="text-lg text-[#545454] font-semibold leading-relaxed mb-6">
                        At KTU, we believe every child is born with unique gifts waiting to be unlocked. Our four flagship programs are designed to meet children exactly where they are — and take them further than they ever imagined.
                    </p>
                    <p className="text-base text-[#545454] leading-relaxed">
                        Whether your child dreams of commanding a stage, running a business, leading a team, or making smart financial decisions, we have a program that turns that dream into a skillset. Each program is age-appropriate, hands-on, and built around real-world application — because the best classroom is the real world.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-center">
                    {[
                        { icon: "", title: "Age-Smart Design", desc: "Every program is tailored for two tracks — Kids (6–12) and Teens (13–18) — so content always fits." },
                        { icon: "", title: "Mentor-Led", desc: "Real entrepreneurs, speakers, and leaders guide every session. No theory without practice." },
                        { icon: "", title: "Stage-Ready", desc: "From day one, children are preparing for real audiences, real pitches, and real impact." },
                    ].map((item) => (
                        <div key={item.title} className="bg-white p-6 rounded-2xl border-2 border-[#e5e0db] hover:shadow-lg transition-all">
                            <div className="text-3xl mb-3">{item.icon}</div>
                            <h3 className="font-black text-[#1a1a1a] mb-2">{item.title}</h3>
                            <p className="text-sm text-[#545454] font-semibold">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Program Cards */}
            <section className="py-24 container px-4 md:px-6 -mt-16 relative z-20">
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {programs.map((p) => (
                        <Link key={p.href} href={p.href} className="group block">
                            <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-[#e5e0db] bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                                {/* Featured Image */}
                                <div className="relative h-56 md:h-64 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                        style={{ backgroundImage: `url('${p.image}'), linear-gradient(135deg, #faf8f5, #e5e0db)` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-black uppercase tracking-wider text-white">
                                            {p.tag}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-6 right-6">
                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{p.title}</h3>
                                        <p className="text-sm text-white/80 font-semibold">{p.tagline}</p>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-sm text-[#545454] font-semibold leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                                    <span className="inline-flex items-center gap-1 text-sm font-black uppercase tracking-wide text-[#e50a1e] group-hover:gap-2 transition-all">
                                        Explore Program <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white">
                <div className="container px-4 md:px-6 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1a1a]/10 text-[#1a1a1a] border border-[#1a1a1a]/20 text-sm font-black mb-4">
                             THE KTU METHOD
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">How We Build Young Leaders</h2>
                        <p className="text-lg text-[#545454] font-semibold max-w-2xl mx-auto">
                            Our programs follow a proven four-stage framework that takes children from curious beginners to confident leaders.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Discover", desc: "We uncover each child's unique strengths, interests, and natural talents through engaging assessments." },
                            { step: "02", title: "Learn", desc: "Hands-on workshops and real-world projects build skills that textbooks can't teach." },
                            { step: "03", title: "Practice", desc: "Safe, guided environments where kids apply what they've learned — and make mistakes that become lessons." },
                            { step: "04", title: "Lead", desc: "Real stages, real audiences, real impact. Confidence becomes second nature." },
                        ].map((item) => (
                            <div key={item.step} className="text-center group">
                                <div className="w-16 h-16 rounded-2xl bg-[#e50a1e]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl font-black text-[#e50a1e]">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-black text-[#1a1a1a] mb-2">{item.title}</h3>
                                <p className="text-sm text-[#545454] font-semibold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-[#1a1a1a] text-white">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                        {[
                            { num: "5", label: "Specialized Programs" },
                            { num: "2", label: "Age Tracks" },
                            { num: "100%", label: "Practical Learning" },
                            { num: "1", label: "Big Mission" },
                        ].map((s) => (
                            <div key={s.label}>
                                <div className="text-4xl md:text-5xl font-black text-[#e50a1e] mb-2">{s.num}</div>
                                <div className="text-sm text-white/70 font-semibold">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#e50a1e] to-[#cc0000] text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                <div className="container px-4 md:px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Not Sure Where Your Child Fits?
                    </h2>
                    <p className="text-lg text-white/80 font-semibold mb-4 max-w-2xl mx-auto">
                        Every child is unique. Tell us about them and we&apos;ll recommend the perfect program — at no cost.
                    </p>
                    <p className="text-base text-white/60 mb-10 max-w-xl mx-auto">
                        Free consultation · No commitment · Personalized recommendation
                    </p>
                    <Link href="/contact">
                        <span className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-black text-base uppercase tracking-wide bg-white text-[#e50a1e] hover:scale-105 transition-all shadow-xl">
                            Get a Free Recommendation <ArrowRight className="w-5 h-5" />
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
