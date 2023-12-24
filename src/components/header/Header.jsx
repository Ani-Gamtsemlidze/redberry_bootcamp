import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/images/redberry_logo.png";
import { useLogin } from "../../context/LoginContextProvider";
import LoginBox from "../loginBox/LoginBox";
import styles from "./Header.module.css";

const Header = () => {
  const { active, handleLogin, isPopUp, handleAddBlog } = useLogin();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        <div className={styles.login}>
          {active ? (
            <Link className={styles.header_btn} to="/addblog">
              დაამატე ბლოგი
            </Link>
          ) : (
            <button className={styles.header_btn} onClick={handleLogin}>
              შესვლა
            </button>
          )}
        </div>
      </div>
      {isPopUp ? <LoginBox /> : null}
    </>
  );
};

export default Header;
