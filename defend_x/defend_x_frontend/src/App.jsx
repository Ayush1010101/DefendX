import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Experts from './components/Experts';
import Candidates from './components/Candidates';
import Matching from './components/Matching';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMatching, setIsMatching] = useState(false);

  const startMatching = () => {
    setIsMatching(true);
  };

  return (
    <div className="container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="content">
        <Dashboard 
          active={activeSection === 'home'} 
          setActiveSection={setActiveSection}
          startMatching={startMatching}
        />
        <Experts active={activeSection === 'experts'} />
        <Candidates active={activeSection === 'candidates'} />
        <Matching 
          active={activeSection === 'matching'} 
          isMatching={isMatching}
          setIsMatching={setIsMatching}
        />
      </main>
    </div>
  );
}

export default App;