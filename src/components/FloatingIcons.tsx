import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const animals = [
  'ant.png', 'bull.png', 'camel.png', 'deer.png',
  'donkey.png', 'dove.png', 'eagle.png', 'fish.png',
  'horse.png', 'lamb.png', 'lion.png', 'serpent.png'
];

interface IconConfig {
  layer: 'foreground' | 'midground' | 'background';
  top: string;
  left?: string;
  right?: string;
  scale: number;
  zIndex: number;
  blur?: string;
  opacity?: number;
}

// Mobile Configuration - Doubled Density & Life
const mobileIcons: IconConfig[] = [
  // Foreground (Big & Close) - Impactful
  { layer: 'foreground', top: '12%', left: '-8%', scale: 2.4, zIndex: 10 },
  { layer: 'foreground', top: '58%', right: '-12%', scale: 2.6, zIndex: 10 },
  { layer: 'foreground', top: '88%', left: '-6%', scale: 2.0, zIndex: 10 },
  { layer: 'foreground', top: '35%', right: '-15%', scale: 1.8, zIndex: 10 }, // New

  // Midground (Standard) - Filling the gaps
  { layer: 'midground', top: '5%', right: '5%', scale: 1.0, zIndex: 0 },
  { layer: 'midground', top: '18%', left: '8%', scale: 1.2, zIndex: 0 },
  { layer: 'midground', top: '28%', right: '12%', scale: 0.9, zIndex: 0 },
  { layer: 'midground', top: '42%', left: '5%', scale: 1.1, zIndex: 0 },
  { layer: 'midground', top: '55%', right: '8%', scale: 1.0, zIndex: 0 },
  { layer: 'midground', top: '68%', left: '12%', scale: 1.3, zIndex: 0 },
  { layer: 'midground', top: '80%', right: '15%', scale: 1.1, zIndex: 0 },
  { layer: 'midground', top: '92%', left: '20%', scale: 1.0, zIndex: 0 },
  { layer: 'midground', top: '2%', left: '40%', scale: 0.8, zIndex: 0 }, // New
  { layer: 'midground', top: '96%', right: '30%', scale: 0.9, zIndex: 0 }, // New

  // Background (Small & Many) - Vastness
  { layer: 'background', top: '10%', left: '25%', scale: 0.6, zIndex: -5, opacity: 0.6, blur: '1px' },
  { layer: 'background', top: '22%', right: '25%', scale: 0.5, zIndex: -5, opacity: 0.7, blur: '1px' },
  { layer: 'background', top: '35%', left: '35%', scale: 0.4, zIndex: -5, opacity: 0.5, blur: '2px' },
  { layer: 'background', top: '45%', right: '30%', scale: 0.5, zIndex: -5, opacity: 0.6, blur: '1px' },
  { layer: 'background', top: '60%', left: '25%', scale: 0.6, zIndex: -5, opacity: 0.6, blur: '1px' },
  { layer: 'background', top: '75%', right: '35%', scale: 0.4, zIndex: -5, opacity: 0.5, blur: '2px' },
  { layer: 'background', top: '85%', left: '45%', scale: 0.5, zIndex: -5, opacity: 0.5, blur: '2px' },
  { layer: 'background', top: '15%', right: '45%', scale: 0.5, zIndex: -5, opacity: 0.6, blur: '2px' }, // New
  { layer: 'background', top: '50%', left: '10%', scale: 0.4, zIndex: -5, opacity: 0.5, blur: '2px' }, // New
  { layer: 'background', top: '65%', right: '5%', scale: 0.5, zIndex: -5, opacity: 0.6, blur: '1px' }, // New
];

// Desktop Configuration - Doubled Density & Life
const desktopIcons: IconConfig[] = [
  // Foreground (Very Big & Close)
  { layer: 'foreground', top: '5%', left: '-3%', scale: 3.5, zIndex: 10 },
  { layer: 'foreground', top: '40%', right: '-6%', scale: 4.2, zIndex: 10 },
  { layer: 'foreground', top: '80%', left: '1%', scale: 3.2, zIndex: 10 },
  { layer: 'foreground', top: '20%', right: '5%', scale: 2.8, zIndex: 10 }, // New placement, overlapping content
  { layer: 'foreground', top: '60%', left: '5%', scale: 3.0, zIndex: 10 }, // New placement

  // Midground (Standard) - Scattered everywhere
  { layer: 'midground', top: '8%', right: '18%', scale: 1.4, zIndex: 0 },
  { layer: 'midground', top: '15%', left: '15%', scale: 1.5, zIndex: 0 },
  { layer: 'midground', top: '25%', right: '12%', scale: 1.3, zIndex: 0 },
  { layer: 'midground', top: '35%', left: '10%', scale: 1.6, zIndex: 0 },
  { layer: 'midground', top: '45%', right: '25%', scale: 1.4, zIndex: 0 },
  { layer: 'midground', top: '55%', left: '20%', scale: 1.5, zIndex: 0 },
  { layer: 'midground', top: '68%', right: '15%', scale: 1.4, zIndex: 0 },
  { layer: 'midground', top: '78%', left: '12%', scale: 1.6, zIndex: 0 },
  { layer: 'midground', top: '88%', right: '22%', scale: 1.3, zIndex: 0 },
  { layer: 'midground', top: '95%', left: '25%', scale: 1.4, zIndex: 0 },
  { layer: 'midground', top: '5%', left: '40%', scale: 1.2, zIndex: 0 }, // New
  { layer: 'midground', top: '50%', right: '5%', scale: 1.5, zIndex: 0 }, // New
  { layer: 'midground', top: '30%', left: '45%', scale: 1.1, zIndex: 0 }, // New

  // Background (Many small ones for vastness)
  { layer: 'background', top: '10%', left: '30%', scale: 0.7, zIndex: -5, opacity: 0.6, blur: '2px' },
  { layer: 'background', top: '18%', right: '35%', scale: 0.6, zIndex: -5, opacity: 0.7, blur: '2px' },
  { layer: 'background', top: '28%', left: '25%', scale: 0.8, zIndex: -5, opacity: 0.5, blur: '1px' },
  { layer: 'background', top: '38%', right: '30%', scale: 0.7, zIndex: -5, opacity: 0.6, blur: '2px' },
  { layer: 'background', top: '48%', left: '35%', scale: 0.6, zIndex: -5, opacity: 0.5, blur: '3px' },
  { layer: 'background', top: '58%', right: '40%', scale: 0.8, zIndex: -5, opacity: 0.6, blur: '1px' },
  { layer: 'background', top: '68%', left: '40%', scale: 0.5, zIndex: -5, opacity: 0.5, blur: '3px' },
  { layer: 'background', top: '75%', right: '45%', scale: 0.6, zIndex: -5, opacity: 0.6, blur: '2px' },
  { layer: 'background', top: '85%', left: '50%', scale: 0.6, zIndex: -5, opacity: 0.5, blur: '2px' },
  { layer: 'background', top: '92%', right: '35%', scale: 0.7, zIndex: -5, opacity: 0.6, blur: '2px' },
  { layer: 'background', top: '22%', left: '5%', scale: 0.5, zIndex: -5, opacity: 0.5, blur: '3px' }, // New
  { layer: 'background', top: '65%', right: '2%', scale: 0.6, zIndex: -5, opacity: 0.6, blur: '2px' }, // New
  { layer: 'background', top: '12%', right: '10%', scale: 0.5, zIndex: -5, opacity: 0.5, blur: '3px' }, // New
  { layer: 'background', top: '42%', left: '2%', scale: 0.5, zIndex: -5, opacity: 0.5, blur: '3px' }, // New
];

export const FloatingIcons: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const iconConfig = isMobile ? mobileIcons : desktopIcons;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {iconConfig.map((config, i) => {
        const animal = animals[i % animals.length];
        const duration = 4 + Math.random() * 3;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={`icon-${i}`}
            style={{
              position: 'absolute',
              top: config.top,
              left: config.left,
              right: config.right,
              width: '100px',
              height: '100px',
              zIndex: config.zIndex,
              opacity: config.opacity || 1,
              filter: config.blur ? `blur(${config.blur})` : 'none',
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>
              <img
                src={`/images/animals/${animal}`}
                alt="animal"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `scale(${config.scale})`
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
