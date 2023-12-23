import styles from "./LoginBox.module.css";
import close from "../../../public/images/close.svg";
import error_img from "../../../public/images/error.svg";
import success from "../../../public/images/success.svg";
import { useBlogs } from "../../context/BlogContextProvider";
import { useState } from "react";
import useDataFetcherPost from "../../utilis/useDataFetchPost";

function LoginBox() {
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const { handleClose, handleSuccessLogin } = useBlogs();

  const { responseData, isLoading, error } = useDataFetcherPost(
    "https://api.blog.redberryinternship.ge/api/login",
    email
  );

  const handleRequest = () => {
    if (responseData) {
      console.log("Email exists:", responseData);
      setIsLogin(true);
    } else if (!responseData) {
      setEmailNotFound(true);
      console.log("Error occurred:", error);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        {isLogin ? (
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
            <form className={styles.form} id="login">
              <label htmlFor="login">ელ-ფოსტა</label>
              <div className={styles.input_btn}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Example@redberry.ge"
                />
                {emailNotFound ? (
                  <div className={styles.error_info}>
                    <img src={error_img} />
                    <span>ელ-ფოსტა არ მოიძებნა</span>
                  </div>
                ) : null}
                <div onClick={handleRequest} className={styles.btn}>
                  შესვლა
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginBox;
