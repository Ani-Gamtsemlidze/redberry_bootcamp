import styles from "./LoginBox.module.css";

// import images
import close from "../../../public/images/close.svg";
import error_img from "../../../public/images/error.svg";
import success_img from "../../../public/images/success.svg";

// imort contexts
import { useBlogs } from "../../context/BlogContextProvider";
import { useLogin } from "../../context/LoginContextProvider";

function LoginBox() {
  // import hooks from contexts
  const { handleClose, handleSuccessLogin } = useBlogs();
  const {
    handleRequest,
    isEmailExist,
    setUserEmail,
    userEmail,
    emailNotFound,
  } = useLogin();

  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        {isEmailExist ? <RenderSuccessInfo /> : <RenderLoginForm />}
      </div>
    </div>
  );

  function RenderSuccessInfo() {
    return (
      <div className={styles.success_info}>
        <img src={success_img} />
        <p>წარმატებული ავტორიზაცია</p>
        <button onClick={handleSuccessLogin} className={styles.btn}>
          კარგი
        </button>
      </div>
    );
  }

  function RenderLoginForm() {
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
          <div onClick={handleRequest} className={styles.btn}>
            შესვლა
          </div>
        </div>
      </form>
    </>;
  }
}

export default LoginBox;
