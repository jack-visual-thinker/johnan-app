import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';

export type Language = 'ja' | 'en';

const LANGUAGE_STORAGE_KEY = 'jouzukan-language';
const languageListeners = new Set<() => void>();
let fallbackLanguage: Language = 'ja';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getStoredLanguage = (): Language => {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'ja';
  } catch {
    return fallbackLanguage;
  }
};

const subscribeToLanguage = (listener: () => void) => {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) listener();
  };

  languageListeners.add(listener);
  window.addEventListener('storage', handleStorage);

  return () => {
    languageListeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
  };
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getStoredLanguage,
    (): Language => 'ja',
  );

  const setLanguage = useCallback((nextLanguage: Language) => {
    fallbackLanguage = nextLanguage;

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // 保存できない場合は、このタブのメモリ上で設定を維持する。
    }

    languageListeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
