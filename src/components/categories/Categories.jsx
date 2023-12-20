import DataFetcher from "../../utilis/DataFetcher";
import styles from "./Categories.module.css";

function Categories() {
  const { data } = DataFetcher(
    "https://api.blog.redberryinternship.ge/api/categories"
  );

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
      {console.log(data.data)}
    </ul>
  );
}

export default Categories;
