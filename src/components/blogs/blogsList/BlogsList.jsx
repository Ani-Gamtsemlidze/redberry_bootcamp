import styles from "./BlogsList.module.css";
import { useBlogs } from "../../../context/BlogContextProvider";
import BlogCard from "../blogCard/BlogCard";

function BlogsList() {
  const { blogsList } = useBlogs();
  const todayD = new Date();
  const formattedDate = `${todayD.getFullYear()}-${String(
    todayD.getMonth() + 1
  ).padStart(2, "0")}-${String(todayD.getDate()).padStart(2, "0")}`;

  let today = new Date(formattedDate);

  let filteredPosts = blogsList?.filter((post) => {
    let postDate = new Date(
      post.publish_date.replace(/(\d{4})\.(\d{2})\.(\d{2})/, "$2/$3/$1")
    );
    return postDate <= today;
  });

  return (
    <div className={`common_container ${styles.blog_box}`}>
      {filteredPosts?.map((blog, index) => (
        <BlogCard key={index} blogCard={blog} />
      ))}
    </div>
  );
}

export default BlogsList;
