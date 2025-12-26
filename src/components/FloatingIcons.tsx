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

// Mobile Configuration - Optimized & Redistributed (Top/Bottom Heavy)
// Mobile Configuration - Heavily Reduced for Performance (Approx. 8 icons)
const mobileIcons: IconConfig[] = [
  // --- Header Area ---
  { layer: 'foreground', top: '5%', left: '5%', scale: 1.8, zIndex: 10 },
  { layer: 'midground', top: '22%', right: '25%', scale: 1.1, zIndex: 0 },
  { layer: 'background', top: '12%', right: '40%', scale: 0.6, zIndex: -5, opacity: 0.8 },

  // --- Middle Area (Sparse) ---
  { layer: 'midground', top: '50%', right: '2%', scale: 1.0, zIndex: 0 },

  // --- Footer Area ---
  { layer: 'foreground', top: '78%', left: '5%', scale: 1.7, zIndex: 10 },
  { layer: 'midground', top: '92%', right: '35%', scale: 1.0, zIndex: 0 },
  { layer: 'background', top: '80%', left: '40%', scale: 0.6, zIndex: -5, opacity: 0.8 },
  { layer: 'background', top: '90%', right: '20%', scale: 0.5, zIndex: -5, opacity: 0.8 },
];

// Desktop Configuration - Wide Screen Optimized
const desktopIcons: IconConfig[] = [
  // --- Left Side (0% - 25%) ---
  { layer: 'foreground', top: '10%', left: '5%', scale: 3.0, zIndex: 10 },
  { layer: 'foreground', top: '45%', left: '2%', scale: 2.8, zIndex: 10 },
  { layer: 'foreground', top: '80%', left: '8%', scale: 2.6, zIndex: 10 },
  { layer: 'midground', top: '25%', left: '15%', scale: 1.5, zIndex: 0 },
  { layer: 'midground', top: '60%', left: '12%', scale: 1.4, zIndex: 0 },
  { layer: 'midground', top: '90%', left: '20%', scale: 1.3, zIndex: 0 },
  { layer: 'background', top: '5%', left: '20%', scale: 0.8, zIndex: -5, opacity: 0.6 },
  { layer: 'background', top: '35%', left: '8%', scale: 0.7, zIndex: -5, opacity: 0.5 },
  { layer: 'background', top: '70%', left: '5%', scale: 0.6, zIndex: -5, opacity: 0.6 },

  // --- Right Side (75% - 100%) ---
  { layer: 'foreground', top: '15%', right: '5%', scale: 3.2, zIndex: 10 },
  { layer: 'foreground', top: '50%', right: '3%', scale: 2.9, zIndex: 10 },
  { layer: 'foreground', top: '85%', right: '8%', scale: 2.7, zIndex: 10 },
  { layer: 'midground', top: '30%', right: '15%', scale: 1.6, zIndex: 0 },
  { layer: 'midground', top: '65%', right: '12%', scale: 1.5, zIndex: 0 },
  { layer: 'midground', top: '95%', right: '20%', scale: 1.4, zIndex: 0 },
  { layer: 'background', top: '8%', right: '22%', scale: 0.7, zIndex: -5, opacity: 0.6 },
  { layer: 'background', top: '40%', right: '10%', scale: 0.6, zIndex: -5, opacity: 0.5 },
  { layer: 'background', top: '75%', right: '6%', scale: 0.8, zIndex: -5, opacity: 0.6 },

  // --- Scattered Background (Vastness, avoiding center content blockage) ---
  { layer: 'background', top: '2%', left: '40%', scale: 0.5, zIndex: -5, opacity: 0.4 },
  { layer: 'background', top: '95%', left: '45%', scale: 0.6, zIndex: -5, opacity: 0.4 },
  { layer: 'midground', top: '12%', left: '30%', scale: 0.9, zIndex: -1 },
  { layer: 'midground', top: '88%', right: '30%', scale: 1.0, zIndex: -1 },
  // Edges of content area
  { layer: 'background', top: '20%', left: '26%', scale: 0.7, zIndex: -5, opacity: 0.5 },
  { layer: 'background', top: '60%', right: '26%', scale: 0.6, zIndex: -5, opacity: 0.5 },
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
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
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
              // Blur removed for performance
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
