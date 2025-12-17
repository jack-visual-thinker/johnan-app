import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  onStart: () => void;
};

export const StartView: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="start-view">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ marginBottom: "1.5rem" }}><img src="/images/top.PNG" alt="じょうずかん" style={{ width: "100%", maxWidth: "350px", height: "auto", display: "block", margin: "0 auto" }} /></div>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', fontWeight: 'bold' }}>
          あなたはどのレジェンドタイプ？
        </p>
        
        <div className="card" style={{ margin: '2rem 0', textAlign: 'left' }}>
          <p>
            JOHNAN（ジョウナン）の長い歴史の中には、今の私たちを作ってくれた『レジェンド』たちがいます。
          </p>
          <p>
            あなたの性格は、歴史上の誰に似ているかな？<br/>
            質問に答えて、あなたの中に眠るレジェンドの魂を見つけよう！
          </p>
        </div>

        <button className="btn" style={{ fontSize: '1.5rem', padding: '1rem 3rem' }} onClick={onStart}>
          診断をはじめる
        </button>
      </motion.div>
    </div>
  );
};
