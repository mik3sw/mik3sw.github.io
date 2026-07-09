import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar02 } from '@/components/ui/shadcn-io/navbar-02';
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/ui/footer-component";
import { SOCIALS } from "@/lib/config/constants";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://mik3sw.github.io";
const description =
  "Personal portfolio of Michele Angelo Marcucci, AI Software Engineer based in Milan specializing in AI pipeline integrations, web and desktop applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Michele Angelo Marcucci — AI Software Engineer",
  description,
  keywords: [
    "Michele Angelo Marcucci",
    "AI Software Engineer",
    "Full-stack developer",
    "Machine Learning",
    "Milan",
  ],
  authors: [{ name: "Michele Angelo Marcucci" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Michele Angelo Marcucci — AI Software Engineer",
    description,
    siteName: "Michele Angelo Marcucci",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Michele Angelo Marcucci — AI Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michele Angelo Marcucci — AI Software Engineer",
    description,
    images: ["/og.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Michele Angelo Marcucci",
  alternateName: "Mike",
  url: siteUrl,
  jobTitle: "AI Software Engineer",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Milan",
    addressCountry: "IT",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Milano-Bicocca",
  },
  knowsAbout: [
    "Software Engineering",
    "Full-stack Development",
    "Clean Architecture",
    "REST APIs",
    "Docker",
    "Artificial Intelligence",
    "Machine Learning",
    "Retrieval-Augmented Generation",
    "LLM Fine-tuning",
    "Data Extraction",
  ],
  sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.huggingface],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <div className="fixed left-0 right-0 z-50 flex">
          <div className="relative w-full bg-background">
            <Navbar02 className="bg-background"/>
          </div>
        </div>

        <div>
          {children}
        </div>
        </ThemeProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}
