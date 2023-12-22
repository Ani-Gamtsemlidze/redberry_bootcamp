import { useEffect, useState } from "react";
import { useBlogs } from "../../context/BlogContextProvider";
import DataFetcher from "../../utilis/DataFetcher";
import styles from "./Categories.module.css";

const BASE_URL = "https://api.blog.redberryinternship.ge/api/categories";

function Categories() {
  const [categoryId, setCategoryId] = useState([]);
  const [activeIds, setActiveIds] = useState([]);
  const { filterHandler } = useBlogs();

  const { data } = DataFetcher(BASE_URL);

  function handlerId(id) {
    setActiveIds((prevActiveIds) => {
      if (prevActiveIds.includes(id)) {
        return prevActiveIds.filter((activeId) => activeId !== id);
      } else {
        return [...prevActiveIds, id];
      }
    });
  }

  useEffect(() => {
    filterHandler(activeIds);
  }, [activeIds]);

  return (
    <ul className={styles.category_box}>
      {data.data?.map((category) => (
        <li
          onClick={() => handlerId(category.id)}
          className={
            activeIds.includes(category.id)
              ? `${styles.category_list} active_category`
              : styles.category_list
          }
          style={{
            backgroundColor: `${category.background_color}`,
          }}
          key={category.id}
        >
          <p style={{ color: category.text_color }}>{category.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
