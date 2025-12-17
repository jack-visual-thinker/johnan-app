import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { calculateScores, determineAnimal, generateAIComment, PARAM_LABELS } from '../logic/diagnosis';
import { LEGEND_EPISODES } from '../data/legends';
import type { ParameterKey } from '../data/questions';

type Props = {
  answers: Record<number, number>;
  onRetry: () => void;
};

const RadarChart = ({ data }: { data: Record<ParameterKey, number> }) => {
  const keys = Object.keys(data) as ParameterKey[];
  const numPoints = keys.length;
  const radius = 100;
  const center = 110;
  
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
    // value 0-10 -> 0-radius
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return [x, y];
  };

  const points = keys.map((key, i) => getPoint(i, data[key])).map(p => p.join(',')).join(' ');
  const bgPoints = keys.map((_, i) => getPoint(i, 10)).map(p => p.join(',')).join(' ');

  return (
    <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
      <svg viewBox="0 0 220 220">
        {/* Background Grid */}
        <polygon points={bgPoints} fill="#f0f0f0" stroke="#ddd" strokeWidth="1" />
        {[7, 4].map(scale => (
           <polygon 
             key={scale}
             points={keys.map((_, i) => getPoint(i, scale)).map(p => p.join(',')).join(' ')} 
             fill="none" 
             stroke="#eee" 
             strokeWidth="1" 
           />
        ))}
        {/* Data */}
        <polygon points={points} fill="rgba(231, 111, 81, 0.5)" stroke="var(--color-primary)" strokeWidth="2" />
        {/* Labels */}
        {keys.map((key, i) => {
           const [x, y] = getPoint(i, 12); // Slightly outside (value 12)
           return (
             <text 
               key={key} 
               x={x} 
               y={y} 
               fontSize="8" 
               textAnchor="middle" 
               dominantBaseline="middle"
               fill="#666"
             >
               {PARAM_LABELS[key]}
             </text>
           );
        })}
      </svg>
    </div>
  );
};

export const ResultView: React.FC<Props> = ({ answers, onRetry }) => {
  const [loading, setLoading] = useState(true);

  // Memoize calculation
  const { animal, scores, comment } = useMemo(() => {
    const s = calculateScores(answers);
    const a = determineAnimal(s);
    const c = generateAIComment(s, a);
    return { animal: a, scores: s, comment: c };
  }, [answers]);

  const episodes = LEGEND_EPISODES[animal.id] || [];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '4rem 0' }}>
        <motion.div
           animate={{ rotate: 360, scale: [1, 1.2, 1] }}
           transition={{ duration: 1.5, repeat: Infinity }}
           style={{ fontSize: '4rem' }}
        >
          🔍
        </motion.div>
        <h2 className="fade-in">じょじょ博士が診断中...</h2>
      </div>
    );
  }

  return (
    <motion.div 
      className="result-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="card" style={{ borderTop: '8px solid var(--color-primary)' }}>
        <p style={{ fontWeight: 'bold', color: '#888' }}>あなたのレジェンドタイプは...</p>
        <h1 style={{ fontSize: '2rem', margin: '0.5rem 0', color: 'var(--color-primary)' }}>
          {animal.name}
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>
          {animal.catchphrase}
        </p>
        <p style={{ margin: '1.5rem 0', lineHeight: '1.8', textAlign: 'left' }}>
          {animal.description}
        </p>

        <div style={{ margin: '2rem 0' }}>
          <h3>あなたのパラメーター</h3>
          <RadarChart data={scores} />
        </div>
      </div>

      <div className="card" style={{ background: '#F0FFF4', border: '2px solid #C6F6D5' }}>
        <h3 style={{ color: '#276749' }}>🦁 じょじょ博士のコメント</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '3rem' }}>👴</div>
          <p style={{ textAlign: 'left', margin: 0, fontWeight: '500' }}>
            {comment}
          </p>
        </div>
      </div>

      <div className="card">
        <h3>✨ あなたの中のレジェンド魂</h3>
        <p><strong>{animal.legendName}</strong> ({animal.legendRole})</p>
        
        <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
          {episodes.map((ep, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 'bold', color: 'var(--color-secondary)' }}>{ep.title}</div>
              <div style={{ fontSize: '0.95rem', color: '#555' }}>{ep.content}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn" onClick={onRetry} style={{ marginBottom: '3rem' }}>
        もう一度診断する
      </button>
    </motion.div>
  );
};
