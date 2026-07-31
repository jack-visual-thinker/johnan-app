import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { LOADING_COPY } from '../i18n/content';

export const LoadingView: React.FC = () => {
  const { language } = useLanguage();
  const copy = LOADING_COPY[language];

  return (
    <div className="loading-view" style={{ 
      padding: '2rem 0',
      textAlign: 'center',
      // ヘッダー分を引いた画面高で縦中央に配置
      minHeight: 'calc(100dvh - 220px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
         style={{ 
           width: '60px', 
           height: '60px', 
           border: '6px solid #FFFBE6',
           borderTop: '6px solid var(--color-primary)',
           borderRadius: '50%',
           marginBottom: '2rem'
         }}
      />
      
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2C3E50' }}>
        {copy.title}
      </h2>
      <p style={{ color: '#7F8C8D' }}>
        {copy.body}
      </p>

      <footer style={{ marginTop: '4rem', color: '#AAA', fontSize: '0.8rem' }}>
        &copy; JOJOEN {language === 'ja' ? '飼育委員会' : 'Jouzukan Team'}
      </footer>
    </div>
  );
};
