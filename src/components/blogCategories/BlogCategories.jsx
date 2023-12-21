import styles from "./BlogCategories.module.css";

function BlogCategories({ category }) {
  return (
    <li
      className={styles.category_list}
      style={{
        backgroundColor: `${category.background_color}`,
      }}
      key={category.id}
    >
      <p style={{ color: category.text_color }}>{category.title} </p>
    </li>
  );
}

export default BlogCategories;
