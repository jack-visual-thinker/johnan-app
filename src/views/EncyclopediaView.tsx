import React from 'react';
import { motion } from 'framer-motion';

const animals = [
  { id: 'snake', name: 'ヘビ', image: '/images/snake.png', description: '慎重で観察力に優れたタイプ' },
  { id: 'sheep', name: 'ヒツジ', image: '/images/sheep.png', description: '協調性があり、優しいタイプ' },
  { id: 'pigeon', name: 'ハト', image: '/images/pigeon.png', description: '平和を愛し、穏やかなタイプ' },
  { id: 'lion', name: 'ライオン', image: '/images/lion.png', description: 'リーダーシップがあり、勇敢なタイプ' },
];

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
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {animals.map((animal, index) => (
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
                background: '#F9F9F9'
              }}>
                <img 
                  src={animal.image} 
                  alt={animal.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
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
                lineHeight: 1.6
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
            ※ 他にも様々な動物タイプがあります。<br />
            診断を受けて、あなたの動物を見つけてください！
          </p>
        </div>
      </motion.div>
    </div>
  );
};
