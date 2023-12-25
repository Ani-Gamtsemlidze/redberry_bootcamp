import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/images/redberry_logo.png";
import { useLogin } from "../../context/LoginContextProvider";
import LoginBox from "../loginBox/LoginBox";
import styles from "./Header.module.css";

const Header = () => {
  const { active, handleLogin, isPopUp } = useLogin();

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
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Redberry Logo" />
        </div>
        <div className={styles.login}>{renderLoginButton()}</div>
      </div>

      {isPopUp && <LoginBox />}
    </>
  );
};

export default Header;
