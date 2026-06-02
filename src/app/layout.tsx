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
    default: "Kids and Teens University (KTU) | Building Africa's Next Generation of CEOs",
    template: "%s | Kids and Teens University"
  },
  description: "Where kids and teens learn to run businesses, master investments, and shape the future. Empowering ages 6-18 with entrepreneurship, financial literacy, and leadership skills.",
  keywords: ["Kids entrepreneurship Nigeria", "Teens business school", "Youth financial literacy", "Kids and Teens University", "KTU Africa", "Youth leadership Africa", "Entrepreneurship for kids", "Teen investment club"],
  authors: [{ name: "Kids and Teens University Team" }],
  creator: "Kids and Teens University",
  publisher: "Kids and Teens University",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
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
