import styles from "./InnerBlog.module.css";
import backArrow from "../../../../public/images/back_arrow.svg";
import { Link } from "react-router-dom";
import BlogCategories from "../blogCategories/BlogCategories";

function InnerBlog({ blogDetails }) {
  return (
    <>
      <div className={styles.blog_container}>
        <div className={styles.blog_image}>
          <Link to={"/"} className={styles.back_arrow}>
            <img src={backArrow} />
          </Link>
          <img src={blogDetails.image} />
        </div>
        <div className={styles.author}>
          <span>{blogDetails.author}</span>
        </div>
        <div className={styles.date_email}>
          <span>{blogDetails.publish_date}</span>
          <span className={styles.email}>{blogDetails.email}</span>
        </div>
        <div className={styles.title}>
          <h2>{blogDetails.title}</h2>
        </div>
        <ul className={styles.categories}>
          {blogDetails.categories?.map((category, index) => (
            <BlogCategories key={index} blogCategories={category} />
          ))}
        </ul>
        <div className={styles.description}>
          <p>{blogDetails.description}</p>
        </div>
      </div>
    </>
  );
}

export default InnerBlog;
