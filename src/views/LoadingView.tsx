import React from 'react';
import { motion } from 'framer-motion';

export const LoadingView: React.FC = () => {
  return (
    <div className="loading-view" style={{ 
      padding: '4rem 0', 
      textAlign: 'center',
      minHeight: '60vh',
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
        歴史を紐解いています...
      </h2>
      <p style={{ color: '#7F8C8D' }}>
        あなたの魂に近いレジェンドを探しています
      </p>

      <footer style={{ marginTop: '4rem', color: '#AAA', fontSize: '0.8rem' }}>
        &copy; JOJOEN 飼育委員会
      </footer>
    </div>
  );
};
