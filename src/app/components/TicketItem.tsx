"use client"

import React from 'react';
import { Ticket } from '../types/Ticket';
import styles from "../styles/Ticket.module.scss";

interface Props {
  ticket: Ticket;
}

const TicketItem: React.FC<Props> = ({ ticket }) => (
  <div className={styles.ticket}>
    <div className={styles.ticketHeader}>
      <div className={styles.ticketTitle}>{ticket.carrier}</div>
      <div className={styles.ticketStatus}>Active</div>
    </div>

    <div className={styles.ticketDetails}>
      <div className={styles.detail}>
        <span className={styles.label}>Departure</span>
        <span className={styles.value}>{ticket.departure_date} {ticket.departure_time}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.label}>Arrival</span>
        <span className={styles.value}>{ticket.arrival_date} {ticket.arrival_time}</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.label}>From</span>
        <span className={styles.value}>{ticket.origin_name} ({ticket.origin})</span>
      </div>
      <div className={styles.detail}>
        <span className={styles.label}>To</span>
        <span className={styles.value}>{ticket.destination_name} ({ticket.destination})</span>
      </div>
    </div>

    <div className={styles.ticketFooter}>
      <div className={styles.price}>${ticket.price}</div>
      <div className={styles.stops}>{ticket.stops} Stops</div>
      <button className={styles.bookBtn}>Book Now</button>
    </div>
  </div>
);

export default TicketItem;
