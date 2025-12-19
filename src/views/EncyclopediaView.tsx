import React from 'react';
import { motion } from 'framer-motion';
import { ANIMAL_TYPES } from '../data/types';

export const EncyclopediaView: React.FC = () => {
  return (
    <div className="encyclopedia-view" style={{ paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '900',
          color: 'var(--color-text)',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          愉快な仲間たちの動物集
        </h1>

        <p style={{
          textAlign: 'center',
          color: 'var(--color-text-sub)',
          marginBottom: '3rem',
          lineHeight: 1.8
        }}>
          診断結果として登場する動物たちを紹介します
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          padding: '0 1rem'
        }}>
          {ANIMAL_TYPES.map((animal, index) => (
            <motion.div
              key={animal.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                textAlign: 'center',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-lg)' }}
            >
              <div style={{
                width: '150px',
                height: '150px',
                margin: '0 auto 1rem auto',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#F9F9F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
              }}>
                <img
                  src={`/images/${animal.id}.png`}
                  alt={animal.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerText = '🦁'; // Emoji fallback
                    e.currentTarget.parentElement!.style.fontSize = '4rem';
                  }}
                  style={{
                    width: '170%',
                    height: '170%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                {animal.name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-sub)',
                lineHeight: 1.6,
                minHeight: '4.8em' // Align height for descriptions
              }}>
                {animal.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'var(--color-legend-bg)',
          borderRadius: 'var(--radius-md)'
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--color-text-sub)',
            lineHeight: 1.8
          }}>
            すべての動物たちに、それぞれの個性と魅力があります。<br />
            あなたの周りの人はどのタイプかな？
          </p>
        </div>
      </motion.div>
    </div>
  );
};
