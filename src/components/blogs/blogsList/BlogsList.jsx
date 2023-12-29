import styles from "./BlogsList.module.css";
import { useBlogs } from "../../../context/BlogContextProvider";
import BlogCard from "../blogCard/BlogCard";

function BlogsList() {
  const { blogsList } = useBlogs();
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Filter blogs based on the publish_date not matching today's date
  // const date = blogsList.map((blog) => blog.publish_date);
  // const publish_date = date.map((date) => date);
  // console.log(blogsList.publish_date);

  const filteredBlogs = blogsList?.filter(
    (blog) => blog.publish_date !== formattedDate
  );

  // console.log(formattedDate); // Outputs today's date in the format "YYYY-MM-DD"

  return (
    <div className={`common_container ${styles.blog_box}`}>
      {blogsList?.map((blog, index) => (
        <BlogCard key={index} blogCard={blog} />
      ))}
    </div>
  );
}

export default BlogsList;
