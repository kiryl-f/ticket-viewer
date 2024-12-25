import Image from "next/image";
import styles from "./page.module.css";
import TicketList from "./components/TicketList";

export default function Home() {
  return (
    <div className={styles.page}>
      <TicketList/>
    </div>
  );
}
