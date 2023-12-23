import styles from "./BlogCategories.module.css";

function BlogCategories({ blogCategories }) {
  return (
    <li
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
