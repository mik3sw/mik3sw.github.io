import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar02 } from '@/components/ui/shadcn-io/navbar-02';
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/ui/footer-component";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michele Angelo Marcucci - AI Software Engineer",
  description: "Personal portfolio of Michele Angelo Marcucci, AI Software Engineer specializing in cutting-edge AI solutions and software development.",
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
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {/* Container per la navbar */}
        {/* <div className="fixed left-0 right-0 z-50 flex">
          <div className="bg-white px-6 py-3">
            <NavBar />
          </div>
        </div> */}
        <div className="fixed left-0 right-0 z-50 flex">
          <div className="relative w-full bg-background">
            <Navbar02 className="bg-background"/>
          </div>
        </div>

        {/* Spazio sotto la navbar */}
        <div>
          {children}
        </div>
        </ThemeProvider>
        <Footer></Footer>
      </body>
    </html>
  );
}
