import { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HeroSlider } from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RotatingWord } from "@/components/RotatingWord";

export const dynamic = 'force-dynamic';
import Image from "next/image";
import { FAQSection } from "@/components/faq/FAQSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { getFolderImages } from "@/app/actions/media";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Target,
  Store,
  Coins,
  Crown,
  Microscope,
  Rocket,
  TrendingUp,
  Briefcase,
  FlaskConical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home | Kids and Teens University (KTU) - Building Africa's Next Generation of CEOs",
  description: "Where kids and teens learn to run businesses, master investments, and shape the future. Empowering ages 6-18 with entrepreneurship, financial literacy, and leadership skills.",
  openGraph: {
    title: "Kids and Teens University (KTU) - Building Africa's Next Generation of CEOs",
    description: "Where kids and teens learn to run businesses, master investments, and shape the future.",
    url: "https://ktuafrica.org",
    siteName: "Kids and Teens University",
       images: [
         {
           url: "https://res.cloudinary.com/dtw0ajpwa/image/upload/v1768756809/ktu_hero_2026_v2.jpg",
           width: 1200,
           height: 630,
           alt: "Kids and Teens University",
         },
       ],
    locale: "en_NG",
    type: "website",
  },
   twitter: {
     card: "summary_large_image",
     title: "Kids and Teens University (KTU) - Building Africa's Next Generation of CEOs",
     description: "Where kids and teens learn to run businesses, master investments, and shape the future.",
     images: ["https://res.cloudinary.com/dtw0ajpwa/image/upload/v1768756809/ktu_hero_2026_v2.jpg"],
   },
};

function SectionLabel({ emoji, text, color = "bg-[#e50a1e]/10 text-[#e50a1e]" }: { emoji: string; text: string; color?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${color} px-5 py-2 rounded-full text-sm font-black mb-5 border border-current/20 shadow-sm`}>
      <span>{emoji}</span>
      {text}
    </div>
  );
}

export default async function Home() {
  let [sliderImages, uploadImages] = await Promise.all([
    getFolderImages("ktuafrica/sliders", 6),
    getFolderImages("ktuafrica/uploads", 8),
  ]);
  if (uploadImages.length === 0) {
    const fallback = await getFolderImages("ktuafrica", 8);
    uploadImages = fallback;
  }
  const cloudinarySlides = sliderImages.map((r: any) => ({ url: r.secure_url }));
  const hasSlides = sliderImages.length > 0;
  const hasUploads = uploadImages.length > 0;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
  <HeroSlider cloudinarySlides={hasSlides ? cloudinarySlides : undefined} />
  <Hero uploadImages={uploadImages} />

  {/* ===== UPLOADS GALLERY ===== */}
      {hasUploads && (
        <section className="py-24 relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

          <div className="container mx-auto px-4 md:px-6 relative z-20">
            <div className="text-center mb-14">
              <SectionLabel emoji="" text="Real Moments" color="bg-white/10 text-white border-white/20" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Life at <span className="text-[#e50a1e]">KTU</span> 
              </h2>
              <p className="text-lg text-white/70 font-semibold max-w-xl mx-auto">
                Real moments from our programs, events, and community — straight from the KTU family.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
              {uploadImages.slice(0, 8).map((img: any, i: number) => (
                <div
                  key={img.public_id || i}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-[#e50a1e]/10 transition-all duration-500 hover:-translate-y-1"
                >
                  <Image
                    src={img.secure_url}
                    alt={img.context?.alt || `KTU moment ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center text-[10px] font-black text-white border border-white/20">
                      KTU
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#e50a1e]/20 to-transparent rounded-tl-2xl" />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/media">
                <Button
                  size="lg"
                  className="font-black px-8 rounded-2xl bg-white/10 backdrop-blur border-2 border-white/20 text-white hover:bg-white/20 hover:text-white"
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  View Full Gallery
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

  {/* ===== OUR PROGRAMS ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-[#faf8f5] via-white to-[#faf8f5]">
        <div className="blob-bg w-[500px] h-[500px] bg-[#e50a1e]/5 -top-40 -right-40 absolute pointer-events-none" />
        <div className="blob-bg w-[400px] h-[400px] bg-[#545454]/5 -bottom-40 -left-40 absolute pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <SectionLabel emoji="" text="Our Programs" color="bg-[#e50a1e]/10 text-[#e50a1e]" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-[#1a1a1a] leading-tight">
              Explore Our <span className="text-[#e50a1e]">Programs</span> 
            </h2>
            <p className="text-lg text-[#545454] font-semibold leading-relaxed">
              Five specialized tracks designed to build confidence, skills, and real-world experience.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
            {[
              { title: "Public Speaking", href: "/programs/public-speaking", tagline: "Voice, confidence & stage exposure", image: "/kidspublicspeaking.jpeg", desc: "We raise confident voices, bold thinkers, and inspiring speakers.", tag: "Communication" },
              { title: "Financial Literacy", href: "/programs/financial-literacy", tagline: "Money skills & smart habits", image: "/kidsfinancialliteracy.jpeg", desc: "Teaching how money works — earning, saving, budgeting, and investing.", tag: "Money Skills" },
              { title: "Boardroom Leadership", href: "/programs/boardroom-leadership", tagline: "Professional mindset & collaboration", image: "/kidsboardroomleadership.jpeg", desc: "Grooming young minds to think, speak, and lead in professional settings.", tag: "Professional" },
              { title: "Youth Leadership", href: "/programs/leadership", tagline: "Confidence, decisions & teamwork", image: "/kidsteenleadership.jpeg", desc: "Building courage to express ideas, make decisions, and lead with purpose.", tag: "Leadership" },
              { title: "Kids + AI", href: "/programs/artificial-intelligence", tagline: "Learning and growing with technology", image: "/kidsartificialintelligence.jpeg", desc: "Teaching kids how AI works and how to use it creatively, responsibly, and safely.", tag: "Technology" },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="group block">
                <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-[#e5e0db] bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-52 md:h-60 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('${p.image}'), linear-gradient(135deg, #faf8f5, #e5e0db)` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-[#1a1a1a]/10 to-transparent" />
                    <div className="absolute top-4 left-5">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-[11px] font-black uppercase tracking-wider text-white">
                        {p.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{p.title}</h3>
                      <p className="text-sm text-white/80 font-semibold">{p.tagline}</p>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <p className="text-sm text-[#545454] font-semibold leading-relaxed mb-4 line-clamp-2">{p.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-[#e50a1e] group-hover:gap-3 transition-all">
                      Explore Program <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/programs">
              <Button variant="outline" size="lg" className="font-black text-sm uppercase tracking-wide rounded-2xl border-2 border-[#e50a1e]/30 text-[#e50a1e] hover:bg-[#e50a1e] hover:text-white px-8 py-6 transition-all">
                View All Programs <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

  {/* ===== PROGRAMS ===== */}
      <section className="py-24 relative overflow-hidden bg-[#faf8f5]">
        <div className="blob-bg w-96 h-96 bg-[#e50a1e]/8 -top-24 -right-24 absolute pointer-events-none" />
        <div className="blob-bg w-72 h-72 bg-[#545454]/8 bottom-0 -left-16 absolute pointer-events-none" style={{ animationDelay: "3s" }} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel emoji="" text="Our Programs" />
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-[#1a1a1a] leading-tight">
              Two Tracks,{" "}
              <span className="squiggle gradient-text">One Mission</span>
            </h2>
            <p className="text-lg text-[#545454] font-semibold leading-relaxed">
              At KTU, education goes beyond classrooms. We empower children (6–12) and teens (13–18)
              to launch businesses, manage investments, and lead with confidence. 
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Kids Card */}
            <div className="group relative bg-white rounded-[2rem] p-8 md:p-10 border-2 border-[#e5e0db] shadow-lg shadow-[#e50a1e]/5 hover:shadow-xl hover:shadow-[#e50a1e]/10 hover:-translate-y-2 hover:rotate-[-0.5deg] transition-all duration-300 overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#e50a1e]/8 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#545454]/10 rounded-full" />

              <div className="relative">
                <div className="w-[72px] h-[72px] bg-gradient-to-br from-[#e50a1e]/15 to-[#cc0000]/15 rounded-[1.2rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-[#e50a1e]" />
                </div>
                <h3 className="text-2xl font-black mb-1 text-[#1a1a1a]">
                  For Kids <span className="text-[#e50a1e]">(6–12)</span>
                </h3>
                <p className="text-[#888888] text-sm mb-6 font-semibold">The Little Boss Track</p>

                <ul className="space-y-3 mb-8">
                  {[
                    { icon: Store, title: "Mini-Business Ventures", desc: "lemonade stands, crafts, toy businesses" },
                    { icon: Coins, title: "Financial Literacy Games", desc: "play-money tokens, saving, investing basics" },
                    { icon: Crown, title: "Leadership & Character", desc: "confidence, teamwork, etiquette" },
                    { icon: Microscope, title: "STEM Explorers", desc: "robotics, coding, science fairs" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <item.icon className="w-5 h-5 mt-0.5 text-[#e50a1e] shrink-0" />
                      <div>
                        <span className="font-bold text-[#1a1a1a] text-sm">{item.title}</span>
                        <span className="text-[#888888] text-sm"> — {item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/membership">
                  <Button size="lg" className="btn-bounce w-full bg-gradient-to-r from-[#e50a1e] to-[#cc0000] hover:from-[#cc0000] hover:to-[#aa0000] text-white font-black rounded-2xl border-2 border-[#e50a1e]/50 shadow-md">
                    Join Kids Program <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Teens Card */}
            <div className="group relative bg-white rounded-[2rem] p-8 md:p-10 border-2 border-[#e5e0db] shadow-lg shadow-[#545454]/8 hover:shadow-xl hover:shadow-[#545454]/15 hover:-translate-y-2 hover:rotate-[0.5deg] transition-all duration-300 overflow-hidden">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#545454]/10 rounded-full" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#e50a1e]/8 rounded-full" />

              <div className="relative">
                <div className="w-[72px] h-[72px] bg-gradient-to-br from-[#545454]/20 to-[#888888]/15 rounded-[1.2rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <Target className="w-8 h-8 text-[#545454]" />
                </div>
                <h3 className="text-2xl font-black mb-1 text-[#1a1a1a]">
                  For Teens <span className="text-[#545454]">(13–18)</span>
                </h3>
                <p className="text-[#888888] text-sm mb-6 font-semibold">The Young CEO Track</p>

                <ul className="space-y-3 mb-8">
                  {[
                    { icon: Rocket, title: "Startup Incubation", desc: "fashion lines, apps, online stores" },
                    { icon: TrendingUp, title: "Investment Clubs", desc: "stock market, crypto simulations, budgeting" },
                    { icon: Briefcase, title: "Career Readiness", desc: "internships, CV building, global exchange" },
                    { icon: FlaskConical, title: "Innovation Labs", desc: "hackathons, prototyping, invention fairs" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <item.icon className="w-5 h-5 mt-0.5 text-[#545454] shrink-0" />
                      <div>
                        <span className="font-bold text-[#1a1a1a] text-sm">{item.title}</span>
                        <span className="text-[#888888] text-sm"> — {item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/membership">
                  <Button size="lg" className="btn-bounce w-full bg-gradient-to-r from-[#1a1a1a] to-[#000000] hover:from-[#000000] hover:to-[#1a1a1a] text-white font-black rounded-2xl border-2 border-[#333333]/50 shadow-md">
                    Join Teens Program <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLAGSHIP EVENTS ===== */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#f5f0eb] via-[#faf8f5] to-[#ffffff]">
        <div className="blob-bg w-80 h-80 bg-[#e50a1e]/8 top-0 left-0 absolute pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel emoji="" text="Signature Activities" color="bg-[#545454]/10 text-[#545454]" />
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#1a1a1a]">
              Flagship Events 
            </h2>
            <p className="text-lg text-[#545454] font-semibold">
              Where theory meets practice. Our students compete, pitch, and lead on real stages!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "KTU Shark Tank", desc: "Pitch businesses to real investors and win funding." },
              { title: "Investment Challenge", desc: "Manage portfolios and master wealth-building strategies." },
              { title: "Global Teens Forum", desc: "Debate world issues with peers from across the continent." },
              { title: "Kidspreneur Fair", desc: "Kids showcase and sell their mini-business products." },
            ].map((item, i) => {
              const img = uploadImages?.[i % uploadImages.length];
              return (
                <div
                  key={i}
                  className="group relative bg-white rounded-[2rem] border-2 border-[#e5e0db] hover:shadow-xl hover:-translate-y-3 hover:rotate-1 transition-all duration-300 text-center cursor-pointer overflow-hidden"
                >
                  {img && (
                    <Image
                      src={img.secure_url}
                      alt={item.title}
                      fill
                      className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/60 to-[#1a1a1a]/40" />
                  <div className="relative z-10 p-8 flex flex-col items-center justify-center min-h-[200px]">
                    <h3 className="text-lg font-black mb-3 text-white">{item.title}</h3>
                    <p className="text-white/70 text-sm font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CLUBS & SOCIETIES ===== */}
      <section className="py-24 relative overflow-hidden bg-[#faf8f5]">
        <div className="blob-bg w-96 h-96 bg-[#e50a1e]/5 -bottom-20 -right-20 absolute pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <SectionLabel emoji="" text="Clubs & Societies" color="bg-[#545454]/10 text-[#545454]" />
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#1a1a1a] leading-tight">
                Find Your{" "}
                <RotatingWord />
              </h2>
              <p className="text-lg text-[#545454] mb-8 font-semibold leading-relaxed">
                Every student belongs to a community of like-minded peers. From STEM clubs to
                entrepreneurship societies, there's a place for every passion and personality!
              </p>

              <div className="space-y-4">
                {[
                  {
                    emoji: "",
                    bg: "bg-gradient-to-br from-[#e50a1e]/10 to-[#cc0000]/10",
                    border: "border-[#e50a1e]/20",
                    title: "Kidpreneur Clubs (Ages 6–12)",
                    desc: "Mini-business ventures, language clubs, STEM clubs",
                  },
                  {
                    emoji: "",
                    bg: "bg-gradient-to-br from-[#545454]/10 to-[#888888]/10",
                    border: "border-[#545454]/20",
                    title: "Entrepreneurship Societies (Ages 13–18)",
                    desc: "Finance clubs, global leadership societies, innovation labs",
                  },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 ${item.bg} p-5 rounded-2xl border-2 ${item.border} hover:scale-[1.02] transition-transform duration-200 cursor-pointer group`}>
                    <div className="text-3xl group-hover:animate-wiggle">{item.emoji}</div>
                    <div>
                      <h4 className="font-black text-[#1a1a1a]">{item.title}</h4>
                      <p className="text-sm text-[#888888] font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/5]">
              <Image
                src="https://res.cloudinary.com/dtw0ajpwa/image/upload/v1780563233/kidteentedtalk_d5ohrw.jpg"
                alt="KTU students in discussion"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { num: "500+", label: "Active Members", emoji: "🏽", color: "#e50a1e" },
              { num: "12+", label: "Clubs & Societies", emoji: "", color: "#545454" },
              { num: "50+", label: "Startups Launched", emoji: "", color: "#888888" },
              { num: "∞", label: "Opportunities", emoji: "", color: "#e50a1e" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#faf8f5] p-5 md:p-6 rounded-2xl border-2 border-[#e5e0db] shadow-sm text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="text-2xl md:text-3xl mb-1 group-hover:animate-bounce-gentle">{stat.emoji}</div>
                <p className="text-2xl md:text-3xl font-black mb-1" style={{ color: stat.color }}>
                  {stat.num}
                </p>
                <p className="text-xs md:text-sm text-[#545454] font-bold uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REAL-WORLD INTEGRATION ===== */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#f5f0eb] via-[#faf8f5] to-[#ffffff]">
        <div className="blob-bg w-80 h-80 bg-[#545454]/8 top-10 right-10 absolute pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel emoji="" text="Real-World Integration" color="bg-[#545454]/10 text-[#545454]" />
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#1a1a1a]">
              Beyond the Classroom 
            </h2>
            <p className="text-lg text-[#545454] font-semibold">
              Every student graduates with proof of ventures, investments, and leadership experience!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { emoji: "", title: "Running Businesses", desc: "Kids run simple ventures; teens launch startups with real products and revenue.", color: "border-[#e50a1e]/25 hover:shadow-[#e50a1e]/10" },
              { emoji: "", title: "Investment Mastery", desc: "Stock market simulations, crypto basics, savings clubs, and wealth-building strategies.", color: "border-[#545454]/25 hover:shadow-[#545454]/10" },
              { emoji: "", title: "Financial Intelligence", desc: "Budgeting, entrepreneurial finance, and smart money habits for life.", color: "border-[#e50a1e]/25 hover:shadow-[#e50a1e]/10" },
              { emoji: "", title: "Industry Partnerships", desc: "Internships with banks, tech hubs, and NGOs for real-world exposure.", color: "border-[#545454]/25 hover:shadow-[#545454]/10" },
              { emoji: "", title: "Digital Portfolios", desc: "Every student graduates with proof of ventures, investments, and leadership.", color: "border-[#888888]/25 hover:shadow-[#545454]/10" },
              { emoji: "", title: "Annual Events", desc: "Innovation Expo, Global Teens Forum, Kidspreneur Fair — our calendar is packed!", color: "border-[#e50a1e]/25 hover:shadow-[#e50a1e]/10" },
            ].map((item, i) => (
              <div
                key={i}
                className={`group flex gap-4 p-6 bg-white rounded-2xl border-2 ${item.color} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <div className="text-3xl shrink-0 mt-0.5 group-hover:animate-bounce-gentle">{item.emoji}</div>
                <div>
                  <h3 className="font-black text-[#1a1a1a] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#888888] font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 relative overflow-hidden bg-[#faf8f5]">
        <div className="blob-bg w-64 h-64 bg-[#e50a1e]/8 top-10 left-10 absolute pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-14">
            <SectionLabel emoji="" text="Got Questions?" />
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#1a1a1a]">
              Frequently Asked Questions 
            </h2>
            <p className="text-lg text-[#545454] font-semibold max-w-2xl mx-auto">
              Everything you need to know about KTU programs, membership, and how to get started!
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <FAQSection limit={3} />
          </div>

          <div className="text-center">
            <Link href="/faq">
              <Button size="lg" variant="ghost" className="btn-bounce font-black text-[#e50a1e] hover:text-[#e50a1e] hover:bg-[#e50a1e]/8 text-lg rounded-2xl px-8 border-2 border-[#e50a1e]/20">
                View All Questions <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <InstagramFeed images={uploadImages.map((r: any) => ({ url: r.secure_url, publicId: r.public_id }))} />

      {/* ===== FINAL CTA ===== */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#000000]" />

        <div className="blob-bg w-96 h-96 bg-[#e50a1e]/15 -top-24 -left-24 absolute pointer-events-none" />
        <div className="blob-bg w-80 h-80 bg-[#545454]/10 -bottom-16 -right-16 absolute pointer-events-none" style={{ animationDelay: "3s" }} />
        <div className="blob-bg w-64 h-64 bg-[#e50a1e]/8 top-1/2 right-1/4 absolute pointer-events-none" style={{ animationDelay: "6s" }} />

        <div className="absolute inset-0 confetti-bg opacity-20 pointer-events-none" />

        {["", "", "", "", "", ""].map((e, i) => (
          <div
            key={i}
            className={`absolute text-3xl select-none pointer-events-none hidden lg:block animate-float`}
            style={{
              top: `${15 + i * 12}%`,
              left: i % 2 === 0 ? `${5 + i * 2}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 2}%` : undefined,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {e}
          </div>
        ))}

        <div className="container mx-auto relative z-10 px-4 md:px-6 text-center">
          <div className="text-5xl mb-6 animate-bounce-gentle"></div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-white leading-tight">
            Ready to Build the{" "}
            <span className="text-[#e50a1e]">Future?</span> 
          </h2>
          <p className="text-xl text-white/85 max-w-2xl mx-auto mb-12 font-semibold leading-relaxed">
            Join Africa's leading youth entrepreneurship program. Whether you're 6 or 18,
            KTU has a path for you to launch your future today! 
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[" Free first session", " Africa-wide community", " Real certifications", " Learn online or in person"].map((t, i) => (
              <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white/90 text-sm font-bold">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/membership" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="btn-bounce h-auto py-5 w-full text-xl px-12 font-black rounded-2xl shadow-2xl border-2 border-[#e50a1e]/40"
                style={{ background: "linear-gradient(135deg, #e50a1e, #cc0000)" }}
              >
                <span className="text-white"> Join KTU Today</span>
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="btn-bounce h-auto py-5 w-full border-2 border-white/40 text-white hover:bg-white/10 hover:text-white font-black text-xl px-12 rounded-2xl bg-transparent"
              >
                Contact Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
