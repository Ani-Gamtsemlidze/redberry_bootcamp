import Blogs from "../blogs/Blogs";
import styles from "./BlogsList.module.css";

function BlogsList() {
  return (
    <div className={styles.blog_box}>
      <Blogs />
    </div>
  );
}

export default BlogsList;
