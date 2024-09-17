import React, { useEffect, useState } from 'react';
import demoData from './demo.json';

function Dashboard({ active, setActiveSection, startMatching }) {
  const [expertCount, setExpertCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);

  useEffect(() => {
    setExpertCount(demoData.experts.length);
    setCandidateCount(demoData.candidates.length);
  }, []);

  const handleNewMatch = () => {
    setActiveSection('matching');
    startMatching();
  };

  if (!active) return null;

  return (
    <section id="home" className="active">
      <h1><i className="fas fa-chart-line"></i>Dashboard</h1>
      <div className="quick-stats">
        <div className="stat"><i className="fas fa-user-tie fa-2x"></i><h3>Total Experts</h3><p>{expertCount}</p></div>
        <div className="stat"><i className="fas fa-users fa-2x"></i><h3>Total Candidates</h3><p>{candidateCount}</p></div>
        <div className="stat"><i className="fas fa-tasks fa-2x"></i><h3>Pending Matches</h3><p>0</p></div>
      </div>
      <div className="quick-actions">
        <button onClick={handleNewMatch}><i className="fas fa-play"></i>New Match</button>
        <button><i className="fas fa-user-plus"></i>Add Expert</button>
        <button><i className="fas fa-user-graduate"></i>Add Candidate</button>
      </div>
    </section>
  );
}

export default Dashboard;