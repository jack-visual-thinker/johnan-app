import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, Sparkles } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="about-view" style={{ paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '900', 
          color: 'var(--color-text)', 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          じょうずかんとは？
        </h1>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Heart size={28} color="var(--color-primary)" style={{ marginRight: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
              あなたらしさを、動物で見える化
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, color: 'var(--color-text-sub)' }}>
            「じょうずかん」は、あなたの得意なこと、あなたらしさを発見するための診断ツールです。
            簡単な質問に直感で答えるだけで、あなたの性格や個性を動物のタイプとして可視化します。
          </p>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Compass size={28} color="var(--color-primary)" style={{ marginRight: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
              自己理解を深めるきっかけに
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, color: 'var(--color-text-sub)' }}>
            診断結果は、あなたの強みや個性を再発見するヒントになります。
            自分では気づかなかった一面や、大切にしている価値観が見えてくるかもしれません。
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <Sparkles size={28} color="var(--color-primary)" style={{ marginRight: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
              楽しみながら、学ぶ
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, color: 'var(--color-text-sub)' }}>
            診断は楽しく、気軽に。でも、その結果には意味があります。
            仲間とシェアして、お互いの個性を理解し合う機会にもなります。
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: 'var(--color-text)'
          }}>
            さぁ、あなたの中に眠る動物を<br />
            見つけに行きましょう！
          </p>
        </div>
      </motion.div>
    </div>
  );
};
