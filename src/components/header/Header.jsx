import React, { useState } from "react";
import logo from "../../../public/images/redberry_logo.png";
import { useBlogs } from "../../context/BlogContextProvider";
import styles from "./Header.module.css";

const Header = () => {
  const { handleLogin, isLogin } = useBlogs();

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      {}
      <div className={styles.login}>
        {isLogin ? (
          <button onClick={handleLogin}>შესვლა</button>
        ) : (
          <button>დაამატე ბლოგი</button>
        )}
      </div>
    </div>
  );
};

export default Header;
