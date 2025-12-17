import { useState } from 'react';
import { StartView } from './views/StartView';
import { QuizView } from './views/QuizView';
import { ResultView } from './views/ResultView';

type ViewState = 'start' | 'quiz' | 'result';

function App() {
  const [view, setView] = useState<ViewState>('start');
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = () => {
    setAnswers({});
    setView('quiz');
  };

  const handleQuizFinish = (resultAnswers: Record<number, number>) => {
    setAnswers(resultAnswers);
    setView('result');
  };

  const handleRetry = () => {
    setAnswers({});
    setView('start');
  };

  return (
    <div className="app-container">
      {view === 'start' && <StartView onStart={handleStart} />}
      {view === 'quiz' && <QuizView onFinish={handleQuizFinish} />}
      {view === 'result' && <ResultView answers={answers} onRetry={handleRetry} />}
      
      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#AAA' }}>
        &copy; JOHNAN Animal Diagnosis
      </footer>
    </div>
  );
}

export default App;
