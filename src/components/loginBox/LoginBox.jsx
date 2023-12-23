import styles from "./LoginBox.module.css";

function LoginBox() {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_box}>
        <div className={styles.title}>
          <h2>შესვლა</h2>
        </div>
        <form className={styles.form} id="login">
          <label htmlFor="login">ელ-ფოსტა</label>
          <div className={styles.input_btn}>
            <input type="text" placeholder="Example@redberry.ge" />
            <button className={styles.login_btn}>შესვლა</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginBox;
