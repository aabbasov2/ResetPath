import React, { useState } from 'react';
import { AppData } from '../App';

interface JournalProps {
  data: AppData;
  updateData: (newData: Partial<AppData>) => void;
}

const journalPrompts = [
  "What triggered me today?",
  "What am I grateful for right now?",
  "How did I handle challenges today?",
  "What positive changes have I noticed in myself?",
  "What healthy activities brought me joy today?",
  "What would I tell someone else going through this?",
  "What are three things I accomplished today?",
  "How can I better prepare for tomorrow's challenges?",
];

const Journal: React.FC<JournalProps> = ({ data, updateData }) => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentGratitude, setCurrentGratitude] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(journalPrompts[0]);

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = data.journalEntries.find(entry => entry.date === today);

  const saveEntry = () => {
    if (!currentEntry.trim() && !currentGratitude.trim()) return;

    const newEntry = {
      date: today,
      content: currentEntry,
      gratitude: currentGratitude,
    };

    const updatedEntries = data.journalEntries.filter(entry => entry.date !== today);
    updatedEntries.push(newEntry);
    updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    updateData({ journalEntries: updatedEntries });
    setCurrentEntry('');
    setCurrentGratitude('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="screen">
      <h1 className="screen-title">Daily Journal</h1>
      
      <div className="card">
        <div className="card-title">Today's Reflection</div>
        
        <div className="form-group">
          <label className="form-label">Writing Prompt</label>
          <select 
            value={selectedPrompt}
            onChange={(e) => setSelectedPrompt(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '8px',
              fontSize: '16px',
              background: 'white'
            }}
          >
            {journalPrompts.map((prompt, index) => (
              <option key={index} value={prompt}>{prompt}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">{selectedPrompt}</label>
          <textarea
            className="form-textarea"
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Three Things I'm Grateful For</label>
          <textarea
            className="form-textarea"
            value={currentGratitude}
            onChange={(e) => setCurrentGratitude(e.target.value)}
            placeholder="1. 
2. 
3. "
            rows={3}
          />
        </div>

        <button 
          className="btn btn-success" 
          onClick={saveEntry}
          disabled={!currentEntry.trim() && !currentGratitude.trim()}
        >
          💾 Save Today's Entry
        </button>

        {todayEntry && (
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            background: '#e8f5e8', 
            borderRadius: '8px' 
          }}>
            ⚡ You've already written an entry today! You can update it by writing above.
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Recent Entries</div>
        {data.journalEntries.length === 0 ? (
          <p style={{ color: '#7f8c8d', textAlign: 'center' }}>
            No entries yet. Start writing to track your journey!
          </p>
        ) : (
          <div>
            {data.journalEntries.slice(0, 5).map((entry, index) => (
              <div key={index} style={{ 
                marginBottom: '16px', 
                padding: '16px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                borderLeft: '4px solid #4A90E2'
              }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#4A90E2',
                  marginBottom: '8px'
                }}>
                  {formatDate(entry.date)}
                </div>
                
                {entry.content && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                      Reflection:
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                      {entry.content}
                    </div>
                  </div>
                )}
                
                {entry.gratitude && (
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                      Gratitude:
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                      {entry.gratitude}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {data.journalEntries.length > 5 && (
              <div style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '14px' }}>
                ... and {data.journalEntries.length - 5} more entries
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">Journal Benefits</div>
        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
          <div style={{ marginBottom: '8px' }}>
            ⚔️ <strong>Track patterns:</strong> Identify triggers and progress over time
          </div>
          <div style={{ marginBottom: '8px' }}>
            ⚙️ <strong>Process emotions:</strong> Writing helps you understand your feelings
          </div>
          <div style={{ marginBottom: '8px' }}>
            🙏 <strong>Practice gratitude:</strong> Focus on positive aspects of your life
          </div>
          <div>
            ⚡ <strong>Build self-awareness:</strong> Develop better coping strategies
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
