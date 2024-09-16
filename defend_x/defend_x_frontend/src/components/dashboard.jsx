import React, { useState, useEffect } from 'react';
import './styles.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [isMatching, setIsMatching] = useState(false);
  
  const handleNavigationClick = (section) => {
    setActiveSection(section);
  };

  const handleMatching = () => {
    if (!isMatching) {
      setIsMatching(true);
      setMatchingProgress(0);
      const interval = setInterval(() => {
        setMatchingProgress((prevProgress) => {
          const newProgress = prevProgress + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              alert('Matching process completed!');
              setIsMatching(false);
            }, 1000);
          }
          return newProgress;
        });
      }, 500);
    }
  };

  return (
    <div className="container">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigationClick} />
      <MainContent
        activeSection={activeSection}
        matchingProgress={matchingProgress}
        isMatching={isMatching}
        onStartMatching={handleMatching}
      />
    </div>
  );
};

const Sidebar = ({ activeSection, onNavigate }) => (
  <aside className="sidebar">
    <div className="logo"><i className="fas fa-brain"></i> ExpertSelect</div>
    <nav>
      <ul>
        <li>
          <a
            href="#home"
            className={activeSection === 'home' ? 'active' : ''}
            onClick={() => onNavigate('home')}
          >
            <i className="fas fa-home"></i> Dashboard
          </a>
        </li>
        <li>
          <a
            href="#experts"
            className={activeSection === 'experts' ? 'active' : ''}
            onClick={() => onNavigate('experts')}
          >
            <i className="fas fa-user-tie"></i> Experts
          </a>
        </li>
        <li>
          <a
            href="#candidates"
            className={activeSection === 'candidates' ? 'active' : ''}
            onClick={() => onNavigate('candidates')}
          >
            <i className="fas fa-users"></i> Candidates
          </a>
        </li>
        <li>
          <a
            href="#matching"
            className={activeSection === 'matching' ? 'active' : ''}
            onClick={() => onNavigate('matching')}
          >
            <i className="fas fa-puzzle-piece"></i> Matching
          </a>
        </li>
      </ul>
    </nav>
  </aside>
);

const MainContent = ({ activeSection, matchingProgress, isMatching, onStartMatching }) => {
  return (
    <main className="content">
      <Section id="home" isActive={activeSection === 'home'}>
        <h1><i className="fas fa-chart-line"></i> Dashboard</h1>
        <QuickStats />
        <div className="quick-actions">
          <button><i className="fas fa-play"></i> New Match</button>
          <button><i className="fas fa-user-plus"></i> Add Expert</button>
          <button><i className="fas fa-user-graduate"></i> Add Candidate</button>
        </div>
      </Section>

      <Section id="experts" isActive={activeSection === 'experts'}>
        <h2><i className="fas fa-user-tie"></i> Expert Profiles</h2>
        <SearchBar placeholder="Search by expertise or name" />
        <ul className="list">
          <li>
            <h3>John Doe</h3>
            <p><i className="fas fa-id-badge"></i> Employee ID: E001</p>
            <p><i className="fas fa-laptop-code"></i> Primary Expertise: Software Engineering</p>
          </li>
        </ul>
        <button className="add-btn"><i className="fas fa-plus"></i> Add New Expert</button>
      </Section>

      <Section id="candidates" isActive={activeSection === 'candidates'}>
        <h2><i className="fas fa-users"></i> Candidates</h2>
        <SearchBar placeholder="Search by area of interest or name" />
        <ul className="list">
          <li>
            <h3>Jane Smith</h3>
            <p><i className="fas fa-id-card"></i> Application ID: C001</p>
            <p><i className="fas fa-chart-bar"></i> Primary Area of Interest: Data Science</p>
          </li>
        </ul>
        <button className="add-btn"><i className="fas fa-plus"></i> Add New Candidate</button>
      </Section>

      <Section id="matching" isActive={activeSection === 'matching'}>
        <h2><i className="fas fa-puzzle-piece"></i> Match Processing</h2>
        <button id="start-matching" onClick={onStartMatching} disabled={isMatching}>
          {isMatching ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-play"></i>}
          {isMatching ? ' Matching...' : ' Start Matching'}
        </button>
        <div className="progress-bar"><div className="progress" style={{ width: `${matchingProgress}%` }}></div></div>
      </Section>
    </main>
  );
};

const Section = ({ id, isActive, children }) => (
  <section id={id} className={isActive ? 'active' : ''}>
    {children}
  </section>
);

const QuickStats = () => (
  <div className="quick-stats">
    <div className="stat"><i className="fas fa-user-tie fa-2x"></i><h3>Total Experts</h3><p>50</p></div>
    <div className="stat"><i className="fas fa-users fa-2x"></i><h3>Total Candidates</h3><p>100</p></div>
    <div className="stat"><i className="fas fa-tasks fa-2x"></i><h3>Pending Matches</h3><p>25</p></div>
  </div>
);

const SearchBar = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
    />
  );
};

export default Dashboard;
