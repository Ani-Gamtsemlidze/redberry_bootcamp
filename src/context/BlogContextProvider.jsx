import { createContext, useContext, useEffect, useState } from "react";
import DataFetcherGet from "../utilis/DataFetcherGet";

export const BlogThemeContext = createContext();

function BlogContextProvider(props) {
  const [blogsList, setBlogsList] = useState([]);
  const [urlParams, seturlParams] = useState([]);
  const [validSymbols, setValidSymbols] = useState(false);

  //fetching blogs data from token

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  const { blogData } = DataFetcherGet(BASE_URL, token);

  useEffect(() => {
    if (blogData && blogData.data) {
      setBlogsList(blogData.data);
    }
  }, [blogData]);

  // filter by categories

  useEffect(() => {
    if (urlParams.length < 1) {
      setBlogsList(blogData.data);
    } else {
      const filteredBlogs = blogData.data?.filter((blog) => {
        return urlParams.some((categoryIdItem) => {
          return blog.categories.some(
            (blogCategory) => blogCategory.id === categoryIdItem
          );
        });
      });
      setBlogsList(filteredBlogs);
    }
  }, [urlParams, blogData]);

  const filterHandler = (categoryId) => {
    seturlParams(categoryId);
  };

  return (
    <BlogThemeContext.Provider
      value={{
        blogsList,
        filterHandler,
        urlParams,
      }}
    >
      {props.children}
    </BlogThemeContext.Provider>
  );
}
function useBlogs() {
  const context = useContext(BlogThemeContext);
  if (!context)
    throw new Error("useBlogs must be used within a BlogContextProvider");
  return context;
}

export { BlogContextProvider, useBlogs };
