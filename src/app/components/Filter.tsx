"use client";

import React, { useState } from 'react';
import styles from "../styles/Filter.module.scss";

interface Props {
  onFilterChange: (stops: number | null) => void;
}

const Filter: React.FC<Props> = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 1000]);

  const handlePriceChange = (value: number, index: number) => {
    const updatedRange = [...priceRange] as [number, number];
    updatedRange[index] = value;
    setPriceRange(updatedRange);
  };

  return (
    <div className={styles.filterContainer}>
      <h3>Filter Options</h3>
      
      {/* Stops Filter */}
      <div className={styles.filterGroup}>
        <label>Filter by stops:</label>
        <select onChange={e => onFilterChange(e.target.value ? Number(e.target.value) : null)}>
          <option value="">All</option>
          <option value="0">Non-stop</option>
          <option value="1">1 Stop</option>
          <option value="2">2 Stops</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className={styles.filterGroup}>
        <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <div className={styles.rangeSlider}>
          <input
            type="range"
            min="50"
            max="1000"
            value={priceRange[0]}
            onChange={e => handlePriceChange(Number(e.target.value), 0)}
          />
          <input
            type="range"
            min="50"
            max="1000"
            value={priceRange[1]}
            onChange={e => handlePriceChange(Number(e.target.value), 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
