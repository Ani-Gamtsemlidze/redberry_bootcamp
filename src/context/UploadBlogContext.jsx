import { createContext, useContext, useState } from "react";

export const UploadBlogTheme = createContext();

let catArray = [
  { id: 1, title: "მარკეტი" },
  { id: 2, title: "აპლიკაცია" },
  { id: 3, title: "ხელოვნური ინტელექტი" },
  { id: 4, title: "UI/UX" },
  { id: 5, title: "კვლევა" },
  { id: 6, title: "Figma" },
  { id: 7, title: "დამზადება" },
  { id: 8, title: "კოპიუტერული მეცნიერება" },
  { id: 9, title: "სამუშაო გარემო" },
  { id: 10, title: "მუსიკა" },
  { id: 11, title: "სპორტი" },
  { id: 12, title: "სამშენებლო" },
  { id: 13, title: "სამედიცინო" },
  { id: 14, title: "სხვა" },
];
function UploadBlogContext(props) {
  const [inputValues, setInputValues] = useState({
    title_input: "",
    description_input: "",
    author_input: "",
    date_input: "",
    category_input: "",
    email_input: "",
    upload_input: "",
  });

  function getIdsByTitles(titleArray) {
    return titleArray.map((title) => {
      const catItem = catArray.find((item) => item.title === title);
      return catItem ? catItem.id.toString() : null;
    });
  }
  //
  function isEmptyArray(emptyArrVal) {
    return (
      typeof emptyArrVal === "string" ||
      (Array.isArray(emptyArrVal) && emptyArrVal.length === 0)
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEmptyArray(value) == false) {
      const result = getIdsByTitles(value);
      setInputValues((prevValues) => ({
        ...prevValues,
        category_input: "[" + result.join(",") + "]",
      }));
      localStorage.setItem(name, value);
    } else {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
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
