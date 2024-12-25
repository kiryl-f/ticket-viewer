"use client"

import React, { useState, useEffect } from 'react';
import TicketItem from './TicketItem';
import ticketsData from '../data/tickets.json';
import { Ticket } from '../types/Ticket';
import Filter from './Filter';
import styles from "../styles/TicketList.module.scss";

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    const sortedTickets = [...ticketsData.tickets].sort((a, b) => a.price - b.price);

    setTickets(sortedTickets);
    setFilteredTickets(sortedTickets);
  }, []);

  const handleFilterChange = (stops: number | null) => {
    setFilter(stops);
    setFilteredTickets(
      stops !== null ? tickets.filter(ticket => ticket.stops === stops) : tickets
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.currencySelector}>
          <button className={styles.currencyButton}>RUB</button>
          <button className={`${styles.currencyButton} ${styles.active}`}>USD</button>
          <button className={styles.currencyButton}>EUR</button>
        </div>
      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Filter onFilterChange={handleFilterChange} />
        </aside>
        <main className={styles.ticketList}>
          {filteredTickets.map(ticket => (
            <TicketItem key={Math.random()} ticket={ticket} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default TicketList;
