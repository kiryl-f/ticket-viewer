"use client"

import React, { useState, useEffect } from 'react';
import TicketItem from './TicketItem';
import ticketsData from '../data/tickets.json';
import { Ticket } from '../types/Ticket';
import Filter from './Filter';

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
    <div>
      <h1>Available Tickets</h1>
      <Filter onFilterChange={handleFilterChange} />
      <div>
        {filteredTickets.map(ticket => (
          <TicketItem key={Math.random()} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
