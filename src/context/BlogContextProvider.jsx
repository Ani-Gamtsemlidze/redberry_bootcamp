import { createContext, useContext, useEffect, useState } from "react";
import DataFetcher from "../utilis/DataFetcher";

export const BlogThemeContext = createContext();

function BlogContextProvider(props) {
  const [blogsList, setBlogsList] = useState([]);

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1"; // Consider a more secure method for storing tokens

  const { data } = DataFetcher(BASE_URL, token);

  useEffect(() => {
    if (data && data.data) {
      setBlogsList(data.data);
    }
  }, [data]);

  const filterHandler = (categoryId) => {
    // Log to check the categoryId
    const filteredBlogs = blogsList.filter((blog) => {
      return categoryId.some((categoryIdItem) => {
        return blog.categories.some(
          (blogCategory) => blogCategory.id === categoryIdItem
        );
      });
    });
    // Update the state with the filtered list
    setBlogsList(filteredBlogs);
  };

  return (
    <BlogThemeContext.Provider value={{ blogsList, filterHandler }}>
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
