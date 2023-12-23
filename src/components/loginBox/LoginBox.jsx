import styles from "./LoginBox.module.css";
import close from "../../../public/images/close.svg";
import error_img from "../../../public/images/error.svg";
import success from "../../../public/images/success.svg";
import { useBlogs } from "../../context/BlogContextProvider";
import { useLogin } from "../../context/LoginContextProvider";

function LoginBox() {
  const { handleClose, handleSuccessLogin } = useBlogs();
  const {
    handleRequest,
    isEmailExist,
    setUserEmail,
    emailNotFound,
    userEmail,
  } = useLogin();

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        {isEmailExist ? (
          <div className={styles.success_info}>
            <img src={success} />
            <p>წარმატებული ავტორიზაცია</p>
            <button onClick={handleSuccessLogin} className={styles.btn}>
              კარგი
            </button>
          </div>
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
                  id="login"
                  name="login"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  type="text"
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
