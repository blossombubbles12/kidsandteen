import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MainWrapper } from "@/components/MainWrapper";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "My Dog and I | Africa's Largest Gathering of Pets",
    template: "%s | My Dog and I"
  },
  description: "Experience the joy of pet ownership with Africa's largest gathering of Pets. Join 50,000+ pet lovers for events, the Lagos Dog Carnival, and our Guinness World Record attempt.",
  keywords: ["Pet community Lagos", "Africa's largest gathering of pets", "Lagos Dog Carnival", "Pet events Nigeria", "Pet owners Nigeria", "Pet lovers Lagos", "Guinness World Record pet gathering", "My Dog and I"],
  authors: [{ name: "My Dog and I Team" }],
  creator: "My Dog and I",
  publisher: "My Dog and I",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased flex flex-col",
          outfit.variable
        )}
      >
        <Navigation />
        <MainWrapper>
          {children}
        </MainWrapper>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
