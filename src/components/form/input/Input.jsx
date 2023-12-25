import styles from "./Input.module.css";
function Input({ label, id, textarea, ...props }) {
  return (
    <div>
      <label htmlFor="input">{label} *</label>
      {textarea ? (
        <textarea
          className={styles.textarea}
          placeholder={"შეიყვანეთ აღწერა"}
        />
      ) : (
        <input id={id} {...props} />
      )}
    </div>
  );
}

export default Input;
