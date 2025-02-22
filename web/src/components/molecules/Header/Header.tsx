import React, { useState } from 'react';
import './styles.scss';
import Button from '../../atoms/button/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header" style={{ position: 'fixed', top: 0, width: '100%' }}>
      <div className="header-left">
        <h1 className="logo">Movie Hub</h1>
      </div>
      <div className="header-center">
        <div className="menu-container">
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰ Menu
          </button>
          <nav className={`nav ${isOpen ? 'open' : ''}`}>
            <a href="/actors">Actors</a>
            <a href="/movies">Movies</a>
          </nav>
        </div>
        <div className="search-container">
          <input type="text" placeholder="🔍 Search for any movies" className="search-bar" />
        </div>
      </div>
      <div className="header-right">
        <Button variant="primary" type="submit" size="large">Sign In</Button>
      </div>
    </header>
  );
};

export default Header;