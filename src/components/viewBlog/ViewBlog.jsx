import styles from "./ViewBlog.module.css";
import backArrow from "../../../public/images/back_arrow.svg";
import { Link } from "react-router-dom";
import BlogCategories from "../blogCategories/BlogCategories";

function ViewBlog({ blogData }) {
  return (
    <>
      <div className={styles.blog_container}>
        <div className={styles.blog_image}>
          <Link to={"/"} className={styles.back_arrow}>
            <img src={backArrow} />
          </Link>
          <img src={blogData.image} />
        </div>
        <div className={styles.author}>
          <span>{blogData.author}</span>
        </div>
        <div className={styles.date_email}>
          <span>{blogData.publish_date}</span>
          <span className={styles.email}>{blogData.email}</span>
        </div>
        <div className={styles.title}>
          <h2>{blogData.title}</h2>
        </div>
        <ul className={styles.categories}>
          {blogData.categories?.map((category, index) => (
            <BlogCategories key={index} category={category} />
          ))}
        </ul>
        <div className={styles.description}>
          <p>{blogData.description}</p>
        </div>
      </div>
    </>
  );
}

export default ViewBlog;
