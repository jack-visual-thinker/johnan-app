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

  return (
    <>
      <header className={`app-header ${['start', 'result'].includes(currentPage) ? 'start-mode' : ''}`}>
        <div className="logo-container" onClick={() => onNavigate('start')}>
          {['start', 'result'].includes(currentPage) ? (
            <img src="/logo-jouzukan-header.jpg" alt="じょうずかん" className="logo" />
          ) : (
            <img src="/logo-jouzukan.jpg" alt="じょうずかん" className="logo" />
          )}
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
