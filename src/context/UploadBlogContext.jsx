import { createContext, useContext, useState } from "react";

export const UploadBlogTheme = createContext();
function UploadBlogContext(props) {
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
    console.log(name);
    localStorage.setItem(name, value);
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name.trim().replace(/\s+/g, "").length < 4 && name.trim() !== "") {
      setValidSymbols(false);
    }
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
  return (
    <UploadBlogTheme.Provider
      value={{
        inputValues,
        handleFileInputChange,
        handleInputChange,
      }}
    >
      {props.children}
    </UploadBlogTheme.Provider>
  );
}

function useUpload() {
  const context = useContext(UploadBlogTheme);
  if (!context)
    throw new Error("useBlogs must be used within a BlogContextProvider");
  return context;
}

export { UploadBlogContext, useUpload };
