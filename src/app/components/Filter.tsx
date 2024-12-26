"use client";

import React, { useState } from 'react';
import styles from "../styles/Filter.module.scss";

interface Props {
  onFilterChange: (stops: number[]) => void;
  onPriceChange: (priceRange: [number, number]) => void;
}

const Filter: React.FC<Props> = ({ onFilterChange, onPriceChange }) => {
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]); 

  const toggleStop = (stop: number) => {
    const updatedStops = selectedStops.includes(stop)
      ? selectedStops.filter(s => s !== stop)
      : [...selectedStops, stop];

    setSelectedStops(updatedStops);
    onFilterChange(updatedStops);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
    onPriceChange(newRange);
  };

  return (
    <div className={styles.filter}>
      <h3>Фильтр</h3>

      <div className={styles.filterGroup}>
        <h4>Количество пересадок</h4>
        <label>
          <input
            type="checkbox"
            checked={selectedStops.includes(0)}
            onChange={() => toggleStop(0)}
          />
          Без пересадок
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStops.includes(1)}
            onChange={() => toggleStop(1)}
          />
          1 пересадка
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStops.includes(2)}
            onChange={() => toggleStop(2)}
          />
          2 пересадки
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStops.includes(3)}
            onChange={() => toggleStop(3)}
          />
          3 пересадки
        </label>
      </div>

      <div className={styles.filterGroup}>
        <h4>Цена</h4>
        <div className={styles.priceFilter}>
          <label>
            От:
            <input
              type="number"
              value={priceRange[0]}
              onChange={e => handlePriceChange(e, 0)}
            />
          </label>
          <label>
            До:
            <input
              type="number"
              value={priceRange[1]}
              onChange={e => handlePriceChange(e, 1)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
