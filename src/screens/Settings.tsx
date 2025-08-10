import React, { useState } from 'react';
import { AppData } from '../App';

interface SettingsProps {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
}

const Settings: React.FC<SettingsProps> = ({ data, updateData }) => {
  const [showExportData, setShowExportData] = useState(false);
  const [showClearData, setShowClearData] = useState(false);

  const toggleReminders = () => {
    updateData({
      settings: {
        ...data.settings,
        dailyReminders: !data.settings.dailyReminders,
      },
    });
  };

  const togglePin = () => {
    updateData({
      settings: {
        ...data.settings,
        pinEnabled: !data.settings.pinEnabled,
      },
    });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resetpath-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setShowExportData(false);
  };

  const clearAllData = () => {
    if (window.confirm('Are you absolutely sure? This will delete ALL your data and cannot be undone.')) {
      const newData: AppData = {
        currentStreak: 0,
        longestStreak: 0,
        startDate: new Date().toISOString().split('T')[0],
        relapses: [],
        journalEntries: [],
        dailyGoals: [],
        settings: {
          dailyReminders: true,
          pinEnabled: false,
        },
      };
      updateData(newData);
      localStorage.removeItem('resetpath-data');
      setShowClearData(false);
      alert('All data has been cleared. Starting fresh!');
    }
  };

  const calculateTotalDays = () => {
    const startDate = new Date(data.startDate);
    const today = new Date();
    return Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="screen">
      <h1 className="screen-title">Settings</h1>
      
      <div className="card">
        <div className="card-title">App Preferences</div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{ fontWeight: '600' }}>Daily Reminders</div>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
              Get encouraging notifications
            </div>
          </div>
          <button 
            className={`btn ${data.settings.dailyReminders ? 'btn-success' : 'btn-secondary'}`}
            onClick={toggleReminders}
            style={{ minWidth: '80px', padding: '8px 16px' }}
          >
            {data.settings.dailyReminders ? 'ON' : 'OFF'}
          </button>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: '600' }}>PIN Protection</div>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
              Secure your app with a PIN
            </div>
          </div>
          <button 
            className={`btn ${data.settings.pinEnabled ? 'btn-success' : 'btn-secondary'}`}
            onClick={togglePin}
            style={{ minWidth: '80px', padding: '8px 16px' }}
          >
            {data.settings.pinEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Your Journey Stats</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Journey Started:</span>
          <span style={{ fontWeight: '600' }}>
            {new Date(data.startDate).toLocaleDateString()}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Total Days:</span>
          <span style={{ fontWeight: '600' }}>{calculateTotalDays()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Journal Entries:</span>
          <span style={{ fontWeight: '600' }}>{data.journalEntries.length}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Best Streak:</span>
          <span style={{ fontWeight: '600' }}>{data.longestStreak} days</span>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Data Management</div>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => setShowExportData(!showExportData)}
          style={{ marginBottom: '12px' }}
        >
          📤 Export My Data
        </button>
        
        {showExportData && (
          <div style={{ 
            padding: '16px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <p style={{ fontSize: '14px', marginBottom: '12px' }}>
              Export all your data as a JSON file for backup or transfer to another device.
            </p>
            <button className="btn btn-success" onClick={exportData}>
              Download Backup File
            </button>
          </div>
        )}

        <button 
          className="btn btn-danger" 
          onClick={() => setShowClearData(!showClearData)}
        >
          🗑️ Clear All Data
        </button>
        
        {showClearData && (
          <div style={{ 
            padding: '16px', 
            background: '#ffe6e6', 
            borderRadius: '8px',
            marginTop: '12px',
            border: '1px solid #ffcccc'
          }}>
            <p style={{ fontSize: '14px', marginBottom: '12px', color: '#d63031' }}>
              ⚠️ <strong>Warning:</strong> This will permanently delete all your progress, 
              journal entries, and settings. This action cannot be undone.
            </p>
            <button className="btn btn-danger" onClick={clearAllData}>
              Yes, Delete Everything
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">About ResetPath</div>
        <div style={{ fontSize: '14px', color: '#7f8c8d', lineHeight: '1.6' }}>
          <p>
            ResetPath is designed to support you on your journey to break harmful habits 
            and build healthier ones. Remember that recovery is a process, not a destination.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Be patient with yourself, celebrate small victories, and don't hesitate to 
            seek professional help when needed.
          </p>
          <div style={{ textAlign: 'center', fontWeight: '600', color: '#4A90E2' }}>
            Version 1.0.0
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Support Resources</div>
        <div style={{ fontSize: '14px' }}>
          <div style={{ marginBottom: '12px' }}>
            <strong>Crisis Support:</strong>
            <div style={{ color: '#7f8c8d' }}>
              If you're in crisis, please reach out to a mental health professional 
              or call a crisis hotline in your area.
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Online Communities:</strong>
            <div style={{ color: '#7f8c8d' }}>
              Consider joining supportive online communities for additional encouragement 
              and accountability.
            </div>
          </div>
          <div>
            <strong>Professional Help:</strong>
            <div style={{ color: '#7f8c8d' }}>
              A therapist specializing in addiction can provide personalized strategies 
              and support for your recovery journey.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
