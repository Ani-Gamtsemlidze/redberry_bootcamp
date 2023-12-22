import styles from "./BlogsList.module.css";
import { useBlogs } from "../../context/BlogContextProvider";
import BlogCard from "../blogCard/BlogCard";

function BlogsList() {
  const { blogsList } = useBlogs();

  return (
    <div className={styles.blog_box}>
      {blogsList?.map((blog, index) => (
        <BlogCard key={index} blogCard={blog} />
      ))}
    </div>
  );
}

export default BlogsList;
