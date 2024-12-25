"use client"

import React from 'react';
import { Ticket } from '../types/Ticket';

interface Props {
  ticket: Ticket;
}

const TicketItem: React.FC<Props> = ({ ticket }) => (
  <div>
    <p>From: {ticket.origin} → To: {ticket.destination}</p>
    <p>Price: {ticket.price}</p>
    <p>Stops: {ticket.stops}</p>
  </div>
);

export default TicketItem;
