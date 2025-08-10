import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingButton.css';

const FloatingButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/urge-help');
  };

  return (
    <button className="floating-button" onClick={handleClick} aria-label="Get immediate help">
      <span className="floating-icon">🆘</span>
      <span className="floating-text">Help</span>
    </button>
  );
};

export default FloatingButton;
