import styles from "./LoginBox.module.css";
import close from "../../../public/images/close.svg";
import error_img from "../../../public/images/error.svg";
import success from "../../../public/images/success.svg";
import { useLogin } from "../../context/LoginContextProvider";
import SuccessPopUp from "../popup/SuccessPopUp";
import { Link } from "react-router-dom";

function LoginBox() {
  const {
    handleClose,
    handleRequest,
    isEmailExist,
    setUserEmail,
    emailNotFound,
    userEmail,
    handleSuccessLogin,
  } = useLogin();

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        {isEmailExist ? (
          <SuccessPopUp>
            <p>წარმატებული ავტორიზაცია</p>
            <Link to="/" onClick={handleSuccessLogin} className={styles.btn}>
              კარგი
            </Link>
          </SuccessPopUp>
        ) : (
          <>
            <div onClick={handleClose} className={styles.close}>
              <img src={close} alt="Close" />
            </div>
            <div className={styles.title}>
              <h2>შესვლა</h2>
            </div>
            <form
              onSubmit={(e) => handleRequest(e)}
              className={styles.form}
              id="loginForm"
            >
              <label htmlFor="login">ელ-ფოსტა</label>
              <div className={styles.input_btn}>
                <input
                  className={styles.login_input}
                  id="login"
                  name="login"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  // type="text"
                  placeholder="Example@redberry.ge"
                />
                {emailNotFound ? (
                  <div className={styles.error_info}>
                    <img src={error_img} />
                    <span>ელ-ფოსტა არ მოიძებნა</span>
                  </div>
                ) : null}
                <button type="submit" className={styles.btn}>
                  შესვლა
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginBox;
