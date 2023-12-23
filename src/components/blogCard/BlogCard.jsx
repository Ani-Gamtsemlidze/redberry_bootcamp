import styles from "./BlogCard.module.css";
import ViewMoreArrow from "../../../public/images/arrow.svg";

import { Link } from "react-router-dom";
import BlogCategories from "../blogCategories/BlogCategories";

function BlogCard({ blogCard }) {
  return (
    <>
      <div className={styles.blog}>
        <div className={styles.blog_img}>
          <img src={blogCard.image} />
        </div>
        <div className={styles.author_date}>
          <span className={styles.author}>{blogCard.author}</span>
          <span className={styles.date}>{blogCard.publish_date}</span>
        </div>
        <div className={styles.blog_title}>
          <h2>{blogCard.title}</h2>
        </div>
        <ul className={styles.blog_category}>
          {blogCard.categories?.map((category, index) => (
            <BlogCategories key={index} blogCategories={category} />
          ))}
        </ul>
        <div className={styles.description}>
          <p>{blogCard.description.slice(0, 86)}...</p>
        </div>
        <Link to={`/blog/${blogCard.id}`} className={styles.view_more}>
          <span>სრულად ნახვა</span>
          <img src={ViewMoreArrow} alt="see more" />
        </Link>
      </div>
    </>
  );
}

export default BlogCard;
