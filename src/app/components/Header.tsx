"use client";

import React from "react";
import styles from "../styles/Header.module.scss";
import Image from "next/image";

interface Props {
  currency: "RUB" | "USD" | "EUR";
  onCurrencyChange: (newCurrency: "RUB" | "USD" | "EUR") => void;
}

const Header: React.FC<Props> = ({ currency, onCurrencyChange }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={"/images/logo.png"} alt="logo" width={70} height={70}/>
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navLink}>
          Домой
        </a>
        <a href="#" className={styles.navLink}>
          О нас
        </a>
        <a href="#" className={styles.navLink}>
          Контакты
        </a>
      </nav>
      <div className={styles.currencySelector}>
        {(["RUB", "USD", "EUR"] as const).map((curr) => (
          <button
            key={curr}
            className={`${styles.currencyButton} ${
              currency === curr ? styles.active : ""
            }`}
            onClick={() => onCurrencyChange(curr)}
          >
            {curr}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
