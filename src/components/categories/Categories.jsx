import DataFetcher from "../../utilis/DataFetcher";
import BlogCategories from "../blogCategories/BlogCategories";
import styles from "./Categories.module.css";

const BASE_URL = "https://api.blog.redberryinternship.ge/api/categories";

function Categories() {
  const { data } = DataFetcher(BASE_URL);

  return (
    <ul className={styles.category_box}>
      {data.data?.map((category) => (
        <li
          className={styles.category_list}
          style={{
            backgroundColor: `${category.background_color}`,
          }}
          key={category.id}
        >
          <p style={{ color: category.text_color }}>{category.title} </p>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
