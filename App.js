// App.js
import React, { useState } from 'react';
import './styles.css';

export default function App() {
  const [field, setField] = useState('');
  const [started, setStarted] = useState(false);
  
  const fields = [
    "Molecular Biology",
    "Genomics",
    "Stem Cell Research",
    "Immunology",
    "Bioinformatics",
    "Drug Discovery",
    "Clinical Research",
    "Synthetic Biology",
    "Neuroscience"
  ];
  
  return (
    <div className="app-container">
      <div className="content-container">
        <h1 className="main-title">AI-Powered Biotech Interview Coach</h1>
        <p className="subtitle">
          Practice real-time mock interviews tailored to your dream role in biotechnology.
        </p>
        
        {!started ? (
          <div className="fields-grid">
            {fields.map((f) => (
              <div 
                key={f} 
                className="field-card" 
                onClick={() => { setField(f); setStarted(true); }}
              >
                {f}
              </div>
            ))}
          </div>
        ) : (
          <InterviewInterface field={field} />
        )}
      </div>
    </div>
  );
}

function InterviewInterface({ field }) {
  const [question, setQuestion] = useState(`Welcome! Let's begin your ${field} interview. Tell me about your interest in this field.`);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmit = () => {
    if (!answer.trim()) return;
    
    // Save current Q&A to history
    setHistory([...history, { question, answer }]);
    
    // Simple logic for generating feedback and next question
    let newFeedback = '';
    let newQuestion = '';
    
    if (answer.toLowerCase().includes("research") || answer.toLowerCase().includes("data")) {
      newFeedback = "Good start! Your focus on research shows your technical understanding.";
      newQuestion = `Could you elaborate on a specific ${field} project or research experience you've had?`;
    } else {
      newFeedback = `Try to relate your answer more specifically to ${field}. Mention relevant techniques or concepts.`;
      newQuestion = `Let's try a different approach. What specific skills in ${field} do you possess that make you a strong candidate?`;
    }
    
    setFeedback(newFeedback);
    setQuestion(newQuestion);
    setAnswer('');
  };

  return (
    <div className="interview-container">
      <h2 className="interview-question">{question}</h2>
      
      <div className="input-container">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="answer-input"
          rows="4"
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
      
      {feedback && <p className="feedback">{feedback}</p>}
      
      {history.length > 0 && (
        <div className="history-container">
          <h3>Interview Progress</h3>
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <p className="history-question"><strong>Q:</strong> {item.question}</p>
              <p className="history-answer"><strong>A:</strong> {item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
