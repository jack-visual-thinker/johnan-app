import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ABOUT_COPY } from '../i18n/content';

export const AboutView: React.FC = () => {
  const { language } = useLanguage();
  const copy = ABOUT_COPY[language];
  const icons = [Heart, Compass, Sparkles];

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
          {copy.title}
        </h1>

        {copy.sections.map((section, index) => {
          const Icon = icons[index];
          return (
            <div key={section.title} className="card" style={{ marginBottom: index < copy.sections.length - 1 ? '2rem' : undefined }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Icon size={28} color="var(--color-primary)" style={{ marginRight: '1rem', flexShrink: 0 }} />
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{section.title}</h2>
              </div>
              <p style={{ lineHeight: 1.8, color: 'var(--color-text-sub)' }}>{section.body}</p>
            </div>
          );
        })}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ 
            fontSize: '1.1rem', 
            fontWeight: '600',
            color: 'var(--color-text)'
          }}>
            {copy.closing.split('\n').map((line, index) => (
              <React.Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
