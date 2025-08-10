import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './ios.css';
import Navigation from './components/Navigation';
import FloatingButton from './components/FloatingButton';
import Onboarding from './components/Onboarding';
import Home from './screens/Home';
import Progress from './screens/Progress';
import UrgeHelp from './screens/UrgeHelp';
import Journal from './screens/Journal';
import Settings from './screens/Settings';

export interface AppData {
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  relapses: Array<{
    date: string;
    reason: string;
    notes: string;
  }>;
  journalEntries: Array<{
    date: string;
    content: string;
    gratitude: string;
  }>;
  dailyGoals: Array<{
    date: string;
    completed: boolean;
  }>;
  settings: {
    dailyReminders: boolean;
    pinEnabled: boolean;
  };
}

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const hasSeenOnboarding = localStorage.getItem('resetpath-onboarding-completed');
    return !hasSeenOnboarding;
  });

  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('resetpath-data');
    if (saved) {
      return JSON.parse(saved);
    }
    const defaultData: AppData = {
      currentStreak: 0,
      longestStreak: 0,
      startDate: new Date().toISOString().split('T')[0],
      relapses: [],
      journalEntries: [],
      dailyGoals: [],
      settings: {
        dailyReminders: true,
        pinEnabled: false
      }
    };
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('resetpath-data', JSON.stringify(appData));
  }, [appData]);

  const updateAppData = (newData: Partial<AppData>) => {
    setAppData(prev => ({ ...prev, ...newData }));
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('resetpath-onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  return (
    <Router>
      <div className="app">
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home data={appData} updateData={updateAppData} />} />
            <Route path="/progress" element={<Progress data={appData} updateData={updateAppData} />} />
            <Route path="/urge-help" element={<UrgeHelp />} />
            <Route path="/journal" element={<Journal data={appData} updateData={updateAppData} />} />
            <Route path="/settings" element={<Settings data={appData} updateData={updateAppData} />} />
          </Routes>
        </div>
        <FloatingButton />
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
