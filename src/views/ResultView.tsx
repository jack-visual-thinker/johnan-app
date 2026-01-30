import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2, RefreshCw, BookOpen } from 'lucide-react';
import { calculateScores, determineAnimal, generateAIComment, PARAM_LABELS } from '../logic/diagnosis';
import { LEGEND_EPISODES } from '../data/legends';
import type { ParameterKey } from '../data/questions';
import { LoadingView } from './LoadingView';

// Google Apps Script Web App URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyQqXCkFKHT2YDLcFoHYc3JpRYiQJSmKq1A7i0acCX3yyCV7-D6JqtJVCe1YHNquOzeKQ/exec';

type Props = {
  answers: Record<number, number>;
  onRetry: () => void;
  userData: { name: string; email: string } | null;
};

const RadarChart = ({ data }: { data: Record<ParameterKey, number> }) => {
  // Explicitly defining the order here prevents any import/build issues affecting chart rotation.
  // This order ensures 'Warmth' is at 12 o'clock (-90 degrees).
  const keys: ParameterKey[] = [
    'Warmth',
    'Responsibility',
    'UniversalTruth',
    'DivineGuidance',
    'Mission',
    'HeavenlyWork',
    'Thoroughness',
    'Innovation',
    'Respect',
  ];
  const numPoints = keys.length;
  // Further reduce chart radius to make room for labels inside the 200x200 viewbox
  const radius = 60;
  const center = 100;
  const maxScore = 20;

  const getPoint = (index: number, value: number) => {
    // Cap value at maxScore for visual consistency
    const cappedValue = Math.min(Math.max(value, 0), maxScore);
    const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
    const r = (cappedValue / maxScore) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return [x, y];
  };

  const points = keys.map((key, i) => getPoint(i, data[key])).map(p => p.join(',')).join(' ');
  const bgPoints = keys.map((_, i) => getPoint(i, maxScore)).map(p => p.join(',')).join(' ');

  return (
    <div style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
      <svg viewBox="0 0 200 200" style={{ overflow: 'visible', display: 'block', margin: '0 auto' }}>
        {/* Background Grid: 20, 15, 10, 5 */}
        <polygon points={bgPoints} fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
        {[15, 10, 5].map(scale => (
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

        {/* Labels - Positioned closer to center to stay within bounds */}
        {keys.map((key, i) => {
          const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
          // Distance for label optimized to fit inside the circle container
          const labelR = radius * 1.35;
          const x = center + labelR * Math.cos(angle);
          const y = center + labelR * Math.sin(angle);

          return (
            <text
              key={key}
              x={x}
              y={y}
              fontSize="8" // Keep small font size
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#6B7280"
              style={{ fontWeight: 500 }}
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
  const [isFlipped, setIsFlipped] = useState(false);
  const hasSentData = useRef(false);

  // userData will be used in Phase 2 for email functionality
  console.log("User data:", userData);

  const { animal, scores, comment } = useMemo(() => {
    const s = calculateScores(answers);
    const a = determineAnimal(s);
    const c = generateAIComment(s, a);
    return { animal: a, scores: s, comment: c };
  }, [answers]);

  const episodes = LEGEND_EPISODES[animal.id] || [];

  // Sort scores to find top 3 strengths for the "Connection" text
  const topStrengths = useMemo(() => {
    return (Object.entries(scores) as [ParameterKey, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => PARAM_LABELS[key]);
  }, [scores]);

  useEffect(() => {
    // Send data to GAS (only once)
    if (!hasSentData.current && userData) {
      hasSentData.current = true;

      const payload = {
        name: userData.name,
        email: userData.email,
        animal: animal.name,
        scores: scores
      };

      fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for GAS
        headers: {
          'Content-Type': 'text/plain', // Avoid preflight
        },
        body: JSON.stringify(payload),
      }).then(() => {
        console.log('Result sent to Google Sheets');
      }).catch(err => {
        console.error('Failed to send result:', err);
      });
    }

    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures run once on mount

  if (loading) {
    return <LoadingView />;
  }

  // Helper for 3-part title
  // animal.name format: 「Catchphrase」じょうずなAnimalName
  const nameParts = animal.name.split('じょうずな');
  const catchphraseMain = nameParts[0] ? nameParts[0].replace(/[「」]/g, '') : '';
  const animalNameOnly = nameParts[1] || animal.name;

  return (
    <motion.div
      className="result-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ paddingBottom: '4rem', color: '#5D4037' }}
    >
      {/* ① 導入メッセージ (Intro Message) */}
      <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
        <div style={{
          display: 'inline-block',
          background: 'white',
          padding: '0.8rem 1.5rem',
          borderRadius: '24px',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          あなたのタイプは...
          {/* Simple balloon pointer */}
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid white'
          }} />
        </div>
      </div>

      {/* ② メインビジュアル / パワーチャート (Flip Card) */}
      <div
        style={{ perspective: '1000px', cursor: 'pointer', marginBottom: '2rem' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          style={{
            position: 'relative',
            width: '280px',
            height: '280px',
            margin: '0 auto',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front: Animal Image */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={`/images/${animal.id}.png`}
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerText = '🦁'; }}
              alt={animal.name}
              style={{
                width: '180%', // Approximating 2x size relative to container
                height: '180%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
              }}
            />
            {/* Hint to flip */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.8rem',
              opacity: 0.7,
              whiteSpace: 'nowrap'
            }}>
              <RefreshCw size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> タップで能力を見る
            </div>
          </div>

          {/* Back: Power Chart */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
              <RadarChart data={scores} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ③ 診断結果タイトル (3段構成) */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#8D7456', marginBottom: '0.2rem' }}>
          『{catchphraseMain}』
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#5D4037', marginBottom: '0.2rem' }}>
          じょうずな
        </div>
        <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#D97706', lineHeight: 1 }}>
          {animalNameOnly}
        </div>
      </div>

      {/* ④ 上図鑑博士からの解説 (Doctor) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        {/* Doctor Icon */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: '80px', height: '80px',
            background: '#E5E7EB', borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img src="/jojoen_stuff.png" alt="博士" style={{ width: '150%', height: '150%', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{
          background: 'white',
          padding: '1.2rem',
          borderRadius: '0 24px 24px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          flex: 1,
          position: 'relative'
        }}>
          {/* Bubble Triangle */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '-10px',
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: '10px solid white'
          }} />
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#9CA3AF' }}>じょうずかん博士</h4>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: '0.95rem' }}>{comment}</p>
        </div>
      </div>

      {/* ⑤ 似ているレジェンド紹介 (Legend) */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{
            display: 'inline-block',
            borderBottom: '2px solid #D97706',
            paddingBottom: '0.5rem',
            color: '#5D4037'
          }}>
            似ているレジェンド
          </h3>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          {/* Legend Image */}
          <div style={{
            width: '140px', height: '140px',
            background: '#FEF3C7', borderRadius: '50%',
            margin: '0 auto 1rem auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '4px solid white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <img
              src="/yamamoto_matsuo.png"
              alt="Legend"
              style={{ width: '180%', height: '180%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{animal.legendName}</div>
          <div style={{ fontSize: '0.9rem', color: '#92400E' }}>{animal.legendRole}</div>
        </div>

        <div style={{ maxWidth: '90%', margin: '0 auto' }}>
          {episodes.map((ep, i) => (
            <div key={i} style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.6)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ fontWeight: 'bold', color: '#D97706', marginBottom: '0.3rem' }}>
                {ep.title.replace(/[【】]/g, '')}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6 }}>{ep.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ⑥ キミとの繋がり (Connection) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        {/* Doctor Icon */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: '80px', height: '80px',
            background: '#E5E7EB', borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img src="/jojoen_stuff.png" alt="博士" style={{ width: '150%', height: '150%', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{
          background: '#FFF7ED',
          padding: '1.2rem',
          borderRadius: '0 24px 24px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          flex: 1,
          border: '1px solid #FDBA74',
          position: 'relative'
        }}>
          {/* Bubble Triangle */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '-10px',
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: '10px solid #FFF7ED'
          }} />
          {/* Border Triangle Outline (Optional tweak for perfect border, usually tricky with CSS triangles, keeping simple for now) */}

          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#C05621' }}>キミとの繋がり</h4>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: '0.95rem' }}>
            {animal.legendName}さんは、{animal.catchphrase}のような人じゃ。<br />
            あなたの中から湧き出る「{topStrengths[0]}」は、まさに{animal.legendName}さんの生きた証と重なるじゃろう！
          </p>
        </div>
      </div>

      {/* ⑦ アクションボタン (Actions) */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <button
          className="btn-primary"
          style={{
            width: '280px',
            padding: '1rem',
            fontSize: '1rem',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
            boxShadow: '0 4px 0 #B45309'
          }}
        >
          <BookOpen size={20} /> 画像を保存（模様を作る）
        </button>

        <button
          className="btn-outline"
          style={{
            width: '280px',
            padding: '0.8rem',
            background: 'rgba(255,255,255,0.8)'
          }}
        >
          <Share2 size={20} /> SNSでシェアする
        </button>

        <button
          onClick={onRetry}
          style={{
            background: 'none', border: 'none', textDecoration: 'underline', color: '#666', marginTop: '1rem', cursor: 'pointer'
          }}
        >
          トップに戻る
        </button>
      </div>

    </motion.div>
  );
};
