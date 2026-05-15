"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart, HandHeart, Coins, Package, Egg, Droplet,
  Utensils, CheckCircle2, Users, Star, ArrowDown,
  Phone, Copy, Check, ChevronRight, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


/* ─── DATA ────────────────────────────────────────────────────── */
const goals = [
  { name: "10kg Rice",        qty: 20, unit: "bags",    icon: Package,  color: "#f97316", pct: 0 },
  { name: "Indomie",          qty: 20, unit: "cartons", icon: Utensils, color: "#ef4444", pct: 0 },
  { name: "Pasta",            qty: 20, unit: "packs",   icon: Utensils, color: "#eab308", pct: 0 },
  { name: "Cooking Oil",      qty: 20, unit: "cans",    icon: Droplet,  color: "#f59e0b", pct: 0 },
  { name: "Crates of Eggs",   qty: 20, unit: "crates",  icon: Egg,      color: "#3b82f6", pct: 0 },
  { name: "Salt",             qty: 20, unit: "packs",   icon: Droplet,  color: "#64748b", pct: 0 },
  { name: "Sugar",            qty: 20, unit: "packs",   icon: Droplet,  color: "#ec4899", pct: 0 },
  { name: "Toilet Paper",     qty: 20, unit: "packs",   icon: Package,  color: "#8b5cf6", pct: 0 },
  { name: "Detergent",        qty: 20, unit: "packs",   icon: Package,  color: "#14b8a6", pct: 0 },
];

const impacts = [
  { number: "20", label: "Families Reached", sub: "Dog-loving households", icon: Users },
  { number: "180+", label: "Food Items",      sub: "Essential daily staples", icon: Package },
  { number: "100%", label: "Transparent",     sub: "All donors named publicly", icon: Star },
  { number: "0",    label: "Admin Fees",      sub: "Every Naira goes directly to aid", icon: Heart },
];

const steps = [
  { step: "01", title: "You Donate",         body: "Send cash to the Fidelity Bank account or reach out to donate food items directly." },
  { step: "02", title: "We Acknowledge",     body: "Every donor is publicly announced. Total transparency and accountability is our promise." },
  { step: "03", title: "We Procure & Pack",  body: "Items are sourced, sorted and packed into family bundles within the community." },
  { step: "04", title: "Families Receive",   body: "20 dog-loving households receive their full food pack — dogs included in the blessing." },
];

const testimonials = [
  { quote: "The hardship is real. Many of us are struggling to feed our families AND our pets. This initiative means the world.", name: "Lagos Dog Mom", paws: 5 },
  { quote: "I never imagined a pet community would also care about human welfare. My Dog and I has proven that love has no limits.", name: "Abuja Dog Dad", paws: 5 },
  { quote: "Pure love. Pure community. This is exactly what Nigeria needs right now — people who show up for each other.", name: "Port Harcourt Member", paws: 5 },
];

const faqs = [
  { q: "Can I donate food items instead of cash?", a: "Absolutely! We welcome both cash and physical items. Contact us to arrange collection or drop-off." },
  { q: "How do I know my donation was received?", a: "We publicly announce every donation — your name and contribution will be shared with the community." },
  { q: "Can dogs really eat these food items?", a: "Yes! Rice, eggs, and other items on our list are perfectly safe and nutritious for dogs. Every pack benefits both the family and their pet." },
  { q: "How are beneficiaries selected?", a: "Community members in genuine need are identified through our trusted dog-lover network. Priority is given to families in the most difficult situations." },
];

/* ─── HELPERS ─────────────────────────────────────────────────── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const child = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── COMPONENTS ──────────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="ml-2 p-1.5 rounded-lg bg-white/20 hover:bg-white/40 transition"
      title="Copy"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/60 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-6 text-left font-bold text-lg hover:bg-secondary/40 transition"
      >
        {q}
        <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────── */
export default function FoodbankPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* ── FLOATING BACKGROUND DECO ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
        {["🐾","🍚","🦴","❤️","🍜","🐕"].map((e,i)=>(
          <motion.div key={i} 
            animate={{ 
              y: [0, -100, 0], 
              x: [0, Math.sin(i)*50, 0],
              rotate: [0, 360] 
            }} 
            transition={{ duration: 20+i*5, repeat: Infinity, ease: "linear" }}
            className="absolute text-8xl"
            style={{ 
              top: `${Math.random()*100}%`, 
              left: `${Math.random()*100}%` 
            }}
          >
            {e}
          </motion.div>
        ))}
      </div>


      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden">
        {/* animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1,1.15,1], opacity:[0.35,0.55,0.35] }} transition={{ duration:7, repeat:Infinity }}
            className="absolute top-10 -left-24 w-[500px] h-[500px] rounded-full bg-primary/30 blur-3xl" />
          <motion.div animate={{ scale: [1,1.2,1], opacity:[0.25,0.45,0.25] }} transition={{ duration:9, repeat:Infinity, delay:2 }}
            className="absolute bottom-0 -right-24 w-[500px] h-[500px] rounded-full bg-accent/40 blur-3xl" />
        </div>

        {/* BANNER section */}
        <motion.div {...fade(0)} className="relative w-full max-w-4xl mb-10 group">
          <div className="relative w-full h-[300px] md:h-[480px] rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white">
            <Image 
              src="/foodbank1.jpeg" 
              alt="Doglovers Community Foodbank" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="flex gap-2">
                {["🐾","❤️","🍚"].map((e,i)=>(
                  <motion.span 
                    key={i} 
                    animate={{y:[0,-10,0], rotate: [0, 5, -5, 0]}} 
                    transition={{duration:2.5, delay:i*0.4, repeat:Infinity, ease: "easeInOut"}} 
                    className="text-3xl md:text-5xl bg-white shadow-2xl p-4 md:p-6 rounded-[2.5rem] border-4 border-primary/20 flex items-center justify-center filter drop-shadow-lg"
                  >
                    {e}
                  </motion.span>
                ))}

              </div>
            </div>
          </div>
        </motion.div>


        <motion.div {...fade(0.1)} className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-5 py-2 rounded-full font-bold text-sm mb-5 border border-destructive/20">
          <AlertTriangle className="w-4 h-4" /> Urgent Community Appeal
        </motion.div>

        <motion.h1 {...fade(0.2)} className="text-5xl md:text-7xl font-black text-foreground mb-5 leading-tight max-w-4xl">
          Doglovers Community<br />
          <span className="text-primary">Foodbank AID</span>
        </motion.h1>

        <motion.p {...fade(0.3)} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 font-medium leading-relaxed">
          Nigeria is facing one of its toughest economic seasons. As dog lovers, we refuse to look away.
          We are feeding families — and their beloved dogs — together.
        </motion.p>

        <motion.div {...fade(0.4)} className="flex flex-wrap gap-4 justify-center">
          <a href="#donate">
            <Button size="lg" className="bg-primary text-primary-foreground font-black text-lg px-10 py-6 h-auto rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 mr-2 fill-current" /> Donate Now
            </Button>
          </a>
          <a href="#goals">
            <Button size="lg" variant="outline" className="font-black text-lg px-10 py-6 h-auto rounded-2xl border-2 hover:scale-105 transition-transform">
              See Our Goals <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </motion.div>
      </section>

      {/* ── URGENCY BANNER ─────────────────────────────────────── */}
      <div className="bg-primary text-primary-foreground py-4 overflow-hidden">
        <motion.div animate={{ x: ["100%", "-100%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap font-bold text-lg">
          {[...Array(4)].map((_,i)=>(
            <span key={i} className="flex items-center gap-3">
              🐾 Help a Dog-Loving Family &nbsp;|&nbsp; 🍚 20 Bags of Rice Needed &nbsp;|&nbsp; ❤️ Every Naira Counts &nbsp;|&nbsp; 🐕 Dogs Also Benefit
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-32">

        {/* ── THE STORY ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fade()}>
              <span className="text-primary font-black uppercase tracking-widest text-sm">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 leading-tight">Why We Started This Initiative</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>These past few months have been very tough for us Nigerians. My position in the dog-lovers community opens me up to hearing all of the hardships and the struggles that pet parents are going through.</p>
                <p>My Dog and I Group is actively trying to put together items that we can share amongst our community members. We try to assist as best we could to ease the sting of the hardships of our people — but we also want to give everyone an opportunity to chime in and help.</p>
                <p className="text-foreground font-bold text-xl uppercase tracking-tighter">Everyone can partake in the sharing of these items.</p>
              </div>
            </motion.div>

            <motion.div {...fade(0.15)} className="grid grid-cols-2 gap-4">
              {impacts.map(({ number, label, sub, icon: Icon }, i) => (
                <div key={i} className="bg-secondary/50 rounded-3xl p-6 border border-border/40 hover:border-primary/40 hover:shadow-lg transition-all group">
                  <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-3xl font-black text-primary">{number}</p>
                  <p className="font-bold text-foreground">{label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{sub}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── COMMUNITY GALLERY ──────────────────────────────────── */}
        <section className="max-w-4xl mx-auto space-y-12">
          <motion.div {...fade(0)} className="group relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image 
              src="/foodbank2.jpg" 
              alt="Community Aid in Action" 
              fill 
              className="object-contain bg-secondary/20 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
              <p className="font-black text-2xl uppercase tracking-tighter">Dog-Friendly AID</p>
              <p className="text-sm opacity-80">Ensuring our furry friends are also fed.</p>
            </div>
          </motion.div>
          
          <motion.div {...fade(0.1)} className="group relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image 
              src="/foodbank-banner.png" 
              alt="Our Shared Vision" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
              <p className="font-black text-2xl uppercase tracking-tighter">Our Community Goal</p>
              <p className="text-sm opacity-80">Joining hands to make a difference.</p>
            </div>
          </motion.div>
        </section>




        {/* ── GOALS GRID ─────────────────────────────────────────── */}
        <section id="goals" className="max-w-5xl mx-auto px-4 md:px-0">
          <motion.div {...fade()} className="text-center mb-16">
            <span className="text-primary font-black uppercase tracking-widest text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm">Current Progress</span>
            <h2 className="text-5xl md:text-6xl font-black mt-8 mb-6 tracking-tighter leading-none">What We Need to Raise</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Each of these essential items will go directly to 20 dog-loving families. 
              <span className="text-foreground font-bold"> Every Naira donated feeds both the family and their beloved dogs.</span>
            </p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden"
            whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {goals.map(({ name, qty, unit, icon: Icon, color }, i) => (
              <motion.div key={i} variants={child}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl border border-border/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.03] blur-3xl transition-all group-hover:opacity-10 group-hover:scale-150 duration-700"
                  style={{ background: color }} />
                
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 rounded-3xl group-hover:scale-110 transition-transform duration-500 shadow-sm" style={{ background: `${color}15` }}>
                    <Icon className="w-8 h-8" style={{ color }} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Target</p>
                    <span className="text-xs font-black bg-secondary px-3 py-1 rounded-full uppercase border border-border/50">20 {unit}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-1 group-hover:text-primary transition-colors">{name}</h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Goal: {qty} {unit}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fundraised</p>
                    <p className="text-sm font-black uppercase tracking-tighter" style={{ color }}>4% Collected</p>
                  </div>
                  <div className="w-full h-4 bg-secondary rounded-full overflow-hidden border border-border/50 shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: "4%" }} 
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                      className="h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)]" 
                      style={{ background: color }} 
                    />
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <p className="text-[11px] font-black text-muted-foreground uppercase">Needs Support</p>
                    <Heart className="w-3 h-3 text-destructive fill-destructive animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fade(0.3)} className="mt-16 bg-accent/10 border-2 border-dashed border-accent/30 rounded-[3rem] p-10 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <p className="text-xl md:text-2xl font-black text-foreground leading-tight max-w-3xl mx-auto uppercase tracking-tighter">
              🐕 All food items on this list are <span className="text-primary underline decoration-4 underline-offset-4">safe and nutritious for dogs</span> — your kindness feeds the whole household.
            </p>
          </motion.div>
        </section>


        {/* ── HOW IT WORKS ───────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto">

          <motion.div {...fade()} className="text-center mb-12">
            <span className="text-primary font-black uppercase tracking-widest text-sm">Process</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">How Your Donation Works</h2>
            <p className="text-muted-foreground text-lg">Simple, transparent, accountable.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, body }, i) => (
              <motion.div key={i} {...fade(i * 0.1)} className="relative bg-secondary/30 rounded-3xl p-7 border border-border/40">
                <p className="text-6xl font-black text-primary/20 mb-3 leading-none">{step}</p>
                <h3 className="text-xl font-black mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{body}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 bg-primary rounded-full z-10 border-4 border-background" />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto">

          <motion.div {...fade()} className="text-center mb-12">
            <span className="text-primary font-black uppercase tracking-widest text-sm">Community Voice</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">What Members Are Saying</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, paws }, i) => (
              <motion.div key={i} {...fade(i * 0.12)} className="bg-secondary/30 rounded-3xl p-7 border border-border/40 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex gap-1 mb-4">{Array(paws).fill(0).map((_,j)=><span key={j} className="text-primary">🐾</span>)}</div>
                <p className="text-foreground font-medium text-lg leading-relaxed mb-5">{quote}</p>
                <p className="text-sm font-black text-primary uppercase tracking-wide">— {name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── DONATE CTA ─────────────────────────────────────────── */}
        <section id="donate" className="max-w-5xl mx-auto">

          <motion.div {...fade()} className="bg-primary text-primary-foreground rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-36 -mt-36" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />

            <div className="relative z-10 text-center mb-12">
              <motion.div animate={{scale:[1,1.1,1]}} transition={{duration:2,repeat:Infinity}} className="inline-block mb-6">
                <div className="bg-white/20 p-6 rounded-full inline-block">
                  <Heart className="w-14 h-14 fill-current" />
                </div>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black mb-5 leading-tight">Be Part of the Change</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium leading-relaxed">
                A little from many makes a lot. Your donation — big or small — will be publicly acknowledged and go directly toward feeding 20 dog-loving families.
              </p>
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Bank Transfer */}
              <div className="bg-white text-foreground rounded-[2rem] p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-primary/10 p-2.5 rounded-xl"><Coins className="w-6 h-6 text-primary" /></div>
                  <h4 className="font-black text-lg text-primary uppercase tracking-wide">Bank Transfer</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-secondary/60 px-4 py-3 rounded-xl">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase">Account Number</p>
                      <p className="text-2xl font-black tracking-widest text-primary">5600703635</p>
                    </div>
                    <CopyButton text="5600703635" />
                  </div>
                  <div className="bg-secondary/60 px-4 py-3 rounded-xl">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Bank</p>
                    <p className="text-xl font-black">Fidelity Bank</p>
                  </div>
                  <div className="bg-secondary/60 px-4 py-3 rounded-xl">
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Account Name</p>
                    <p className="text-xl font-black">My Dog and I</p>
                  </div>
                </div>
              </div>

              {/* Food Items */}
              <div className="bg-accent/30 backdrop-blur rounded-[2rem] p-8 flex flex-col items-center justify-center text-center border-2 border-white/30">
                <HandHeart className="w-14 h-14 mb-5 text-accent-foreground" />
                <h4 className="text-xl font-black mb-3 leading-tight">Donate Food Items</h4>
                <p className="opacity-80 leading-relaxed mb-6">
                  Have bags of rice, cartons of Indomie, or any other items? We will arrange collection directly from you.
                </p>
                <Button className="bg-foreground text-background hover:bg-foreground/80 rounded-xl px-8 py-5 h-auto font-black text-base">
                  <Phone className="w-4 h-4 mr-2" /> Contact Us
                </Button>
              </div>
            </div>

            <p className="relative z-10 text-center mt-10 text-lg font-bold opacity-90">
              Thank you so much for your generosity. 🙏
            </p>
          </motion.div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto">

          <motion.div {...fade()} className="text-center mb-12">
            <span className="text-primary font-black uppercase tracking-widest text-sm">Questions</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...fade(0.1)} className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
          </motion.div>
        </section>

        {/* ── BOTTOM CTA ─────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto">

          <motion.div {...fade()} className="text-center py-16 border-t border-border/40">
            <div className="flex justify-center gap-4 mb-10 text-4xl">
              {["🐾","🐕","❤️","🍚","🙏"].map((e,i)=>(
                <motion.span 
                  key={i} 
                  animate={{y:[0,-15,0], scale: [1, 1.1, 1]}} 
                  transition={{duration:2, delay:i*0.25, repeat:Infinity, ease: "easeInOut"}}
                  className="bg-accent/20 p-5 rounded-3xl shadow-md border-2 border-accent/30"
                >
                  {e}
                </motion.span>
              ))}
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-4">Together We Are Stronger</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
              The dog lovers community is built on love, trust, and showing up for each other. Let us show up for our people.
            </p>
            <a href="#donate">
              <Button size="lg" className="bg-primary text-primary-foreground font-black text-xl px-12 py-7 h-auto rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 mr-3 fill-current" /> Donate Today
              </Button>
            </a>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
