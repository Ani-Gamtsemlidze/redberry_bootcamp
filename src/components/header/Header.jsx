import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/images/redberry_logo.png";
import { useLogin } from "../../context/LoginContextProvider";
import LoginBox from "../loginBox/LoginBox";
import styles from "./Header.module.css";

const Header = () => {
  const { active, handleLogin, isPopUp } = useLogin();
  const location = useLocation();

  const renderLoginButton = () => {
    if (active) {
      return (
        <Link className={styles.header_btn} to="/addblog">
          დაამატე ბლოგი
        </Link>
      );
    } else {
      return (
        <button className={styles.header_btn} onClick={handleLogin}>
          შესვლა
        </button>
      );
    }
  };

  return (
    <>
      <div className={`common_container ` + styles.header}>
        <div
          className={
            location.pathname === "/addblog" ? styles.addblog_logo : styles.logo
          }
        >
          <Link to="/">
            <img src={logo} alt="Redberry Logo" />
          </Link>
        </div>
        {location.pathname === "/addblog" ? null : (
          <div className={styles.login}>{renderLoginButton()}</div>
        )}
      </div>

      {isPopUp && <LoginBox />}
    </>
  );
};

export default Header;
