import styles from "./LoginBox.module.css";
import close from "../../../public/images/close.svg";
import { useBlogs } from "../../context/BlogContextProvider";
import { useState } from "react";
import useDataFetcherPost from "../../utilis/useDataFetchPost";

function LoginBox() {
  const [email, setEmail] = useState("");
  const { handleClose } = useBlogs();

  const { responseData, isLoading, error } = useDataFetcherPost(
    "https://api.blog.redberryinternship.ge/api/login",
    email
  );

  const handleRequest = () => {
    if (responseData) {
      console.log("Email exists:", responseData);
    } else if (!responseData) {
      console.log("Error occurred:", error);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
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
            <div onClick={handleRequest} className={styles.login_btn}>
              შესვლა
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginBox;
