import { Metadata } from "next";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Home | My Dog and I - Africa's Largest Gathering of Pets",
  description: "Join 50,000+ pet lovers in Lagos. Participating in the annual Lagos Dog Carnival, community walks, and our historic Guinness World Record attempt for Africa's largest gathering of Pets.",
  openGraph: {
    title: "My Dog and I - Africa's Largest Gathering of Pets",
    description: "Experience the joy of pet ownership with Africa's largest gathering of Pets. Lagos Dog Carnival, Events, and more.",
    url: "https://mydogandni.com", // Assuming the domain
    siteName: "My Dog and I",
    images: [
      {
        url: "https://res.cloudinary.com/dtw0ajpwa/image/upload/v1768756809/lagos_dog_carnival_20242_ekato6.jpg", // Using newest brand image
        width: 1200,
        height: 630,
        alt: "Lagos Dog Carnival",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Dog and I - Africa's Largest Gathering of Pets",
    description: "Join 50,000+ pet lovers for events, the Lagos Dog Carnival, and our Guinness World Record attempt.",
    images: ["https://res.cloudinary.com/dtw0ajpwa/image/upload/v1768756809/lagos_dog_carnival_20242_ekato6.jpg"],
  },
};

import { Sponsors } from "@/components/Sponsors";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnniversaryBanner } from "@/components/AnniversaryBanner";
import { FAQSection } from "@/components/faq/FAQSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { CldImage } from "@/components/media/CldImage";
import { GalleryPreview } from "@/components/media/GalleryPreview";
import { getMediaFromFolder } from "@/app/actions/media";
import { MediaAsset } from "@/components/media/GalleryGrid";
import {
  ArrowRight,
  Trophy,
  Camera,
  Users,
  Heart,
  Handshake,
  Calendar,
  MessageCircle,
  Star,
  HelpCircle,
  ShieldCheck
} from "lucide-react";

export default async function Home() {
  const cloudinaryAssets = await getMediaFromFolder('mydogandigroup', 100);

  // Map to media assets
  const mappedImages = cloudinaryAssets
    .filter((asset: any) => asset.resource_type === 'image')
    .map((asset: any) => ({
      id: asset.public_id,
      src: asset.secure_url,
      cloudinaryId: asset.public_id,
      type: 'image' as const,
      alt: asset.context?.custom?.alt || "Lagos Dog Carnival / My Dog and I Community Moment",
      caption: asset.context?.custom?.caption || "Moment"
    }));

  // Capture recent images before shuffling
  const recentImages = mappedImages.slice(0, 10);

  // Shuffle for variety in other sections
  const allImages = [...mappedImages].sort(() => Math.random() - 0.5);

  // Pick specific images for different sections
  const galleryMedia = allImages.slice(0, 7);
  const carnivalImage = allImages[7] || { cloudinaryId: "lagos_dog_carnival_20242_ekato6", alt: "Lagos Dog Carnival" };
  const aboutImage = allImages[8] || { cloudinaryId: "homepage9_mhc0oh", alt: "Our Story" };
  const finalCtaImage = allImages[9] || { cloudinaryId: "homepage8_zaj3az", alt: "Join the Pack" };

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <Sponsors />
      <AnniversaryBanner />

      {/* Lagos Dog Carnival - BOLD REDESIGN */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 shadow-lg">
                <Trophy className="w-4 h-4" /> Guinness World Record 2026
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Lagos Dog Carnival
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Join 2,500+ pet lovers for <strong>Africa&apos;s largest gathering of Pets</strong>.
                Competitions, prizes, fun, and a chance to make history!
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <p className="text-2xl font-bold text-primary">2500+</p>
                  <p className="text-xs text-muted-foreground">Attendees</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <p className="text-2xl font-bold text-primary">2000+</p>
                  <p className="text-xs text-muted-foreground">Dogs</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <p className="text-2xl font-bold text-primary">₦5M</p>
                  <p className="text-xs text-muted-foreground">In Prizes</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link href="/carnival" className="w-full sm:w-auto">
                  <Button size="lg" className="h-auto py-5 w-full text-lg px-8 font-bold shadow-lg">
                    Explore Carnival <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/carnival/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="h-auto py-5 w-full text-lg px-8 font-bold border-2">
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <CldImage
                src={carnivalImage.cloudinaryId}
                alt={carnivalImage.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold">December 13, 2026</p>
                <p className="text-white/90">Tafawa Balewa Square, Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <GalleryPreview media={galleryMedia} />
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Camera className="w-4 h-4" /> Visual Stories
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Captured Moments
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Browse our gallery of heartwarming photos from events, meetups, and everyday
                adventures. Share your own moments and get featured!
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-muted-foreground">Event photo albums</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-muted-foreground">Community submissions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-muted-foreground">Lightbox viewer</span>
                </li>
              </ul>

              <Link href="/media">
                <Button size="lg" className="text-lg px-8 font-bold">
                  View Gallery <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community via WhatsApp Section */}
      <section className="py-20 bg-green-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                  <MessageCircle className="w-10 h-10 text-[#25D366] mb-3" />
                  <h3 className="font-bold text-lg mb-1">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Instant advice from experts</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
                  <Users className="w-10 h-10 text-[#25D366] mb-3" />
                  <h3 className="font-bold text-lg mb-1">Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with local owners</p>
                </div>
              </div>
              <div className="bg-[#25D366]/10 p-6 rounded-2xl border border-[#25D366]/20">
                <h3 className="font-bold text-xl mb-2 flex items-center text-[#128C7E]">
                  <ShieldCheck className="w-5 h-5 mr-2" /> Safe & Moderated
                </h3>
                <p className="text-[#128C7E]">
                  A respectful space for dog lovers to share, learn, and grow together. Zero spam, 100% dog talk.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#25D366]/10 text-[#128C7E] px-4 py-2 rounded-full text-sm font-bold mb-6">
                <MessageCircle className="w-4 h-4" /> Official Community Group
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Join the Record Breaking Pet Lovers Group
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect directly with our community of over 50,000 satisfied dog owners. This is the official hub for our Guinness World Record attempt! Get real-time updates and training tips straight to your phone.
              </p>

              <Link href="https://chat.whatsapp.com/C0I2KfbQrpf4Qw5qc8QEDT" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-auto w-full sm:w-auto text-lg px-8 py-4 font-bold shadow-xl bg-[#25D366] hover:bg-[#128C7E] text-white border-none rounded-full">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-6 w-6 shrink-0" />
                      <span className="whitespace-normal">Join the Record Breaking Group</span>
                    </div>
                    <span className="text-[10px] opacity-80 mt-1">Official GWR Community</span>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl order-2 md:order-1">
              <CldImage
                src={aboutImage.cloudinaryId}
                alt={aboutImage.alt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Heart className="w-4 h-4" /> Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                From Instagram to Movement
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                <strong>My Dog and I Group</strong> is a non-profit pet service company that started on Instagram in 2016. Today, it has grown into Africa&apos;s largest gathering of Pets, building a vibrant community through social work, activism, and events.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Started on Instagram in 2016</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Now 50,000+ strong across several platforms</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Rehomed 2,000+ pets (including cats)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">Hosted 100+ events and counting</p>
                </div>
              </div>

              <Link href="/about">
                <Button size="lg" className="text-lg px-8 font-bold">
                  Read Our Story <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorships Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Handshake className="w-4 h-4" /> Partner with Us
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 max-w-3xl mx-auto leading-tight">
            Reach 50,000+ Passionate Pet Owners
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become a sponsor and connect your brand with Nigeria's most engaged pet community.
            Multiple packages available.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-primary mb-2">5,000+</p>
              <p className="text-sm text-muted-foreground">Event Attendees</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-primary mb-2">50k+</p>
              <p className="text-sm text-muted-foreground">Online Community</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-3xl font-bold text-primary mb-2">100k+</p>
              <p className="text-sm text-muted-foreground">Social Reach</p>
            </div>
          </div>

          <Link href="/sponsorships">
            <Button size="lg" className="text-lg px-10 font-bold shadow-lg">
              View Packages <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Events Calendar Teaser */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss an Event
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            From weekly dog walks to training sessions and the annual carnival -
            there&apos;s always something happening in the pack.
          </p>
          <Link href="/community">
            <Button size="lg" variant="outline" className="text-lg px-8 font-bold border-2">
              View Upcoming Events <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              <HelpCircle className="w-4 h-4" /> Got Questions?
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;ve gathered the most common questions from our community to help you get started.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <FAQSection limit={3} />
          </div>

          <div className="text-center">
            <Link href="/faq">
              <Button size="lg" variant="ghost" className="font-bold text-primary hover:text-primary hover:bg-primary/5">
                View All Questions <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <InstagramFeed media={recentImages} />

      {/* ── FOODBANK INITIATIVE ─────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src="/foodbank1.jpeg" alt="Foodbank Initiative" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                  <Heart className="w-4 h-4 fill-current" /> Community Aid Initiative
                </span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-bold mb-6">
                🚨 Urgent Appeal
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Doglovers Community <span className="text-primary">Foodbank AID</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Nigeria's economic hardship is hitting our community hard. We're rallying together to provide 
                <strong> essential food items for 20 dog-loving families</strong> — their dogs included.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[["20", "Families"], ["180+", "Food Items"], ["0%", "Admin Fees"]].map(([n, l]) => (
                  <div key={l} className="text-center p-4 bg-white rounded-2xl shadow-sm border border-orange-100">
                    <p className="text-2xl font-black text-primary">{n}</p>
                    <p className="text-xs text-muted-foreground font-medium">{l}</p>
                  </div>
                ))}
              </div>

              <Link href="/foodbank">
                <Button size="lg" className="text-lg px-8 font-bold bg-primary shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 mr-2 fill-current" /> Support the Foodbank <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CldImage
            src={finalCtaImage.cloudinaryId}
            alt={finalCtaImage.alt}
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto relative z-10 px-4 md:px-6 text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-white/90 animate-pulse" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Ready to Join the Woof Pack?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 font-medium">
            Be part of Nigeria's most vibrant pet community. Share adventures, make friends,
            and give your pup the social life they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Link href="/membership" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="h-auto py-5 w-full text-lg px-10 font-bold shadow-lg hover:shadow-xl transition-all">
                Join the Pack Today
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-auto py-5 w-full border-current text-white hover:bg-white/10 hover:text-white border-2 font-bold">
                Contact Us <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </section>
    </div>
  );
}
