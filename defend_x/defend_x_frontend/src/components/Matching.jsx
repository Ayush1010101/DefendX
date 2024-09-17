import React, { useState, useEffect } from 'react';
import './Matching.css';

function Matching({ active, isMatching, setIsMatching }) {
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (isMatching) {
      startMatchingProcess();
    }
  }, [isMatching]);

  const startMatchingProcess = () => {
    setProgress(0);
    setResults([]);

    const eventSource = new EventSource('http://localhost:3223/start');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress);
      setResults(prevResults => [...prevResults, data.result]);
    };

    eventSource.addEventListener('error', (event) => {
      console.error('Error:', event);
      setIsMatching(false);
      eventSource.close();
    });

    eventSource.addEventListener('end', () => {
      setIsMatching(false);
      eventSource.close();
    });
  };

  if (!active) return null;

  return (
    <section id="matching" className={active ? 'active' : ''}>
      <h2><i className="fas fa-puzzle-piece"></i>Match Processing</h2>
      <button id="start-matching" onClick={() => setIsMatching(true)} disabled={isMatching}>
        {isMatching ? (
          <><i className="fas fa-spinner fa-spin"></i> Matching...</>
        ) : (
          <><i className="fas fa-play"></i> Start Matching</>
        )}
      </button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="match-results">
        {results.map((result, index) => (
          <div key={index} className="match-card">
            <div className="candidate-info">
              <h3>{result.candidateName}</h3>
              <p>ID: {result.candidateId}</p>
            </div>
            <div className="experts-list">
              {result.experts.map(expert => (
                <div key={expert.expertId} className="expert-item">
                  <div className="expert-info">
                    <strong>{expert.expertName}</strong>
                    <span>ID: {expert.expertId}</span>
                  </div>
                  <div 
                    className="relevancy-score" 
                    style={{ '--score': `${expert.relevancyScore}%` }}
                    data-score={`${expert.relevancyScore}%`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Matching;