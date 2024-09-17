import React from 'react';

function Sidebar({ activeSection, setActiveSection }) {
  return (
    <aside className="sidebar">
      <div className="logo"><i className="fas fa-brain"></i>ExpertSelect</div>
      <nav>
        <ul>
          <li>
            <a
              href="#home"
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => setActiveSection('home')}
            >
              <i className="fas fa-home"></i>Dashboard
            </a>
          </li>
          <li>
            <a
              href="#experts"
              className={activeSection === 'experts' ? 'active' : ''}
              onClick={() => setActiveSection('experts')}
            >
              <i className="fas fa-user-tie"></i>Experts
            </a>
          </li>
          <li>
            <a
              href="#candidates"
              className={activeSection === 'candidates' ? 'active' : ''}
              onClick={() => setActiveSection('candidates')}
            >
              <i className="fas fa-users"></i>Candidates
            </a>
          </li>
          <li>
            <a
              href="#matching"
              className={activeSection === 'matching' ? 'active' : ''}
              onClick={() => setActiveSection('matching')}
            >
              <i className="fas fa-puzzle-piece"></i>Matching
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;