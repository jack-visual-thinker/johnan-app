import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { NewStartView } from './views/NewStartView';
import { TermsView } from './views/TermsView';
import { AboutView } from './views/AboutView';
import { EncyclopediaView } from './views/EncyclopediaView';
import { FAQView } from './views/FAQView';
import { QuizView } from './views/QuizView';
import { ResultView } from './views/ResultView';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

type Page = 'start' | 'terms' | 'about' | 'encyclopedia' | 'faq' | 'quiz' | 'result';

const NICKNAME_STORAGE_KEY = 'jouzukan-current-nickname';

const getStoredNickname = () => {
  try {
    return window.sessionStorage.getItem(NICKNAME_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
};

function AppContent() {
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState<Page>('start');
  const [nickname, setNickname] = useState(getStoredNickname);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    try {
      if (nickname) {
        window.sessionStorage.setItem(NICKNAME_STORAGE_KEY, nickname);
      } else {
        window.sessionStorage.removeItem(NICKNAME_STORAGE_KEY);
      }
    } catch {
      // sessionStorageが使えない環境でも、画面内の状態だけで診断を続ける。
    }
  }, [nickname]);

  const handleStart = () => {
    const normalizedNickname = nickname.trim();
    if (!normalizedNickname || !hasAgreed) return;

    setNickname(normalizedNickname);
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
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="app-container">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'start' && (
        <NewStartView
          nickname={nickname}
          agreed={hasAgreed}
          onNicknameChange={setNickname}
          onAgreementChange={setHasAgreed}
          onShowTerms={() => setCurrentPage('terms')}
          onStart={handleStart}
        />
      )}
      {currentPage === 'terms' && (
        <TermsView
          initialAgreed={hasAgreed}
          onAgree={() => {
            setHasAgreed(true);
            setCurrentPage('start');
          }}
          onBack={() => setCurrentPage('start')}
        />
      )}
      {currentPage === 'about' && <AboutView />}
      {currentPage === 'encyclopedia' && <EncyclopediaView />}
      {currentPage === 'faq' && <FAQView />}
      {currentPage === 'quiz' && <QuizView onFinish={handleQuizFinish} />}
      {currentPage === 'result' && <ResultView answers={answers} onRetry={handleRetry} nickname={nickname} />}

      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#AAA', textAlign: 'center', paddingBottom: '2rem' }}>
        &copy; JOJOEN {language === 'ja' ? '飼育委員会' : 'Jouzukan Team'}
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
