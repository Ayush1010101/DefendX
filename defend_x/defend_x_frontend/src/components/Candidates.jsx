import React, { useState, useEffect } from 'react';
import demoData from './demo.json';

function Candidates({ active }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const sortedCandidates = [...demoData.candidates].sort((a, b) => a.id.localeCompare(b.id));
    setCandidates(sortedCandidates);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <section id="candidates" className={active ? 'active' : ''}>
      <h2><i className="fas fa-users"></i>Candidates</h2>
      <input
        type="text"
        placeholder="Search by ID or name"
        className="search-bar"
        onChange={handleSearch}
      />
      <ul className="list">
        {candidates.map((candidate) => (
          <li key={candidate.id} style={{ display: (candidate.id.toLowerCase().includes(searchTerm) || candidate.name.toLowerCase().includes(searchTerm)) ? 'block' : 'none' }}>
            <h3>{candidate.name}</h3>
            <p><i className="fas fa-id-card"></i>ID: {candidate.id}</p>
          </li>
        ))}
      </ul>
      <button className="add-btn"><i className="fas fa-plus"></i>Add New Candidate</button>
    </section>
  );
}

export default Candidates;