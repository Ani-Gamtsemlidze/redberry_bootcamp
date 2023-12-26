import { createContext, useContext, useEffect, useState } from "react";
import DataFetcherGet from "../utilis/DataFetcherGet";

export const BlogThemeContext = createContext();

function BlogContextProvider(props) {
  const [blogsList, setBlogsList] = useState([]);
  const [urlParams, seturlParams] = useState([]);

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

  // take values from form inputs
  const [inputValues, setInputValues] = useState({
    title_input: "",
    description_input: "",
    author_input: "",
    date_input: "",
    category_input: [],
    email_input: "",
    upload_input: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem(name, value);
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    localStorage.setItem("image", file);
    if (file) {
      setInputValues((prevValues) => ({
        ...prevValues,
        upload_input: file,
      }));
    }
  };

  // handle with local storage
  // useEffect(() => {
  //   const inputNames = [
  //     "title_input",
  //     "description_input",
  //     "author_input",
  //     "date_input",
  //     "category_input",
  //     "email_input",
  //     "upload_input",
  //   ];

  //   const storedValues = {};

  //   inputNames.forEach((name) => {
  //     const storedValue = localStorage.getItem(name);
  //     if (storedValue) {
  //       console.log(storedValue);
  //       storedValues[name] = storedValue;
  //     }
  //   });
  //   setInputValues(storedValues);
  // }, []);

  return (
    <BlogThemeContext.Provider
      value={{
        blogsList,
        filterHandler,
        urlParams,
        handleFileInputChange,
        inputValues,
        handleInputChange,
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
