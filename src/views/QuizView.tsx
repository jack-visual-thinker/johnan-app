import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../data/questions';

type Props = {
  onFinish: (answers: Record<number, number>) => void;
};

const OPTIONS = [
  { value: 5, size: 60, color: '#2ECC71', borderColor: '#2ECC71' }, // Big Green
  { value: 4, size: 45, color: 'transparent', borderColor: '#2ECC71' }, // Medium Green (Outline)
  { value: 3, size: 40, color: 'transparent', borderColor: '#BDC3C7' }, // Small Gray
  { value: 2, size: 45, color: 'transparent', borderColor: '#9B59B6' }, // Medium Purple (Outline)
  { value: 1, size: 60, color: '#8E44AD', borderColor: '#8E44AD' }, // Big Purple
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

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0'
          }}>
            <span style={{ color: '#2ECC71', fontWeight: 'bold' }}>そう思う</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {OPTIONS.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAnswer(option.value)}
                  style={{
                    width: option.size,
                    height: option.size,
                    borderRadius: '50%',
                    border: `3px solid ${option.borderColor}`,
                    backgroundColor: option.color === 'transparent' ? 'transparent' : option.color,
                    cursor: 'pointer',
                    padding: 0,
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label={`Option ${option.value}`}
                >
                  {/* Inner circle for outlined buttons to make them easier to see being "filled" if needed, 
                      but user asked for outline/circle style. 
                      Let's stick to simple circles or filled circles.
                      Ref image 4 shows: Green Outline (Big), Green Outline (Med), Gray Outline (Small), Purple Outline (Med), Purple Outline (Big).
                      Wait, Ref 4 shows OUTLINES.
                      Let's adjustment colors in the OPTIONS constant above to match 'Outline' style.
                  */}

                </motion.button>
              ))}
            </div>

            <span style={{ color: '#8E44AD', fontWeight: 'bold' }}>そう思わない</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
