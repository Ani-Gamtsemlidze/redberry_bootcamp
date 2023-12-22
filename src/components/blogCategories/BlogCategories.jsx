import { useBlogs } from "../../context/BlogContextProvider";
import styles from "./BlogCategories.module.css";

function BlogCategories({ blogCategories, blogCardId }) {
  return (
    <li
      onClick={() => console.log(blogCardId)}
      className={styles.category_list}
      style={{
        backgroundColor: `${blogCategories.background_color}`,
      }}
      key={blogCategories.id}
    >
      <p style={{ color: blogCategories.text_color }}>
        {blogCategories.title}{" "}
      </p>
    </li>
  );
}

export default BlogCategories;
