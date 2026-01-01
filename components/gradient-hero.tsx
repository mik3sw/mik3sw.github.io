'use client';

import { WavyBackground } from "@/components/ui/shadcn-io/wavy-background";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GradientHero() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ottieni il colore effettivo dalla variabile CSS
  const getBackgroundColor = () => {
    if (!mounted) return "#ffffff";
    
    const isDark = resolvedTheme === 'dark' || theme === 'dark';
    return isDark ? "#09090b" : "#ffffff"; // zinc-950 : white
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <WavyBackground
        backgroundFill={getBackgroundColor()}
        colors={["#40d133ff", "#33cc8cff", "#31c2aeff", "#2b6fbdff"]}
        waveWidth={100}
        blur={10}
        speed="slow"
        waveOpacity={0.3}
        containerClassName="h-full w-full"
        className="flex items-center justify-center"
      >
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-foreground">
            Empower your business
          </h1>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-foreground">
            with our value
          </h1>
          
        </div>
      </WavyBackground>
    </div>
  );
}