import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

type Props = {
  onNavigate: (page: string) => void;
  currentPage: string;
};

export const Header: React.FC<Props> = ({ onNavigate, currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 'about', label: 'じょうずかんとは？' },
    { id: 'start', label: '診断する' },
    { id: 'encyclopedia', label: '愉快な仲間たちの動物集' },
    { id: 'faq', label: 'FAQ' },
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

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
