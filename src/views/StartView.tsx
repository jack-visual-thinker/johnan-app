import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen } from 'lucide-react';

type Props = {
  onStart: () => void;
};

export const StartView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="start-view" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top Image (Animal Circle) */}
        <div style={{ marginBottom: '2rem' }}>
          <img 
            src="/images/top.PNG" 
            alt="じょうずかん" 
            style={{ width: '100%', maxWidth: '300px', height: 'auto', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Title */}
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '900', 
          color: 'var(--color-text)', 
          marginBottom: '2rem',
          lineHeight: 1.4
        }}>
          あなたは<br />
          どの<span style={{ color: 'var(--color-blue)' }}>レジェンドタイプ</span>？
        </h1>
        
        {/* Description Box */}
        <div className="card" style={{ 
          textAlign: 'left', 
          maxWidth: '500px', 
          margin: '0 auto 3rem auto',
          padding: '2rem',
          fontSize: '1rem',
          lineHeight: '1.8',
          color: 'var(--color-text-sub)'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            JOHNAN（ジョウナン）の長い歴史の中には、今の私たちを作ってくれた『レジェンド』たちがいます。
          </p>
          <p>
            あなたの性格は、歴史上の誰に似ているかな？<br/>
            質問に答えて、あなたの中に眠るレジェンドの魂を見つけよう！
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <button className="btn-primary" onClick={onStart}>
            <Sparkles size={24} />
            診断スタート！
          </button>
          
          <button className="btn-outline">
            <BookOpen size={20} />
            図鑑を見る
          </button>

          <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '1rem' }}>
            (全部で18問 / 3分くらいでおわるよ)
          </p>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: '4rem', color: '#AAA', fontSize: '0.8rem' }}>
          &copy; JOJOEN 飼育委員会
        </footer>
      </motion.div>
    </div>
  );
};
