"use client";

import React, { useState, useEffect } from 'react';
import TicketItem from './TicketItem';
import ticketsData from '../data/tickets.json';
import { Ticket } from '../types/Ticket';
import Filter from './Filter';
import styles from "../styles/TicketList.module.scss";
import Header from './Header';

const currencyRates = {
  RUB: 1,
  USD: 0.013,
  EUR: 0.012,
};

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"RUB" | "USD" | "EUR">("USD");

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

  const handleCurrencyChange = (newCurrency: "RUB" | "USD" | "EUR") => {
    setCurrency(newCurrency);
  };

  const convertPrice = (price: number) => {
    return (price * currencyRates[currency]).toFixed(2);
  };

  return (
    <div className={styles.container}>
       <Header currency={currency} onCurrencyChange={handleCurrencyChange} />
     
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Filter onFilterChange={handleFilterChange} />
        </aside>
        <main className={styles.ticketList}>
          {filteredTickets.map(ticket => (
            <TicketItem
              key={Math.random()}
              ticket={{
                ...ticket,
                price: Number(convertPrice(ticket.price)),
              }}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default TicketList;
