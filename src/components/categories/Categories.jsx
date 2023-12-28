import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlogs } from "../../context/BlogContextProvider";
import DataFetcherGet from "../../utilis/DataFetcherGet";
import styles from "./Categories.module.css";

const BASE_URL = "https://api.blog.redberryinternship.ge/api/categories";

function Categories() {
  const [categoryId, setCategoryId] = useState([]); // categoryIDs
  const { filterHandler } = useBlogs();
  const { blogData } = DataFetcherGet(BASE_URL);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // by location search it returns url after ?

  // this checks whether categoryId is empty or not and if there is urlParams
  // on refresh returns same urlParams.
  useEffect(() => {
    const urlParams = []; // empty variable where is pushed categoryId

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

  // if categoryId includes bloglists id
  // returns those blogs. if not returns whole list
  function handlerId(id) {
    setCategoryId((preCategoryIds) => {
      if (preCategoryIds.includes(id)) {
        return preCategoryIds.filter((activeId) => activeId !== id);
      } else {
        return [...preCategoryIds, id];
      }
    });
  }

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
