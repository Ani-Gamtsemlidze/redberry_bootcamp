import React from "react";
import logo from "../../../public/images/redberry_logo.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav>
      <ul className={styles.header}>
        <li className={styles.logo}>
          <img src={logo} />
        </li>
        <li className={styles.login}>
          <button>შესვლა</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
