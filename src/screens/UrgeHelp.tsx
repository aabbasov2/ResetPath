import React, { useState, useEffect } from 'react';

const UrgeHelp: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<string>('breathing');
  const [breathingCount, setBreathingCount] = useState<number>(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);

  const healthyActivities = [
    "Take a cold shower",
    "Do 20 push-ups or jumping jacks",
    "Call a friend or family member",
    "Go for a walk outside",
    "Listen to uplifting music",
    "Write in your journal",
    "Practice meditation",
    "Read a book or article",
    "Clean or organize something",
    "Work on a hobby or skill",
    "Watch an inspiring video",
    "Do some stretching or yoga"
  ];

  const groundingTechnique = {
    title: "5-4-3-2-1 Grounding Technique",
    steps: [
      "5 things you can SEE around you",
      "4 things you can TOUCH",
      "3 things you can HEAR",
      "2 things you can SMELL",
      "1 thing you can TASTE"
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          const newCount = prev + 1;
          
          if (breathingPhase === 'inhale' && newCount >= 4) {
            setBreathingPhase('hold');
            return 0;
          } else if (breathingPhase === 'hold' && newCount >= 7) {
            setBreathingPhase('exhale');
            return 0;
          } else if (breathingPhase === 'exhale' && newCount >= 8) {
            setBreathingPhase('inhale');
            return 0;
          }
          
          return newCount;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPhase]);

  const startBreathing = () => {
    setIsBreathingActive(true);
    setBreathingCount(0);
    setBreathingPhase('inhale');
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
    setBreathingCount(0);
    setBreathingPhase('inhale');
  };

  const getRandomActivity = () => {
    return healthyActivities[Math.floor(Math.random() * healthyActivities.length)];
  };

  return (
    <div className="screen">
      <h1 className="screen-title">You've Got This! ⚡</h1>
      
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
          This feeling will pass. You are stronger than this urge.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          className={`btn ${currentExercise === 'breathing' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentExercise('breathing')}
          style={{ flex: 1 }}
        >
          🫁 Breathe
        </button>
        <button 
          className={`btn ${currentExercise === 'grounding' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentExercise('grounding')}
          style={{ flex: 1 }}
        >
          🧘 Ground
        </button>
        <button 
          className={`btn ${currentExercise === 'activities' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setCurrentExercise('activities')}
          style={{ flex: 1 }}
        >
          ⚡ Act
        </button>
      </div>

      {currentExercise === 'breathing' && (
        <div className="card">
          <div className="card-title">4-7-8 Breathing Exercise</div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: '700', 
              color: '#4A90E2',
              marginBottom: '8px'
            }}>
              {breathingCount + 1}
            </div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: '600',
              color: breathingPhase === 'inhale' ? '#27ae60' : 
                     breathingPhase === 'hold' ? '#f39c12' : '#e74c3c'
            }}>
              {breathingPhase === 'inhale' ? 'Inhale' : 
               breathingPhase === 'hold' ? 'Hold' : 'Exhale'}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '20px', color: '#7f8c8d' }}>
            Inhale for 4, hold for 7, exhale for 8
          </div>

          {!isBreathingActive ? (
            <button className="btn btn-success" onClick={startBreathing}>
              Start Breathing Exercise
            </button>
          ) : (
            <button className="btn btn-secondary" onClick={stopBreathing}>
              Stop Exercise
            </button>
          )}
        </div>
      )}

      {currentExercise === 'grounding' && (
        <div className="card">
          <div className="card-title">{groundingTechnique.title}</div>
          <p style={{ marginBottom: '16px', color: '#7f8c8d' }}>
            Focus on your senses to bring yourself back to the present moment:
          </p>
          {groundingTechnique.steps.map((step, index) => (
            <div key={index} style={{ 
              padding: '12px', 
              margin: '8px 0', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              borderLeft: '4px solid #4A90E2'
            }}>
              <strong>{step}</strong>
            </div>
          ))}
          <div style={{ marginTop: '16px', padding: '12px', background: '#e8f5e8', borderRadius: '8px' }}>
            <strong>Take your time with each step. There's no rush.</strong>
          </div>
        </div>
      )}

      {currentExercise === 'activities' && (
        <div className="card">
          <div className="card-title">Healthy Alternatives</div>
          <p style={{ marginBottom: '16px', color: '#7f8c8d' }}>
            Redirect your energy into something positive:
          </p>
          
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {getRandomActivity()}
            </div>
          </div>

          <button className="btn" onClick={() => window.location.reload()}>
            🔄 Get Another Suggestion
          </button>

          <div style={{ marginTop: '16px' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>More Ideas:</div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {healthyActivities.slice(0, 6).map((activity, index) => (
                <div key={index} style={{ 
                  padding: '8px 12px', 
                  background: '#f8f9fa', 
                  borderRadius: '6px',
                  fontSize: '14px'
                }}>
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Emergency Contacts</div>
        <p style={{ color: '#7f8c8d', marginBottom: '12px' }}>
          If you're struggling, reach out for support:
        </p>
        <button className="btn btn-secondary" style={{ marginBottom: '8px' }}>
          📞 Call a Trusted Friend
        </button>
        <button className="btn btn-secondary">
          💬 Text Your Accountability Partner
        </button>
      </div>

      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: '#7f8c8d',
        fontSize: '14px'
      }}>
        Remember: This urge is temporary. You are building a better future.
      </div>
    </div>
  );
};

export default UrgeHelp;
