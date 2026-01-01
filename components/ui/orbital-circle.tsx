import React from 'react';
import { BotIcon, BrainIcon, ChartPieIcon, DatabaseIcon, ScanBarcodeIcon, ServerIcon, ShieldBanIcon, SquareTerminalIcon } from 'lucide-react';

const OrbitalCircles = () => {
  // Configurazione cerchi orbitali
  const innerOrbitCircles = [
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 0, icon: DatabaseIcon},
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 120, icon: ShieldBanIcon},
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 240, icon: ChartPieIcon},
  ];

  const outerOrbitCircles = [
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 0, icon: BrainIcon },
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 72, icon: ScanBarcodeIcon },
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 144, icon: BotIcon },
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 216, icon: ServerIcon },
    { dimensions: 'w-[50px] h-[50px]', color: 'bg-primary text-primary-foreground', rotation: 288,icon: SquareTerminalIcon },
  ];

  return (
    <div className="flex items-center justify-center my-10">
      <div className="relative md:w-[400px] md:h-[400px] w-[300px] h-[300px]">
        {/* Cerchio esterno con bordo tratteggiato */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300/20 dark:border-gray-500/20"></div>

        {/* Cerchio centrale con immagine e sfondo sfumato */}
        <div className='absolute inset-[50px] md:inset-[50px] lg:inset-[50px] flex items-center justify-center z-10'>
          {/* Cerchio sfumato - versione light */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full aspect-square rounded-full bg-gradient-to-r from-pink-500/50 to-violet-500/50 blur-3xl" />
          </div>

          
          <img src="/peep_tech_stack.svg" alt="Logo" className='text-background w-[100%] h-[100%] relative z-10'></img>
        </div>

        {/* Contenitore rotante per i cerchi ESTERNI */}
        <div
          className="absolute inset-0 animate-spin z-20"
          style={{
            animationDuration: '20s',
            animationDirection: 'reverse',
          }}
        >
          {outerOrbitCircles.map((circle, index) => (
            <div
              key={`outer-${index}`}
              className="absolute inset-0"
              style={{
                transform: `rotate(${circle.rotation}deg)`, 
              }}
            >
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${circle.color} shadow-lg ${circle.dimensions} flex items-center justify-center`}
              >{<circle.icon></circle.icon>}</div>
            </div>
          ))}
        </div>

        {/* Cerchio intermedio con bordo tratteggiato */}
        <div className="absolute inset-[80px] rounded-full border-2 border-dashed border-gray-300/20 dark:border-gray-500/20"></div>

        {/* Contenitore rotante per i cerchi INTERNI */}
        <div
          className="absolute inset-[80px] animate-spin z-20"
          style={{
            animationDuration: '15s',
          }}
        >
          {innerOrbitCircles.map((circle, index) => (
            <div
              key={`inner-${index}`}
              className="absolute inset-0"
              style={{
                transform: `rotate(${circle.rotation}deg)`,
              }}
            >
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full ${circle.color} shadow-lg flex items-center justify-center ${circle.dimensions}`}
              >{<circle.icon></circle.icon>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrbitalCircles;