import React from 'react';
import { motion } from 'framer-motion';

const animals = [
  'ant.png', 'bull.png', 'camel.png', 'deer.png', 
  'donkey.png', 'dove.png', 'eagle.png', 'fish.png', 
  'horse.png', 'lamb.png', 'lion.png', 'serpent.png'
];

// Predefined position zones to avoid central content (approx center 60% is content)
// We want items on Left (0-15%), Right (85-100%), and scattered vertically.
const positions = [
  { top: '5%', left: '5%' },
  { top: '15%', right: '5%' },
  { top: '25%', left: '8%' },
  { top: '35%', right: '8%' },
  { top: '45%', left: '2%' },
  { top: '55%', right: '3%' },
  { top: '65%', left: '7%' },
  { top: '75%', right: '6%' },
  { top: '85%', left: '4%' },
  { top: '10%', right: '12%' }, 
  { top: '90%', right: '10%' },
  { top: '50%', left: '12%' },
];

export const FloatingIcons: React.FC = () => {
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
      {animals.map((animal, i) => {
        const pos = positions[i % positions.length];
        // Randomize delay and duration slightly
        const duration = 3 + Math.random() * 2; 
        const delay = Math.random() * 2;
        
        return (
          <motion.div
            key={animal}
            style={{
              position: 'absolute',
              ...pos,
              width: '100px', 
              height: '100px',
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay
            }}
          >
            <div style={{
              background: '#fff',
              borderRadius: '50%',
              padding: '0',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>
                <img 
                src={`/images/animals/${animal}`} 
                alt="animal" 
                style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} 
                />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
