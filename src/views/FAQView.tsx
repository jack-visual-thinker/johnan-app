import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { FAQ_COPY } from '../i18n/content';

export const FAQView: React.FC = () => {
  const { language } = useLanguage();
  const copy = FAQ_COPY[language];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-view" style={{ paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '900', 
          color: 'var(--color-text)', 
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          {copy.title}
        </h1>

        <p style={{ 
          textAlign: 'center',
          color: 'var(--color-text-sub)',
          marginBottom: '3rem',
          lineHeight: 1.8
        }}>
          {copy.intro}
        </p>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {copy.items.map(([question, answer], index) => (
            <div 
              key={index}
              className="card"
              style={{ 
                marginBottom: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{ 
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  margin: 0,
                  flex: 1
                }}>
                  {question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={24} color="var(--color-text-sub)" />
                </motion.div>
              </div>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ 
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #E0E0E0',
                      color: 'var(--color-text-sub)',
                      lineHeight: 1.8,
                      fontSize: '0.95rem'
                    }}>
                      {answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'var(--color-legend-bg)',
          borderRadius: 'var(--radius-md)',
          maxWidth: '700px',
          margin: '3rem auto 0'
        }}>
          <p style={{ 
            fontSize: '0.95rem',
            color: 'var(--color-text-sub)',
            lineHeight: 1.8,
            marginBottom: '0.5rem'
          }}>
            {copy.closing}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
