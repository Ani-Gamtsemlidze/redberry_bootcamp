import React, { useState } from "react";
import logo from "../../../public/images/redberry_logo.png";
import LoginBox from "../loginBox/LoginBox";
import styles from "./Header.module.css";

const Header = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  function handleLogin() {
    setIsPopUp(true);
  }
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      <div onClick={handleLogin} className={styles.login}>
        <button>შესვლა</button>
      </div>
      {isPopUp ? <LoginBox /> : null}
    </div>
  );
};

export default Header;
