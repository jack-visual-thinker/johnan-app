import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';
import { useLanguage } from '../i18n/LanguageContext';
import { HEADER_COPY } from '../i18n/content';

type Props = {
  onNavigate: (page: string) => void;
  currentPage: string;
};

export const Header: React.FC<Props> = ({ onNavigate, currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const copy = HEADER_COPY[language];

  const menuItems = [
    { id: 'about', label: copy.items.about },
    { id: 'start', label: copy.items.start },
    { id: 'encyclopedia', label: copy.items.encyclopedia },
    { id: 'faq', label: copy.items.faq },
  ];

  const handleMenuClick = (pageId: string) => {
    onNavigate(pageId);
    setMenuOpen(false);
  };

  // Scroll-away logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If menu is open, don't hide the header
      if (menuOpen) return;

      // Determine direction
      // Hide if scrolling down AND we are not at the very top (buffer)
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
      } else {
        // Show if scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  // Force visible if menu is newly opened
  React.useEffect(() => {
    if (menuOpen) setIsVisible(true);
  }, [menuOpen]);

  return (
    <>
      <header className={`app-header ${currentPage === 'start' ? 'start-mode' : ''} ${!isVisible ? 'hidden' : ''}`}>
        <div className="logo-container" onClick={() => onNavigate('start')}>
          <img src="/johzukan-hedder.png" alt="じょうずかん" className="logo" />
        </div>

        <div className="header-actions">
          <div className="language-switcher" role="group" aria-label="Language">
            <button
              type="button"
              className={language === 'ja' ? 'active' : ''}
              onClick={() => setLanguage('ja')}
              aria-pressed={language === 'ja'}
            >
              日本語
            </button>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              English
            </button>
          </div>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={copy.menuLabel}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="menu-nav" onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
