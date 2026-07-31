import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw } from 'lucide-react';
import { calculateScores, determineAnimal } from '../logic/diagnosis';
import { generateResultCard } from '../logic/cardImages';
import { LEGEND_EPISODES } from '../data/legends';
import type { ParameterKey } from '../data/questions';
import { LoadingView } from './LoadingView';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/LanguageContext';
import {
  getDoctorComment,
  getLegendEpisodes,
  localizeAnimal,
  PARAM_LABELS_BY_LANGUAGE,
  RESULT_COPY,
} from '../i18n/content';

type Props = {
  answers: Record<number, number>;
  onRetry: () => void;
  nickname: string;
};

const formatDisplayName = (nickname: string, language: Language, fallbackName: string) => {
  const trimmed = nickname.trim() || fallbackName;
  if (language === 'en') return trimmed;
  return trimmed.endsWith('さん') ? trimmed : `${trimmed}さん`;
};

const safeFilenamePart = (value: string) => {
  const normalized = value
    .normalize('NFKC')
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\p{Cc}/gu, '_')
    .replace(/\s+/g, '_')
    .replace(/[. ]+$/g, '')
    .slice(0, 50);
  return normalized || 'じょうずかん';
};

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const RadarChart = ({
  data,
  language,
}: {
  data: Record<ParameterKey, number>;
  language: Language;
}) => {
  const parameterLabels = PARAM_LABELS_BY_LANGUAGE[language];
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
              {parameterLabels[key]}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export const ResultView: React.FC<Props> = ({ answers, onRetry, nickname }) => {
  const { language } = useLanguage();
  const copy = RESULT_COPY[language];
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const { animal, scores, comment } = useMemo(() => {
    const s = calculateScores(answers);
    const a = localizeAnimal(determineAnimal(s), language);
    const c = getDoctorComment(s, language);
    return { animal: a, scores: s, comment: c };
  }, [answers, language]);

  const episodes = getLegendEpisodes(LEGEND_EPISODES, animal.id, language);
  const parameterLabels = PARAM_LABELS_BY_LANGUAGE[language];

  // Sort scores to find top 3 strengths for the "Connection" text
  const topStrengths = useMemo(() => {
    return (Object.entries(scores) as [ParameterKey, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => parameterLabels[key]);
  }, [scores, parameterLabels]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Helper for 3-part title
  // animal.name format: 「Catchphrase」じょうずなAnimalName
  const nameParts = language === 'ja' ? animal.name.split('じょうずな') : [];
  const catchphraseMain = language === 'ja'
    ? (nameParts[0] ? nameParts[0].replace(/[「」]/g, '') : '')
    : animal.catchphrase;
  const animalNameOnly = language === 'ja' ? (nameParts[1] || animal.name) : animal.name;
  const displayName = formatDisplayName(nickname, language, copy.fallbackName);
  const mainFeatures = [
    copy.featureOne(catchphraseMain),
    copy.featureTwo(topStrengths[0]),
  ];
  const recommendation = copy.recommendationBody(topStrengths[0]);

  const handleSaveImage = async () => {
    if (isSaving) return;

    setIsSaving(true);
    setSaveMessage(copy.creating);

    try {
      const blob = await generateResultCard(animal, {
        displayName,
        summary: animal.description,
        features: mainFeatures,
        strengths: topStrengths,
        recommendation,
        language,
        labels: copy.card,
      });
      const filename = language === 'ja'
        ? `${safeFilenamePart(nickname)}_${safeFilenamePart(animal.name)}タイプ_${copy.filenameSuffix}.png`
        : `${safeFilenamePart(nickname)}_${safeFilenamePart(animal.name)}_${copy.filenameSuffix}.png`;
      const file = new File([blob], filename, { type: 'image/png' });
      const isMobileLike = window.matchMedia('(pointer: coarse)').matches
        || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const canShareFile = isMobileLike
        && typeof navigator.share === 'function'
        && typeof navigator.canShare === 'function'
        && navigator.canShare({ files: [file] });

      if (canShareFile) {
        try {
          await navigator.share({
            title: copy.shareTitle,
            text: copy.shareText(displayName),
            files: [file],
          });
          setSaveMessage(copy.shared);
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            setSaveMessage(copy.shareCancelled);
            return;
          }
        }
      }

      downloadBlob(blob, filename);
      setSaveMessage(copy.saved);
    } catch (error) {
      console.error('Result card generation failed:', error);
      setSaveMessage(copy.saveFailed);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingView />;
  }

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
          {copy.typeIntro(displayName)}
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
                maxWidth: 'calc(100vw - 32px)',
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
              <RefreshCw size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> {copy.flipHint}
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
              <RadarChart data={scores} language={language} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ③ ニックネーム入り診断結果タイトル */}
      <div style={{ textAlign: 'center', margin: '0 auto 2rem', maxWidth: '680px' }}>
        <h1 style={{ fontSize: 'clamp(1.35rem, 4vw, 1.8rem)', fontWeight: 'bold', color: '#5D4037', lineHeight: 1.6 }}>
          {copy.titlePrefix(displayName)}<br />
          <span style={{ color: '#D97706' }}>{copy.titleResult(animal.name)}</span>
        </h1>
        <div style={{ marginTop: '0.9rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#8D7456' }}>
          {copy.diagnosisType}
        </div>
        <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#D97706', lineHeight: 1.2 }}>
          {animalNameOnly}
        </div>
      </div>

      {/* ④ 診断結果の要約 */}
      <section
        aria-labelledby="result-summary-title"
        style={{
          maxWidth: '600px',
          margin: '0 auto 3rem',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '24px',
          padding: '1.5rem',
          boxShadow: '0 5px 16px rgba(93,64,55,0.08)',
        }}
      >
        <h2 id="result-summary-title" style={{ fontSize: '1.25rem', color: '#B45309', marginBottom: '0.7rem' }}>
          {copy.summary}
        </h2>
        <p style={{ margin: '0 0 1.3rem', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {animal.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
          <div style={{ background: '#FFF7E0', borderRadius: '16px', padding: '1rem' }}>
            <h3 style={{ color: '#B45309', fontSize: '1rem', marginBottom: '0.6rem' }}>{copy.features}</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.8, fontSize: '0.92rem' }}>
              {mainFeatures.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>

          <div style={{ background: '#FFF7E0', borderRadius: '16px', padding: '1rem' }}>
            <h3 style={{ color: '#B45309', fontSize: '1rem', marginBottom: '0.6rem' }}>{copy.strengths}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {topStrengths.map((strength) => (
                <span key={strength} style={{ background: 'white', border: '1px solid #F2C66D', borderRadius: '999px', padding: '0.35rem 0.65rem', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '0.9rem', background: '#F7F1E4', borderRadius: '16px', padding: '1rem' }}>
          <h3 style={{ color: '#B45309', fontSize: '1rem', marginBottom: '0.45rem' }}>{copy.recommendation}</h3>
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: '0.92rem' }}>{recommendation}</p>
        </div>
      </section>

      {/* ⑤ 上図鑑博士からの解説 (Doctor) */}
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
            <img src="/jojoen_stuff.png" alt={copy.doctor} style={{ width: '150%', height: '150%', objectFit: 'cover' }} />
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
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#9CA3AF' }}>{copy.doctor}</h4>
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
            {copy.similarLegend}
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
              src={animal.legendIcon}
              alt={animal.legendName}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
            <img src="/jojoen_stuff.png" alt={copy.doctor} style={{ width: '150%', height: '150%', objectFit: 'cover' }} />
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

          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#C05621' }}>{copy.connection}</h4>
          <p style={{ margin: 0, lineHeight: 1.8, fontSize: '0.95rem' }}>
            {copy.connectionBody(animal.legendName, animal.catchphrase, topStrengths[0])}
          </p>
        </div>
      </div>

      {/* ⑥.5 おみくじフォローアップ (この結果は暫定的なもの) */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 3rem auto',
        background: '#FFFDF5',
        borderRadius: '20px',
        padding: '1.2rem 1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        {/* 正方形の座布団＋イラスト */}
        <div style={{
          flexShrink: 0,
          width: '180px',
          height: '180px',
          borderRadius: '24px',
          background: '#EFE7D4',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="/images/result.png" alt="" style={{ width: '128%', height: '128%', objectFit: 'contain' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '0.95rem', color: '#B45309' }}>
            {copy.fortuneTitle}
          </h4>
          <p style={{ margin: 0, lineHeight: 1.9, fontSize: '0.9rem', color: '#7C6240' }}>
            {copy.fortuneBody}
          </p>
        </div>
      </div>

      {/* ⑦ アクションボタン (Actions) */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={handleSaveImage}
          disabled={isSaving}
          style={{
            width: '280px',
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '9999px',
            background: '#F4C430',
            color: '#5D4037',
            cursor: isSaving ? 'wait' : 'pointer',
            opacity: isSaving ? 0.7 : 1,
            boxShadow: '0 4px 0 #D9A300',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Download size={20} /> {isSaving ? copy.saving : copy.save}
        </button>

        {saveMessage && (
          <p role="status" aria-live="polite" style={{ margin: '-0.2rem 0 0', color: '#6B5439', fontSize: '0.85rem' }}>
            {saveMessage}
          </p>
        )}

        <button
          onClick={onRetry}
          style={{
            background: 'none', border: 'none', textDecoration: 'underline', color: '#666', marginTop: '1rem', cursor: 'pointer'
          }}
        >
          {copy.retry}
        </button>
      </div>

    </motion.div>
  );
};
