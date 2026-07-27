import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'じょうずかんとは何ですか？',
    answer: 'あなたの得意なことや個性を、動物のタイプとして可視化する診断ツールです。簡単な質問に答えるだけで、あなたらしさを発見できます。'
  },
  {
    question: '診断にはどれくらい時間がかかりますか？',
    answer: '全18問で、約3分程度で完了します。直感で答えていただくのがおすすめです。'
  },
  {
    question: '入力したニックネームや回答は保存されますか？',
    answer: 'ニックネームと回答は、現在の診断結果を表示して画像を作るためだけに使います。アカウントや診断履歴としてサーバーに保存することはありません。'
  },
  {
    question: '診断結果はどのように残せますか？',
    answer: '診断完了後に画面で確認できるほか、要約版を1枚のPNG画像として保存できます。対応するスマートフォンでは共有メニューも利用できます。'
  },
  {
    question: '何度も診断を受けられますか？',
    answer: 'はい、何度でも診断を受けることができます。時期によって結果が変わることもあるので、定期的に試してみるのも面白いかもしれません。'
  },
  {
    question: '結果が自分に合っていないと感じたら？',
    answer: 'この診断は、あくまで一つの見方を提供するものです。結果はヒントとして捉え、自己理解を深めるきっかけにしていただければ幸いです。'
  }
];

export const FAQView: React.FC = () => {
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
          よくある質問
        </h1>

        <p style={{ 
          textAlign: 'center',
          color: 'var(--color-text-sub)',
          marginBottom: '3rem',
          lineHeight: 1.8
        }}>
          じょうずかんについての疑問にお答えします
        </p>

        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
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
                  {faq.question}
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
                      {faq.answer}
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
            その他のご質問がありましたら、<br />
            お気軽にお問い合わせください。
          </p>
        </div>
      </motion.div>
    </div>
  );
};
