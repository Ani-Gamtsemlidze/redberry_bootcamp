import React, { useState } from "react";
import logo from "../../../public/images/redberry_logo.png";
import { useLogin } from "../../context/LoginContextProvider";
import styles from "./Header.module.css";

const Header = () => {
  const { active, handleLogin } = useLogin();

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      <div className={styles.login}>
        {active ? (
          <button>დაამატე ბლოგი</button>
        ) : (
          <button onClick={handleLogin}>შესვლა</button>
        )}
      </div>
    </div>
  );
};

export default Header;
