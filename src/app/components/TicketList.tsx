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
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [currency, setCurrency] = useState<"RUB" | "USD" | "EUR">("USD");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    const sortedTickets = [...ticketsData.tickets].sort((a, b) => a.price - b.price);
    setTickets(sortedTickets);
    setFilteredTickets(sortedTickets);
  }, []);

  const handleFilterChange = (stops: number[]) => {
    setSelectedStops(stops);
    setFilteredTickets(
      stops.length === 0
        ? tickets
        : tickets.filter(ticket => stops.includes(ticket.stops))
    );
  };

  const handlePriceChange = (newPriceRange: [number, number]) => {
    setPriceRange(newPriceRange);
    applyFilters(selectedStops, newPriceRange);
  };

  const applyFilters = (stops: number[], price: [number, number]) => {
    const [minPrice, maxPrice] = price;
    const filtered = tickets.filter(ticket => {
      const inStops = stops.length === 0 || stops.includes(ticket.stops);
      const inPriceRange = ticket.price >= minPrice && ticket.price <= maxPrice;
      return inStops && inPriceRange;
    });
    setFilteredTickets(filtered);
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
          <Filter
            onFilterChange={handleFilterChange}
            onPriceChange={handlePriceChange}
          />
        </aside>
        <main className={styles.ticketList}>
          {filteredTickets.map(ticket => (
            <TicketItem
              key={"" + ticket.price + ticket.departure_date + ticket.destination} 
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
