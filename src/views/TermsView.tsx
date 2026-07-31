import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { TERMS_COPY } from '../i18n/content';

type Props = {
  initialAgreed: boolean;
  onAgree: () => void;
  onBack: () => void;
};

const NOTICE_IMAGES = [
  '/images/terms/hojosen.png',
  '/images/terms/omikuji.png',
  '/images/terms/data.png',
];

// 注意点イラスト（座布団＝丸角の背景パッドの上にアイコンを大きく乗せる）
const Art: React.FC<{ src: string; size?: number }> = ({ src, size = 130 }) => (
  <div
    style={{
      flexShrink: 0,
      width: size,
      height: size,
      borderRadius: '20px',
      background: '#EFE7D4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img src={src} alt="" style={{ width: '92%', height: '92%', objectFit: 'contain' }} />
  </div>
);

export const TermsView: React.FC<Props> = ({ initialAgreed, onAgree, onBack }) => {
  const { language } = useLanguage();
  const copy = TERMS_COPY[language];
  const [agreed, setAgreed] = useState(initialAgreed);
  const [showError, setShowError] = useState(false);

  const handleStart = () => {
    if (!agreed) {
      setShowError(true);
      return;
    }
    onAgree();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: '2.5rem 0 4rem 0',
        color: 'var(--color-text)',
      }}
    >
      {/* ヘッダー */}
      <div style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        background: 'white',
        borderRadius: '24px',
        padding: '1.3rem 1.5rem',
        boxShadow: 'var(--shadow-md)',
      }}>
        <h2
          style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            marginTop: 0,
            marginBottom: '0.3rem',
          }}
        >
          {copy.title}
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-sub)', margin: 0 }}>
          {copy.intro}
        </p>
      </div>

      {/* 注意点カード */}
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '1.5rem',
        }}
      >
        {copy.notices.map(([title, body], i) => (
          <div
            key={title}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              paddingBottom: i < copy.notices.length - 1 ? '1.2rem' : 0,
              marginBottom: i < copy.notices.length - 1 ? '1.2rem' : 0,
              borderBottom: i < copy.notices.length - 1 ? '1px dashed #EFE7D2' : 'none',
            }}
          >
            <Art src={NOTICE_IMAGES[i]} size={130} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: '#D97706',
                  marginBottom: '0.3rem',
                }}
              >
                {title}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 同意チェック */}
      <label
        htmlFor="agree-checkbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          background: agreed ? '#FFF7E0' : 'white',
          border: agreed ? '2px solid var(--color-primary)' : '2px solid #E5DFCB',
          borderRadius: '16px',
          padding: '1rem 1.2rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginBottom: '0.8rem',
        }}
      >
        <input
          id="agree-checkbox"
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            if (e.target.checked) setShowError(false);
          }}
          style={{ width: '22px', height: '22px', accentColor: '#D97706', cursor: 'pointer', flexShrink: 0 }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
          {copy.agreement}
        </span>
      </label>

      {showError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.3rem',
            color: '#DC2626',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            margin: '0 0 0.8rem 0',
          }}
        >
          <AlertCircle size={16} /> {copy.agreementError}
        </motion.p>
      )}

      {/* ボタン */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', marginTop: '0.5rem' }}>
        <button
          onClick={handleStart}
          disabled={!agreed}
          style={{
            width: '280px',
            background: '#F4C430',
            color: '#5D4037',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.9rem 1.2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            opacity: agreed ? 1 : 0.45,
            cursor: agreed ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s',
            boxShadow: agreed ? '0 4px 0 #D9A300' : 'none',
          }}
        >
          {copy.agreeAndBack}
        </button>

        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            textDecoration: 'underline',
            color: '#888',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          {copy.backWithoutAgreeing}
        </button>
      </div>
    </motion.div>
  );
};
