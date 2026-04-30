import { Doto, Geist_Mono, Space_Grotesk, Public_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import GlobalClickSound from "@/hooks/use-click";
import { SettingProvider } from "@/context/SettingContextProvider";
import { ConfigProvider } from "@/context/ConfigContextProvider";
import ThemeProvider from "@/context/ThemeContextProvider";

const publicSans = Public_Sans({subsets:['latin'],variable:'--font-sans'});
const doto = Doto({ subsets: ["latin"], variable: "--font-doto" });
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: `GoType — Typing Speed Test`,
  description: "typing test",
  keywords: [
    "typing test",
    "typing speed",
    "wpm test",
    "words per minute",
    "typing practice",
    "typing trainer",
    "GoType",
    "monkeytype alternative",
  ],
  authors: [{ name: "GoType" }],
  creator: "Shiva Bhattacharjee",
  metadataBase: "https://gotype.vercel.app",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gotype.vercel.app",
    title: `GoType — Typing Speed Test`,
    images: [
      {
        url: "/opengraph.png",
        width: 1440,
        height: 1080,
        alt: "KeyZen — typing practice with on-screen keyboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `GoType — Typing Speed Test`,
    description: "A clean, minimal typing test. Track your WPM and accuracy in real-time.",
    creator: `Rishabh Gupta`,
    images: ["/opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        publicSans.variable,
        doto.variable,
        "dark"
        
      )}
    >
      <body>
        <ThemeProvider>
        <SettingProvider>
        <ConfigProvider>
        <GlobalClickSound/>
        <SidebarProvider>
          <Toaster />
          {children}
        </SidebarProvider>
        </ConfigProvider>
        </SettingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}