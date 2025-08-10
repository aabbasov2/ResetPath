import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppData } from '../App';

interface HomeProps {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
}

const motivationalQuotes = [
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Anonymous" },
  { text: "You are stronger than your urges. You have the power to choose.", author: "ResetPath" },
  { text: "Progress, not perfection. Every step forward counts.", author: "Anonymous" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "You don't have to be perfect, you just have to be better than yesterday.", author: "ResetPath" },
];

const dailyGoals = [
  "Take a 10-minute walk outside",
  "Read for 15 minutes",
  "Do 20 push-ups or stretches",
  "Call a friend or family member",
  "Practice deep breathing for 5 minutes",
  "Write down 3 things you're grateful for",
  "Learn something new for 10 minutes"
];

const recoveryFacts = [
  // Days 1-3
  { dayRange: [1, 3], title: "Dopamine Reset Begins", fact: "Your brain's reward system is starting to normalize. The artificially high dopamine spikes from porn use are beginning to decrease, allowing natural sensitivity to return." },
  
  // Days 4-7
  { dayRange: [4, 7], title: "Mental Clarity Emerging", fact: "Your prefrontal cortex activity is improving, enhancing decision-making and impulse control. Sleep quality often increases as late-night sessions disappear." },
  
  // Days 8-14
  { dayRange: [8, 14], title: "Energy & Focus Rising", fact: "Brain fog is lifting and your focus is sharpening. Testosterone levels are stabilizing, contributing to improved mood and natural energy levels." },
  
  // Days 15-21
  { dayRange: [15, 21], title: "Emotional Balance Improving", fact: "Your sensitivity to everyday pleasures like music, food, and touch is returning as desensitization reverses. Social anxiety often decreases during this phase." },
  
  // Days 22-30
  { dayRange: [22, 30], title: "Stress Response Strengthening", fact: "You're developing healthier coping mechanisms. Your brain is learning to find dopamine from exercise, hobbies, and real connections instead of artificial stimulation." },
  
  // Days 31-45
  { dayRange: [31, 45], title: "Natural Libido Returning", fact: "Spontaneous attraction to real-life partners increases. Healthy sexual function and morning erections often return if they were affected by heavy porn use." },
  
  // Days 46-60
  { dayRange: [46, 60], title: "Confidence Building", fact: "Self-discipline is carrying over into other areas of life. You're more willing to approach new challenges and your self-image is strengthening." },
  
  // Days 61-90
  { dayRange: [61, 90], title: "Brain Rewiring Complete", fact: "Major neural pathways have been restructured. The habit loops around porn and masturbation have weakened significantly, leading to lasting emotional stability." },
  
  // Days 91+
  { dayRange: [91, 365], title: "Long-term Benefits", fact: "You've achieved lasting brain rewiring. Increased motivation, emotional stability, and satisfaction in real relationships are now your new normal." }
];

const Home: React.FC<HomeProps> = ({ data, updateData }) => {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const todayQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];
  const todayGoal = dailyGoals[new Date().getDay() % dailyGoals.length];

  const getTodaysRecoveryFact = (streakDay: number) => {
    // Find the appropriate recovery fact based on streak day
    const fact = recoveryFacts.find(f => 
      streakDay >= f.dayRange[0] && streakDay <= f.dayRange[1]
    );
    
    // Default fact for day 0 or if no match found
    return fact || {
      title: "Your Journey Begins",
      fact: "Every journey starts with a single step. Today you're taking control of your life and beginning a path toward better mental and physical health."
    };
  };

  const isTodayGoalCompleted = () => {
    return data.dailyGoals?.some(goal => goal.date === today && goal.completed) || false;
  };

  const markTodayGoalComplete = () => {
    const dailyGoals = data.dailyGoals || [];
    const existingGoalIndex = dailyGoals.findIndex(goal => goal.date === today);
    
    const updatedGoals = [...dailyGoals];
    if (existingGoalIndex >= 0) {
      updatedGoals[existingGoalIndex].completed = true;
    } else {
      updatedGoals.push({ date: today, completed: true });
    }
    
    updateData({ ...data, dailyGoals: updatedGoals });
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

  const handleGoalComplete = () => {
    markTodayGoalComplete();
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const currentStreak = calculateCurrentStreak();
  const todaysRecoveryFact = getTodaysRecoveryFact(currentStreak);

  const handleRelapse = () => {
    const reason = prompt("What triggered this? (Optional - this helps you learn)");
    const notes = prompt("Any additional notes? (Optional)");
    
    const newRelapse = {
      date: today,
      reason: reason || "",
      notes: notes || "",
    };

    const newRelapses = [...data.relapses, newRelapse];
    const newLongestStreak = Math.max(data.longestStreak, currentStreak);

    updateData({
      relapses: newRelapses,
      longestStreak: newLongestStreak,
    });
  };

  return (
    <div className="screen">
      <h1 className="screen-title">Welcome Back</h1>
      
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{currentStreak}</span>
          <span className="stat-label">Current Streak</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{data.longestStreak}</span>
          <span className="stat-label">Best Streak</span>
        </div>
      </div>

      {/* Prominent Panic Button */}
      <button 
        className="panic-button-prominent"
        onClick={() => navigate('/urge-help')}
      >
        <span className="panic-icon">⚠️</span>
        <span className="panic-title">NEED HELP NOW?</span>
        <span className="panic-subtitle">Tap for immediate urge support</span>
      </button>

      {/* Today's Recovery Fact */}
      <div className="recovery-fact-card">
        <div className="recovery-fact-header">
          <span className="recovery-fact-icon">⚙️</span>
          <span className="recovery-fact-title">Today's Recovery Fact</span>
          <span className="recovery-fact-day">Day {currentStreak}</span>
        </div>
        <div className="recovery-fact-science-title">{todaysRecoveryFact.title}</div>
        <div className="recovery-fact-text">{todaysRecoveryFact.fact}</div>
      </div>

      <div className="quote-card">
        <div className="quote-text">"{todayQuote.text}"</div>
        <div className="quote-author">— {todayQuote.author}</div>
      </div>

      <div className="card">
        <div className="card-title">Today's Goal</div>
        <p>{todayGoal}</p>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <div className="celebration-emoji">🎉</div>
            <div className="celebration-text">Goal Completed!</div>
            <div className="celebration-subtext">Great job staying on track! ⚡</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Quick Actions</div>
        <button 
          className={`btn ${isTodayGoalCompleted() ? 'btn-completed' : 'btn-success'}`}
          onClick={handleGoalComplete}
          disabled={isTodayGoalCompleted()}
        >
          {isTodayGoalCompleted() ? '⚡ Goal Completed!' : '🎯 Mark Goal Complete'}
        </button>
        <button className="btn btn-secondary" onClick={() => window.location.href = '/journal'}>
          ⚔️ Write in Journal
        </button>
        <button className="btn btn-danger" onClick={handleRelapse}>
          ⚠️ Record Relapse
        </button>
      </div>
    </div>
  );
};

export default Home;
