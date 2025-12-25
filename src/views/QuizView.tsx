import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../data/questions';

type Props = {
  onFinish: (answers: Record<number, number>) => void;
};

const OPTIONS = [
  { value: 5, size: 50, color: '#FCC315' },        // So Omou (Yellow)
  { value: 4, size: 42, color: '#C6B03B' },        // Mix 1
  { value: 3, size: 36, color: '#909D61' },        // Mix 2 (Middle)
  { value: 2, size: 42, color: '#5A8A88' },        // Mix 3
  { value: 1, size: 50, color: '#005EAD' },        // So Omowanai (Blue)
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
          style={{ padding: '2rem 1rem' }} // Ensure padding inside card
        >
          <div style={{ marginBottom: '1rem', color: '#FCC315', fontWeight: 'bold' }}>
            Q{currentIndex + 1}
          </div>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 2rem 0', lineHeight: 1.6 }}>
            {QUESTIONS[currentIndex].text}
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column', // Mobile: Stack labels and buttons if needed, or row?
            alignItems: 'center',     // User requested horizontal single line, but need to be careful of width.
            gap: '0.5rem',
            width: '100%'
          }}>
            {/* 
              User request: "5 buttons in a perfectly aligned horizontal line"
              "Labels on Left and Right ends"
            */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '500px', // Prevent stretching too wide
              margin: '0 auto',
              gap: '0.5rem'
            }}>
              {/* Left Label */}
              <div style={{
                color: '#FCC315',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                width: '2.5rem',
                textAlign: 'center',
                lineHeight: 1.2
              }}>
                そう<br />思う
              </div>

              {/* Buttons Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1, // Take available space
                padding: '0 0.5rem'
              }}>
                {OPTIONS.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAnswer(option.value)}
                    style={{
                      width: option.size,
                      height: option.size,
                      minWidth: option.size, // Prevent shrinking
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: option.color,
                      cursor: 'pointer',
                      padding: 0,
                      outline: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Anti-gravity floating feel
                    }}
                    aria-label={`Option ${option.value}`}
                  />
                ))}
              </div>

              {/* Right Label */}
              <div style={{
                color: '#005EAD',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                width: '2rem', // Fixed width
                textAlign: 'center',
                lineHeight: 1.2
              }}>
                そう<br />思わない
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
