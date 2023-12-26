import success from "../../../public/images/success.svg";
import { useLogin } from "../../context/LoginContextProvider";
import styles from "./SuccessPopUp.module.css";
function SuccessPopUp({ children }) {
  const { handleSuccessLogin } = useLogin();
  return (
    <div className={styles.success_info}>
      <img src={success} />
      {children}
    </div>
  );
}

export default SuccessPopUp;
