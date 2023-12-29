import { createContext, useContext, useEffect, useState } from "react";

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

  //Usage example:
  // var file = dataURLtoFile('data:text/plain;base64,aGVsbG8=','hello.txt');
  // console.log(dataURLtoFile(inputValues?.upload_input));

  useEffect(() => {
    localStorage.setItem("form_values", JSON.stringify(inputValues));
    let file = "";
    if (localStorage.getItem("image")) {
      const fileObject = JSON.parse(localStorage.getItem("image"));
      console.log(
        fileObject?.name,
        " inputValues.upload_input?.name inputValues.upload_input?.name"
      );

      file = dataURLtoFile(fileObject.blob, fileObject?.name);
    }
    // const tt = dataURLtoFile(
    //   localStorage.getItem("image"),
    //   inputValues.upload_input?.name
    // );

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
    console.log(inputValues);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file, "fffff");
    // localStorage.setItem("imageeeeee", file);

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

  const clearFile = () => {
    setInputValues((prevValues) => ({
      ...prevValues,
      upload_input: "",
    }));
    localStorage.removeItem("image");
  };
  return (
    <UploadBlogTheme.Provider
      value={{
        inputValues,
        handleFileInputChange,
        handleInputChange,
        clearFile,
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
