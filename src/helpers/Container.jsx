import styles from "./Container.module.css";
function Container(props) {
  return <div className={styles.common_container}>{props.children}</div>;
}

export default Container;
