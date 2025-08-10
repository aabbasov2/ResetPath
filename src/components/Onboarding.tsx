import React, { useState } from 'react';
import './Onboarding.css';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      id: 'welcome',
      title: 'Welcome to ResetPath',
      subtitle: 'Your companion in breaking free from porn and regaining control.',
      icon: '⚡',
      content: null
    },
    {
      id: 'science',
      title: 'The Science',
      subtitle: 'Every day without porn, your brain\'s reward system begins to heal — making you more motivated and focused.',
      icon: '⚙️',
      content: 'ResetPath is designed to help you track your streaks, manage urges, and rebuild your confidence.'
    },
    {
      id: 'daily-gains',
      title: 'Daily Gains',
      subtitle: 'After 7 days, many report better sleep, more energy, and sharper focus.',
      icon: '📈',
      content: 'You\'ll see daily recovery facts like this to stay motivated.'
    },
    {
      id: 'tools',
      title: 'Tools at Your Fingertips',
      subtitle: 'Everything you need to stay on track — all in one place.',
      icon: '🛡️',
      content: null,
      tools: [
        { icon: '⚡', label: 'Streak Counter' },
        { icon: '⚠️', label: 'Panic Button' },
        { icon: '⚔️', label: 'Journal' },
        { icon: '🎯', label: 'Motivation' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy First',
      subtitle: 'All your data stays on your device. No tracking. No accounts. 100% private.',
      icon: '🔒',
      content: 'Your journey is completely confidential and secure.'
    },
    {
      id: 'get-started',
      title: 'You\'re Ready to Begin',
      subtitle: 'Your journey to freedom starts now.',
      icon: '🎯',
      content: 'Take control of your life and build the habits that will transform you.'
    }
  ];

  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const skipToApp = () => {
    onComplete();
  };

  const goToScreen = (index: number) => {
    setCurrentScreen(index);
  };

  const currentScreenData = screens[currentScreen];
  const isLastScreen = currentScreen === screens.length - 1;

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <button className="skip-button" onClick={skipToApp}>
          Skip
        </button>
      </div>

      <div className="onboarding-content">
        <div className="screen-icon">
          {currentScreenData.icon}
        </div>

        <h1 className="screen-title">
          {currentScreenData.title}
        </h1>

        <p className="screen-subtitle">
          {currentScreenData.subtitle}
        </p>

        {currentScreenData.content && (
          <p className="screen-content">
            {currentScreenData.content}
          </p>
        )}

        {currentScreenData.tools && (
          <div className="tools-grid">
            {currentScreenData.tools.map((tool, index) => (
              <div key={index} className="tool-item">
                <span className="tool-icon">{tool.icon}</span>
                <span className="tool-label">{tool.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="onboarding-footer">
        <div className="dots-indicator">
          {screens.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentScreen ? 'active' : ''}`}
              onClick={() => goToScreen(index)}
            />
          ))}
        </div>

        <div className="navigation-buttons">
          {currentScreen > 0 && (
            <button className="nav-button prev-button" onClick={prevScreen}>
              ← Back
            </button>
          )}
          
          <button className="nav-button next-button" onClick={nextScreen}>
            {isLastScreen ? "Let's Go! ⚡" : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
