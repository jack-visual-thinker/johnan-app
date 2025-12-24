import { useState } from 'react';
import { Header } from './components/Header';
import { NewStartView } from './views/NewStartView';
import { AboutView } from './views/AboutView';
import { EncyclopediaView } from './views/EncyclopediaView';
import { FAQView } from './views/FAQView';
import { QuizView } from './views/QuizView';
import { ResultView } from './views/ResultView';
import './components/Header.css';

type Page = 'start' | 'about' | 'encyclopedia' | 'faq' | 'quiz' | 'result';

interface UserData {
  name: string;
  email: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = (data: UserData) => {
    setUserData(data);
    setAnswers({});
    setCurrentPage('quiz');
  };

  const handleQuizFinish = (resultAnswers: Record<number, number>) => {
    setAnswers(resultAnswers);
    setCurrentPage('result');
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentPage('start');
    setUserData(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="app-container">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'start' && <NewStartView onStart={handleStart} />}
      {currentPage === 'about' && <AboutView />}
      {currentPage === 'encyclopedia' && <EncyclopediaView />}
      {currentPage === 'faq' && <FAQView />}
      {currentPage === 'quiz' && <QuizView onFinish={handleQuizFinish} />}
      {currentPage === 'result' && <ResultView answers={answers} onRetry={handleRetry} userData={userData} />}

      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#AAA', textAlign: 'center', paddingBottom: '2rem' }}>
        &copy; じょうずかん
      </footer>
    </div>
  );
}

export default App;
