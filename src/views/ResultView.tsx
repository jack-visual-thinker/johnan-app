import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Share2, RefreshCw, Quote, Sparkles, BookOpen } from 'lucide-react';
import { calculateScores, determineAnimal, generateAIComment, PARAM_LABELS } from '../logic/diagnosis';
import { LEGEND_EPISODES } from '../data/legends';
import type { ParameterKey } from '../data/questions';
import { LoadingView } from './LoadingView';

type Props = {
  answers: Record<number, number>;
  onRetry: () => void;
  userData: { name: string; email: string } | null;
};

const RadarChart = ({ data }: { data: Record<ParameterKey, number> }) => {
  const keys = Object.keys(data) as ParameterKey[];
  const numPoints = keys.length;
  const radius = 80; // Smaller radius to fit design
  const center = 100;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return [x, y];
  };

  const points = keys.map((key, i) => getPoint(i, data[key])).map(p => p.join(',')).join(' ');
  const bgPoints = keys.map((_, i) => getPoint(i, 10)).map(p => p.join(',')).join(' ');

  return (
    <div style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
      <svg viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
        {/* Background Grid */}
        <polygon points={bgPoints} fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
        {[7, 4].map(scale => (
          <polygon
            key={scale}
            points={keys.map((_, i) => getPoint(i, scale)).map(p => p.join(',')).join(' ')}
            fill="none"
            stroke="#F3F4F6"
            strokeWidth="1"
          />
        ))}
        {/* Data */}
        <polygon points={points} fill="rgba(240, 165, 0, 0.4)" stroke="var(--color-primary)" strokeWidth="2" />

        {/* Labels */}
        {keys.map((key, i) => {
          const [x, y] = getPoint(i, 13);
          return (
            <text
              key={key}
              x={x}
              y={y}
              fontSize="9"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#6B7280"
            >
              {PARAM_LABELS[key]}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export const ResultView: React.FC<Props> = ({ answers, onRetry, userData }) => {
  const [loading, setLoading] = useState(true);
  // userData will be used in Phase 2 for email functionality
  console.log("User data:", userData);

  const { animal, scores, comment } = useMemo(() => {
    const s = calculateScores(answers);
    const a = determineAnimal(s);
    const c = generateAIComment(s, a);
    return { animal: a, scores: s, comment: c };
  }, [answers]);

  const episodes = LEGEND_EPISODES[animal.id] || [];

  // Sort scores to find top 3 strengths
  const topStrengths = useMemo(() => {
    return (Object.entries(scores) as [ParameterKey, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => PARAM_LABELS[key]);
  }, [scores]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingView />;
  }

  return (
    <motion.div
      className="result-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '99px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <BookOpen size={16} color="var(--color-primary)" />
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>じょうずかん</span>
          <span style={{ fontSize: '0.8rem', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', color: '#666' }}>JOHNAN動物診断</span>
        </div>
      </div>

      {/* Main Result Card (Orange) */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #F4A261, #E76F51)',
        color: 'white',
        textAlign: 'center',
        padding: '3rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.3)',
          backdropFilter: 'blur(4px)',
          padding: '0.5rem 1.5rem',
          borderRadius: '99px',
          display: 'inline-block',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}>
          あなたのタイプは...
        </div>

        <div style={{ marginBottom: '1rem' }}>
          {/* Placeholder for Animal Image if exists, else Emoji */}
          <div style={{
            fontSize: '6rem',
            background: 'white',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
            <img
              src={`/images/${animal.id}.png`}
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = '🦁'; }}
              alt={animal.name}
              style={{ width: '170%', height: '170%', objectFit: 'contain' }}
            />
          </div>
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: 1.4, margin: '1rem 0', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          「{animal.catchphrase.split('」')[0].replace('「', '')}」<br />
          {animal.catchphrase.split('」')[1]}
        </h1>

        <Quote size={32} style={{ opacity: 0.8, marginTop: '1rem' }} />
      </div>

      {/* Description Text */}
      <div style={{ textAlign: 'center', margin: '2rem auto', maxWidth: '600px', lineHeight: 2, color: '#4B5563' }}>
        {animal.description}
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Chart */}
        <div className="card" style={{ padding: '2rem 1rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>パワーチャート</h3>
          <RadarChart data={scores} />
        </div>

        {/* Doctor Comment */}
        <div className="card" style={{ background: '#F8F9FA', border: '2px solid #E9ECEF' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>👴</span> じょじょ博士のひとこと
          </h3>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
            <p style={{ margin: 0, lineHeight: 1.8, color: '#4B5563' }}>{comment}</p>
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#F59E0B' }}>
          <Sparkles size={20} /> あなたのすごいところ <Sparkles size={20} />
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {topStrengths.map((str, i) => (
            <span key={str} style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              <span style={{ color: '#F59E0B', marginRight: '4px' }}>#{i + 1}</span> {str}
            </span>
          ))}
        </div>
      </div>

      {/* Legend Story Card */}
      <div className="card" style={{
        border: '3px solid var(--color-legend-card-border)',
        background: 'var(--color-legend-bg)',
        padding: '0'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #FDE68A' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#B45309', textTransform: 'uppercase' }}>JOHNAN LEGEND STORY</div>
          <h3 style={{ color: '#D97706', fontSize: '1.3rem' }}>あなたと似ているレジェンド</h3>
        </div>

        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
              background: '#F3F4F6',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minWidth: '200px'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#6B7280', letterSpacing: '1px' }}>NAME</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{animal.legendName}</div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#6B7280', background: '#E5E7EB', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', margin: '0.5rem auto 0 auto' }}>
                {animal.legendRole}
              </div>
            </div>

            <div style={{ textAlign: 'left', flex: 1 }}>
              {episodes.map((ep, i) => (
                <div key={i} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#D97706', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', background: '#D97706', borderRadius: '50%' }}></span>
                    {ep.title.replace(/[【】]/g, '')}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#374151', lineHeight: 1.8 }}>
                    {ep.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connection Box */}
        <div style={{ background: '#FFF7ED', padding: '1.5rem', margin: '1rem', borderRadius: '12px', border: '1px dashed #FDBA74' }}>
          <h4 style={{ color: '#C05621', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} /> キミとのつながり
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#4B5563', margin: 0 }}>
            {animal.legendName}さんは、{animal.catchphrase}のような人じゃ。
            あなたの中から湧き出る「{topStrengths[0]}」は、まさに{animal.legendName}さんの生きた証と重なるじゃろう！
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', paddingBottom: '3rem' }}>
        <button className="btn-outline" onClick={onRetry} style={{ padding: '0.8rem 1.5rem' }}>
          <RefreshCw size={18} /> 最初からやる
        </button>
        <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>
          <Share2 size={18} /> みんなに教える
        </button>
      </div>

      <footer style={{ marginTop: '2rem', textAlign: 'center', color: '#AAA', fontSize: '0.8rem' }}>
        &copy; JOJOEN 飼育委員会
      </footer>
    </motion.div>
  );
};
