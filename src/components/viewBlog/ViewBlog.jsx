import Header from "../header/Header";
import styles from "./ViewBlog.module.css";

function ViewBlog({ blogData }) {
  return (
    <div className={styles.blog_container}>
      <div className={styles.blog_image}>
        <img src={blogData.image} />
      </div>
      <div className={styles.author}>
        <span>{blogData.author}</span>
      </div>
      <div className={styles.date_email}>
        <span>{blogData.publish_date} &copy;</span>
        <span className={styles.email}>{blogData.email}</span>
      </div>
      <div className={styles.title}>
        <h2>{blogData.title}</h2>
      </div>
      <div className={styles.categories}>
        {blogData.categories?.map((category, index) => (
          <p key={index}>{category.title}</p>
        ))}
      </div>
      <div className={styles.description}>
        <p>{blogData.description}</p>
      </div>
    </div>
  );
}

export default ViewBlog;
