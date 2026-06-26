import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Sparkles } from 'lucide-react';

type Props = {
  onAgree: () => void;
  onBack: () => void;
};

// 大切な箇所を強調する太字ヘルパー
const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ fontWeight: 700, color: '#C05621' }}>{children}</strong>
);

// 使用上の注意点（ラベリング問題の解決案として伝える内容）
// イラストは「仮」のプレースホルダー。後でJackが正式な手描きイラストに差し替える想定。
const NOTICES: { emoji: string; title: string; body: React.ReactNode }[] = [
  {
    emoji: '🔍',
    title: 'タイプ分類は「補助線」です',
    body: (
      <>
        この診断のラベリング（タイプ分類）は、<B>あなたを決めつけるものではありません</B>。
        お互いを理解するための<B>「補助線」</B>、<B>対話のきっかけ</B>として使ってください。
      </>
    ),
  },
  {
    emoji: '🎐',
    title: 'おみくじのようなものです',
    body: (
      <>
        結果は、その時どきの<B>暫定的なもの</B>。<B>正確にあなたを言い当てるものではありません</B>。
        気分や状況で変わる「今日のあなた」を映すおみくじ感覚で楽しんでください。
      </>
    ),
  },
  {
    emoji: '🔒',
    title: '入力データを収集します',
    body: (
      <>
        お名前・メールアドレス・診断結果などの個人データを記録・収集します。
        <B>社内での相互理解とサービス改善のために利用します</B>。
      </>
    ),
  },
];

// 仮イラスト用のプレースホルダー枠。後で本番イラストに差し替える。
const PlaceholderArt: React.FC<{ emoji: string; size?: number }> = ({ emoji, size = 72 }) => (
  <div
    style={{
      flexShrink: 0,
      width: size,
      height: size,
      borderRadius: '16px',
      border: '2px dashed #C9B68A',
      background: '#FFFDF5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px',
    }}
  >
    <span style={{ fontSize: size * 0.4, lineHeight: 1 }}>{emoji}</span>
    <span style={{ fontSize: '9px', color: '#B0A179', fontWeight: 'bold' }}>イラスト仮</span>
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
        padding: '3.5rem 0 4rem 0',
        color: 'var(--color-text)',
      }}
    >
      {/* ヘッダー */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <PlaceholderArt emoji="📜" size={96} />
        <h2
          style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            marginTop: '1rem',
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
            <PlaceholderArt emoji={n.emoji} />
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
          className="btn-primary"
          onClick={handleStart}
          disabled={!agreed}
          style={{
            width: '280px',
            padding: '1rem',
            fontSize: '1.1rem',
            // サイトの黄色を使ったグラデーション。文字は白のまま、可読性確保に薄い影。
            background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.25)',
            opacity: agreed ? 1 : 0.5,
            cursor: agreed ? 'pointer' : 'not-allowed',
            boxShadow: agreed ? '0 4px 0 #D9A300' : 'none',
          }}
        >
          <Sparkles size={20} /> 診断をはじめる
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
