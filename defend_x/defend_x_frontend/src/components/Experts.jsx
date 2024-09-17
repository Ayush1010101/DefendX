import React, { useState, useEffect } from 'react';
import demoData from './demo.json';

function Experts({ active }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const sortedExperts = [...demoData.experts].sort((a, b) => a.id.localeCompare(b.id));
    setExperts(sortedExperts);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <section id="experts" className={active ? 'active' : ''}>
      <h2><i className="fas fa-user-tie"></i>Expert Profiles</h2>
      <input
        type="text"
        placeholder="Search by ID or name"
        className="search-bar"
        onChange={handleSearch}
      />
      <ul className="list">
        {experts.map((expert) => (
          <li key={expert.id} style={{ display: (expert.id.toLowerCase().includes(searchTerm) || expert.name.toLowerCase().includes(searchTerm)) ? 'block' : 'none' }}>
            <h3>{expert.name}</h3>
            <p><i className="fas fa-id-badge"></i>ID: {expert.id}</p>
          </li>
        ))}
      </ul>
      <button className="add-btn"><i className="fas fa-plus"></i>Add New Expert</button>
    </section>
  );
}

export default Experts;