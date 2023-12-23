import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlogs } from "../../context/BlogContextProvider";
import DataFetcherGet from "../../utilis/DataFetcherGet";
import styles from "./Categories.module.css";

const BASE_URL = "https://api.blog.redberryinternship.ge/api/categories";

function Categories() {
  const [categoryId, setCategoryId] = useState([]);
  const { filterHandler } = useBlogs();
  const { blogData } = DataFetcherGet(BASE_URL, "", "GET");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const urlParams = [];

    for (let i = 1; i <= 12; i++) {
      const categoryId = queryParams.get(`categoryId${i}`);

      if (categoryId !== null) {
        urlParams.push(Number(categoryId));
      }
    }
    setCategoryId(urlParams);
  }, []);

  useEffect(() => {
    const queryString = categoryId
      .map((id, index) => `categoryId${index + 1}=${id}`)
      .join("&");

    navigate({
      pathname: "/",
      search: `${queryString}`,
    });
    filterHandler(categoryId);
  }, [categoryId]);

  function handlerId(id) {
    setCategoryId((preCategoryIds) => {
      if (preCategoryIds.includes(id)) {
        return preCategoryIds.filter((activeId) => activeId !== id);
      } else {
        return [...preCategoryIds, id];
      }
    });
  }

  useEffect(() => {
    filterHandler(categoryId);
  }, [categoryId]);

  return (
    <ul className={styles.category_box}>
      {blogData.data?.map((category) => (
        <li
          onClick={() => handlerId(category.id)}
          className={
            categoryId.includes(category.id)
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
