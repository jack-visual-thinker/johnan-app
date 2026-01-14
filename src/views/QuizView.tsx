import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QUESTIONS } from '../data/questions';

type Props = {
  onFinish: (answers: Record<number, number>) => void;
};

const OPTIONS = [
  { value: 5, size: 50, color: '#FCC315' },        // So Omou (Yellow) (Left)
  { value: 4, size: 42, color: '#C6B03B' },        // Mix 1
  { value: 3, size: 36, color: '#909D61' },        // Mix 2 (Middle)
  { value: 2, size: 42, color: '#5A8A88' },        // Mix 3
  { value: 1, size: 50, color: '#005EAD' },        // So Omowanai (Blue) (Right)
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

      {/* Quiz Specific Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/quiz_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1
      }} />

      {/* Card Stack Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100%',
        alignItems: 'start', // Top align to prevent jumping
        justifyItems: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '500px', // Restrict max width of the card stack
        margin: '0 auto',
      }}>
        {QUESTIONS.map((question, index) => {
          // Determine the visual state of the card
          let state = 'future';
          if (index === currentIndex) state = 'active';
          else if (index < currentIndex) state = 'history';

          // Calculate history position based on the answer given
          const answerValue = answers[question.id];

          let historyRotate = 0;
          let historyX = 0;

          if (answerValue) {
            // Map answer (1-5) to rotation and x-offset
            // 5 (Left/Yellow) -> Large Counter-Clockwise (Left tilt)
            // 1 (Right/Blue) -> Large Clockwise (Right tilt)
            switch (answerValue) {
              case 5: // Strongly Agree (Left)
                historyRotate = -10;
                historyX = -20;
                break;
              case 4: // Agree
                historyRotate = -5;
                historyX = -10;
                break;
              case 3: // Neutral
                historyRotate = 0;
                historyX = 0;
                break;
              case 2: // Disagree
                historyRotate = 5;
                historyX = 10;
                break;
              case 1: // Strongly Disagree (Right)
                historyRotate = 10;
                historyX = 20;
                break;
            }
          }

          // Add a tiny bit of random jitter so identical answers don't stack *perfectly* on top of each other
          // Using index to generate pseudo-randomness that is stable
          const randomJitter = ((index * 13) % 4) - 2;
          if (state === 'history') {
            historyRotate += randomJitter; // +- 2 deg fuzz
            historyX += randomJitter * 2; // +- 4px fuzz
          }

          return (
            <motion.div
              key={question.id}
              initial={{ x: '100vw', opacity: 0 }} // Start off-screen right
              animate={state}
              variants={{
                active: {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0, // Always straight when active
                  opacity: 1,
                  zIndex: 10,
                  filter: 'brightness(1)',
                },
                history: {
                  x: historyX,
                  y: 15, // Move slightly down to show depth
                  scale: 0.95, // Shrink slightly to look like it's behind
                  rotate: historyRotate, // Rotation based on ANSWER
                  opacity: 1, // Keep fully opaque to look like paper
                  zIndex: 5, // Behind active card
                  filter: 'brightness(0.95)', // Slight shadow effect
                },
                future: {
                  x: '100vw', // Enter from Right
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                  zIndex: 20 // Enters on top
                }
              }}
              transition={{
                type: "tween",
                ease: [0.25, 1, 0.5, 1],
                duration: 0.8
              }}
              className="card"
              style={{
                padding: '2rem 1rem',
                gridArea: '1 / 1', // Stack all cards in the same grid cell
                width: '100%',     // Fill the cell
                originY: 1,        // Pivot from bottom for a natural "drop" feel? actually center is usually safer for rotation
                transformOrigin: 'center bottom',
                backgroundColor: 'white' // Ensure background is opaque
              }}
            >
              {/* Part 1: Illustration (Top) */}
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <img
                  src={question.image}
                  alt="illustration"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px', // Constrain height
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Part 2: Question Text (Middle) */}
              <h2 style={{
                fontSize: '12px',
                margin: '0 0 2rem 0',
                lineHeight: 1.6,
                textAlign: 'center' // Ensure centered text
              }}>
                {question.text}
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}>
                {/* Buttons Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between', // Maximize spacing within the container
                  width: '100%',
                  maxWidth: '340px', // constrain width so gaps aren't too huge on desktop, but fill mobile
                  marginBottom: '0.8rem' // Space between buttons and text
                }}>
                  {OPTIONS.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      // Disable interaction if not active card
                      onClick={() => index === currentIndex && handleAnswer(option.value)}
                      style={{
                        width: option.size,
                        height: option.size,
                        minWidth: option.size,
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: option.color,
                        cursor: index === currentIndex ? 'pointer' : 'default', // Only clickable if active
                        padding: 0,
                        outline: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Anti-gravity
                        pointerEvents: index === currentIndex ? 'auto' : 'none' // Prevent clicks on background cards
                      }}
                      aria-label={`Option ${option.value}`}
                    />
                  ))}
                </div>

                {/* Labels Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start', // Align top of text
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0 0.5rem' // Slight padding to align with outer buttons
                }}>
                  {/* Left Label */}
                  <div style={{
                    color: '#FCC315',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    lineHeight: 1.4
                  }}>
                    そう思う
                  </div>

                  {/* Right Label */}
                  <div style={{
                    color: '#005EAD',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    lineHeight: 1.4
                  }}>
                    そう<br />思わない
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
