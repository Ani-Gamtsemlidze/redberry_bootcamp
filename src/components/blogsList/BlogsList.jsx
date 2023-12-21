import DataFetcher from "../../utilis/DataFetcher";
import styles from "./BlogsList.module.css";
import BlogCard from "../blogCard/BlogCard";

function BlogsList() {
  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  const { data } = DataFetcher(BASE_URL, token);
  return (
    <div className={styles.blog_box}>
      {data.data?.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  );
}

export default BlogsList;
