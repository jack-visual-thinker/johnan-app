import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../data/questions';

type Props = {
  onFinish: (answers: Record<number, number>) => void;
};

const OPTIONS = [
  { label: 'はい！', value: 5 },
  { label: 'たぶん そう', value: 4 },
  { label: 'どっちでもない', value: 3 },
  { label: 'たぶん ちがう', value: 2 },
  { label: 'いいえ！', value: 1 },
];

export const QuizView: React.FC<Props> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswer = (value: number) => {
    const questionId = QUESTIONS[currentIndex].id;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish(newAnswers);
    }
  };

  const progress = ((currentIndex) / QUESTIONS.length) * 100;

  return (
    <div className="quiz-view">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <div style={{ marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
            Q{currentIndex + 1}
          </div>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 2rem 0' }}>
            {QUESTIONS[currentIndex].text}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {OPTIONS.map((option) => (
              <button
                key={option.label}
                className="btn"
                style={{ 
                  backgroundColor: 'var(--color-bg)', 
                  color: 'var(--color-text)', 
                  border: '2px solid var(--color-primary)',
                }}
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
