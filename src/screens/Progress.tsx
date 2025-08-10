import React from 'react';
import { AppData } from '../App';

interface ProgressProps {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
}

const Progress: React.FC<ProgressProps> = ({ data, updateData }) => {
  const calculateStreakHistory = () => {
    if (data.relapses.length === 0) {
      return [{ startDate: data.startDate, endDate: null, days: calculateCurrentStreak() }];
    }

    const streaks: Array<{
      startDate: string;
      endDate: string | null;
      days: number;
      reason?: string;
      notes?: string;
    }> = [];
    let currentStart = data.startDate;

    data.relapses.forEach((relapse, index) => {
      const startDate = new Date(currentStart);
      const endDate = new Date(relapse.date);
      const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      streaks.push({
        startDate: currentStart,
        endDate: relapse.date,
        days: days,
        reason: relapse.reason,
        notes: relapse.notes,
      });

      currentStart = relapse.date;
    });

    // Current streak
    const lastRelapse = data.relapses[data.relapses.length - 1];
    const currentStreakDays = calculateCurrentStreak();
    streaks.push({
      startDate: lastRelapse.date,
      endDate: null,
      days: currentStreakDays,
    });

    return streaks.reverse();
  };

  const calculateCurrentStreak = () => {
    if (data.relapses.length === 0) {
      const startDate = new Date(data.startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }
    
    const lastRelapse = new Date(data.relapses[data.relapses.length - 1].date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastRelapse.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const streakHistory = calculateStreakHistory();
  const totalRelapses = data.relapses.length;
  const averageStreak = streakHistory.length > 0 
    ? Math.round(streakHistory.reduce((sum, streak) => sum + streak.days, 0) / streakHistory.length)
    : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="screen">
      <h1 className="screen-title">Your Progress</h1>
      
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{data.longestStreak}</span>
          <span className="stat-label">Best Streak</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{averageStreak}</span>
          <span className="stat-label">Average Streak</span>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Overall Stats</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Total Relapses:</span>
          <span style={{ fontWeight: '600' }}>{totalRelapses}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Journey Started:</span>
          <span style={{ fontWeight: '600' }}>{formatDate(data.startDate)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Days in Recovery:</span>
          <span style={{ fontWeight: '600' }}>
            {Math.floor((new Date().getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24))}
          </span>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Streak History</div>
        {streakHistory.length === 0 ? (
          <p style={{ color: '#7f8c8d', textAlign: 'center' }}>No history yet. Keep going!</p>
        ) : (
          <div className="timeline">
            {streakHistory.map((streak, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-date">
                  {streak.endDate ? formatDate(streak.endDate) : 'Current'}
                </div>
                <div className="timeline-content">
                  <strong>{streak.days} days</strong>
                  {streak.reason && (
                    <div style={{ fontSize: '14px', color: '#7f8c8d', marginTop: '4px' }}>
                      Trigger: {streak.reason}
                    </div>
                  )}
                  {streak.notes && (
                    <div style={{ fontSize: '14px', color: '#7f8c8d', marginTop: '2px' }}>
                      Notes: {streak.notes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {data.relapses.length > 0 && (
        <div className="card">
          <div className="card-title">Common Triggers</div>
          <div>
            {Array.from(new Set(data.relapses.map(r => r.reason).filter(r => r.trim())))
              .slice(0, 5)
              .map((trigger, index) => (
                <div key={index} style={{ 
                  background: '#f8f9fa', 
                  padding: '8px 12px', 
                  borderRadius: '8px', 
                  margin: '4px 0',
                  fontSize: '14px'
                }}>
                  {trigger}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
