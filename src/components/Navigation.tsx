import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: '⚡', label: 'Home' },
    { path: '/progress', icon: '📈', label: 'Progress' },
    { path: '/urge-help', icon: '🛡️', label: 'Help' },
    { path: '/journal', icon: '⚔️', label: 'Journal' },
    { path: '/settings', icon: '🔧', label: 'Settings' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
