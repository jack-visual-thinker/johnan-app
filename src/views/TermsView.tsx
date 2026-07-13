import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import startBtnImg from '../assets/button.png';

type Props = {
  onAgree: () => void;
  onBack: () => void;
};

// 大切な箇所を強調する太字ヘルパー
const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ fontWeight: 700, color: '#C05621' }}>{children}</strong>
);

// 使用上の注意点（ラベリング問題の解決案として伝える内容）
const NOTICES: { img: string; title: string; body: React.ReactNode }[] = [
  {
    img: '/images/terms/hojosen.png',
    title: 'タイプ分類は「補助線」です',
    body: (
      <>
        この診断のラベリング（タイプ分類）は、<B>あなたを決めつけるものではありません</B>。
        お互いを理解するための<B>「補助線」</B>、<B>対話のきっかけ</B>として使ってください。
      </>
    ),
  },
  {
    img: '/images/terms/omikuji.png',
    title: 'おみくじのようなものです',
    body: (
      <>
        結果は、その時どきの<B>暫定的なもの</B>。<B>正確にあなたを言い当てるものではありません</B>。
        気分や状況で変わる「今日のあなた」を映すおみくじ感覚で楽しんでください。
      </>
    ),
  },
  {
    img: '/images/terms/data.png',
    title: '入力データを収集します',
    body: (
      <>
        お名前・メールアドレス・診断結果などの個人データを記録・収集します。
        <B>社内での相互理解とサービス改善のために利用します</B>。
      </>
    ),
  },
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

export const TermsView: React.FC<Props> = ({ onAgree, onBack }) => {
  const [agreed, setAgreed] = useState(false);
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
          診断をはじめる前に
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-sub)', margin: 0 }}>
          ＼ 使用上の注意点をチェックしてね ／
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
        {NOTICES.map((n, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              paddingBottom: i < NOTICES.length - 1 ? '1.2rem' : 0,
              marginBottom: i < NOTICES.length - 1 ? '1.2rem' : 0,
              borderBottom: i < NOTICES.length - 1 ? '1px dashed #EFE7D2' : 'none',
            }}
          >
            <Art src={n.img} size={130} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: '#D97706',
                  marginBottom: '0.3rem',
                }}
              >
                {n.title}
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>{n.body}</p>
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
          上記の注意点を確認し、同意しました
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
          <AlertCircle size={16} /> 同意のチェックを入れると診断に進めます
        </motion.p>
      )}

      {/* ボタン */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center', marginTop: '0.5rem' }}>
        <button
          onClick={handleStart}
          disabled={!agreed}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            opacity: agreed ? 1 : 0.45,
            cursor: agreed ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s',
          }}
        >
          <img
            src={startBtnImg}
            alt="診断をはじめる"
            style={{ width: '100%', maxWidth: '280px', display: 'block' }}
          />
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
          戻る
        </button>
      </div>
    </motion.div>
  );
};
