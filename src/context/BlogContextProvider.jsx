import { createContext, useContext, useEffect, useState } from "react";
import DataFetcher from "../utilis/DataFetcher";

export const BlogThemeContext = createContext();
function BlogContextProvider(props) {
  const [blogsList, setBlogsList] = useState([]);

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  const { data } = DataFetcher(BASE_URL, token);
  useEffect(() => {
    setBlogsList(data.data);
  }, [data]);

  const ids = blogsList?.map((blog) => blog.categories?.map((cat) => cat.id));

  return (
    <BlogThemeContext.Provider value={{ blogsList, ids }}>
      {props.children}
    </BlogThemeContext.Provider>
  );
}

function useBlogs() {
  const context = useContext(BlogThemeContext);
  if (!context) throw new Error("error");
  return context;
}

export { BlogContextProvider, useBlogs };
