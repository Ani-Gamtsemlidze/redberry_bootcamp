import styles from "./BlogCard.module.css";
import ViewMoreArrow from "../../../public/images/arrow.svg";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <>
      <div className={styles.blog}>
        <div className={styles.blog_img}>
          <img src={blog.image} />
        </div>
        <div className={styles.author_date}>
          <span className={styles.author}>{blog.author}</span>
          <span className={styles.date}>{blog.publish_date}</span>
        </div>
        <div className={styles.blog_title}>
          <h2>{blog.title}</h2>
        </div>
        <div className={styles.blog_category}>
          {blog.categories?.map((category, index) => (
            <p
              key={index}
              style={{
                color: category.text_color,
                backgroundColor: category.background_color,
              }}
            >
              {category.title}
            </p>
          ))}
        </div>
        <div className={styles.description}>
          <p>{blog.description.slice(0, 86)}...</p>
        </div>
        <Link to={`/blog/${blog.id}`} className={styles.view_more}>
          <span>სრულად ნახვა</span>
          <img src={ViewMoreArrow} alt="see more" />
        </Link>
      </div>
    </>
  );
}

export default BlogCard;
