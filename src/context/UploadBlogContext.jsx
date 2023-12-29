import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UploadBlogTheme = createContext();

// categories array

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
  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  // save in local storage
  const [inputValues, setInputValues] = useState({
    title_input: JSON.parse(localStorage.getItem("form_values"))?.title_input,
    description_input: JSON.parse(localStorage.getItem("form_values"))
      ?.description_input,
    author_input: JSON.parse(localStorage.getItem("form_values"))?.author_input,
    date_input: JSON.parse(localStorage.getItem("form_values"))?.date_input,
    category_input: JSON.parse(localStorage.getItem("form_values"))
      ?.category_input,
    email_input: JSON.parse(localStorage.getItem("form_values"))?.email_input,
    upload_input: "",
  });

  const [successPopUp, setSuccessPopUp] = useState(false);

  // uploaded image file convert to blob format

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  //save uploaded image in local storage
  useEffect(() => {
    localStorage.setItem("form_values", JSON.stringify(inputValues));
    let file = "";
    if (localStorage.getItem("image")) {
      const fileObject = JSON.parse(localStorage.getItem("image"));

      file = dataURLtoFile(fileObject.blob, fileObject?.name);
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      ...JSON.parse(localStorage.getItem("form_values")),
      upload_input: file,
    }));
  }, []);

  function getIdsByTitles(titleArray) {
    return titleArray.map((title) => {
      const catItem = catArray.find((item) => item.title === title);
      return catItem ? catItem.id.toString() : null;
    });
  }

  function isEmptyArray(emptyArrVal) {
    return (
      typeof emptyArrVal === "string" ||
      (Array.isArray(emptyArrVal) && emptyArrVal.length === 0)
    );
  }

  // save values on typing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEmptyArray(value) == false) {
      const result = getIdsByTitles(value);
      setInputValues((prevValues) => {
        localStorage.setItem(
          "form_values",
          JSON.stringify({
            ...prevValues,
            category_input: "[" + result.join(",") + "]",
          })
        );
        return {
          ...prevValues,
          category_input: "[" + result.join(",") + "]",
        };
      });
    } else {
      setInputValues((prevValues) => {
        localStorage.setItem(
          "form_values",
          JSON.stringify({
            ...prevValues,
            [name]: value,
          })
        );
        return {
          ...prevValues,
          [name]: value,
        };
      });
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setInputValues((prevValues) => ({
        ...prevValues,
        upload_input: file,
      }));
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        localStorage.setItem(
          "image",
          JSON.stringify({ blob: base64String, name: file.name })
        );
      };

      reader.readAsDataURL(file);
    }
  };

  // delete uploadad image
  const clearFile = () => {
    setInputValues((prevValues) => ({
      ...prevValues,
      upload_input: "",
    }));
    localStorage.removeItem("image");
  };

  // Clearing the local storage form values
  function handleCleanValues() {
    setSuccessPopUp(false);
    localStorage.removeItem("form_values");
    localStorage.removeItem("image ");

    setInputValues({
      title_input: "",
      description_input: "",
      author_input: "",
      date_input: "",
      category_input: "",
      email_input: "",
      upload_input: "",
    });
  }

  // send request on publish button to publish blog
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // create form data to be submitted and send data correctly
    const formData = new FormData();

    formData.append("title", inputValues?.title_input);
    formData.append("description", inputValues?.description_input);
    formData.append("image", inputValues?.upload_input);
    formData.append("author", inputValues?.author_input);
    formData.append("publish_date", inputValues?.date_input);
    formData.append("categories", inputValues?.category_input);
    formData.append("email", inputValues?.email_input);

    try {
      const response = await axios.post(BASE_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        setSuccessPopUp(true);
      }
    } catch (err) {
      setSuccessPopUp(false);
    }
  };

  return (
    <UploadBlogTheme.Provider
      value={{
        inputValues,
        handleFileInputChange,
        handleInputChange,
        clearFile,
        handleCleanValues,
        handleCreateRequest,
        successPopUp,
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
