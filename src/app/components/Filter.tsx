"use client"

import React from 'react';

interface Props {
  onFilterChange: (stops: number | null) => void;
}

const Filter: React.FC<Props> = ({ onFilterChange }) => (
  <div>
    <label>Filter by stops:</label>
    <select onChange={e => onFilterChange(e.target.value ? Number(e.target.value) : null)}>
      <option value="">All</option>
      <option value="0">Non-stop</option>
      <option value="1">1 Stop</option>
      <option value="2">2 Stops</option>
    </select>
  </div>
);

export default Filter;
