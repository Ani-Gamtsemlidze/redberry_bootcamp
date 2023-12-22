import { useBlogs } from "../../context/BlogContextProvider";
import DataFetcher from "../../utilis/DataFetcher";
import styles from "./Categories.module.css";

const BASE_URL = "https://api.blog.redberryinternship.ge/api/categories";

function Categories() {
  const { blogsList, ids } = useBlogs();

  const { data } = DataFetcher(BASE_URL);

  function handlerId(id) {
    if (id === ids.map((id) => id)) {
      console.log("done");
    }
    console.log(id, "categories");
    // console.log(blogsList, "blogCategories");
  }

  return (
    <ul className={styles.category_box}>
      {data.data?.map((category) => (
        <li
          onClick={() => handlerId(category.id)}
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
