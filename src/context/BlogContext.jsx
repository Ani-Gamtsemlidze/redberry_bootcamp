import { createContext, useContext, useEffect, useState } from "react";
import DataFetcher from "../utilis/DataFetcher";

export const BlogTheme = createContext();
function BlogContext(props) {
  const [blogsList, setBlogsList] = useState([]);
  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  const { data } = DataFetcher(BASE_URL, token);
  useEffect(() => {
    setBlogsList(data);
  }, [data]);

  return (
    <BlogTheme.Provider value={{ blogsList }}>
      {props.children}
    </BlogTheme.Provider>
  );
}

// function useBlogs() {
//   const context = useContext(BlogTheme);
//   if (context === undefined) throw new Error("error");
//   return context;
// }

export default BlogContext;
