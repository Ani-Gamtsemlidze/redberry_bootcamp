import DataFetcher from "../../utilis/DataFetcher";
import styles from "./Blogs.module.css";

function Blogs() {
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";
  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";

  const { data } = DataFetcher(BASE_URL, token);
  return (
    <>
      {data.data?.map((blog, index) => (
        <div className={styles.blog} key={index}>
          <div className={styles.blog_img}>
            <img src={blog.image} />
          </div>
          <div className={styles.author_date}>
            <span className={styles.author}>{blog.author}</span>
            <span className={styles.date}>{blog.publish_date}</span>
          </div>
          <h2>{blog.title}</h2>
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
        </div>
      ))}
    </>
  );
}

export default Blogs;
