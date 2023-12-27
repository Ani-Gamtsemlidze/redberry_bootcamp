import Header from "../../components/header/Header";
import styles from "./BlogUpload.module.css";
import Input from "../../components/form/input/Input";
import UploadImage from "../../components/form/uploadImage/UploadImage";
import axios from "axios";
import calendar from "../../../public/images/calendar.svg";
import { useEffect, useState } from "react";
import SuccessPopUp from "../../components/popup/SuccessPopUp";
import { Link } from "react-router-dom";
import MultipleSelectChip from "../../components/form/Select/Select";
import { useUpload } from "../../context/UploadBlogContext";
import { useBlogs } from "../../context/BlogContextProvider";
import DataFetcherGet from "../../utilis/DataFetcherGet";

function BlogUpload() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const { inputValues, handleInputChange } = useUpload();
  const [borderColor, setBorderColor] = useState(false);
  const Category_URL = "https://api.blog.redberryinternship.ge/api/categories";
  const { blogData } = DataFetcherGet(Category_URL);
  console.log(blogData);
  const email = inputValues.email_input;
  const author = inputValues.author_input;

  const authorSymbolsValidate =
    author.trim().replace(/\s+/g, "").length < 4 && author.trim() !== "";

  const authorWordsValidate =
    author.trim().split(" ").length < 2 && author.trim() !== "";
  console.log(author.trim().split(" "));

  const georgianAlphabetRegex = /^[\u10D0-\u10FF\s]+$/;
  const valideAlphabet =
    georgianAlphabetRegex.test(author) && author.trim() !== "";

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  const validateEmmail = email !== "" && !email.trim().includes("@redberry.ge");
  const title = inputValues.title_input;

  const titleValid = title.trim().length < 2;

  useEffect(() => {
    if (valideAlphabet && authorSymbolsValidate && authorWordsValidate) {
      setBorderColor("red");
    } else {
      if (valideAlphabet || authorSymbolsValidate || authorWordsValidate) {
        setBorderColor("green");
      } else {
        setBorderColor("grey");
      }
    }
  }, [authorWordsValidate, valideAlphabet, authorSymbolsValidate]);

  console.log(inputValues.upload_input);

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();

    formData.append("title", inputValues.title_input);
    formData.append("description", inputValues.description_input);
    formData.append("image", inputValues.upload_input); // Ensure this is a File object from the input type="file"
    formData.append("author", inputValues.author_input);
    formData.append("publish_date", inputValues.date_input);
    formData.append("categories", inputValues.category_input);
    formData.append("email", inputValues.email_input);

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
      console.error("Axios error:", err);
      setSuccessPopUp(false);
    }
  };

  return (
    <>
      <Header />

      <div className={styles.form_page}>
        <div className="common_container">
          <h2 className={styles.page_title}>ბლოგის დამატება</h2>
          <form
            id="inputsForm"
            action="/submit-url"
            method="post"
            onSubmit={handleCreateRequest}
            className={styles.form}
          >
            <UploadImage />

            <div className={styles.author_title}>
              <div className={styles.author}>
                <Input
                  // className={
                  //   validAuthor && valideAlphabet
                  //     ? styles.success_border
                  //     : styles.error_border
                  // }
                  style={{ border: `1px solid ${borderColor}` }}
                  label="ავტორი"
                  name="author_input"
                  autoComplete="off"
                  id="input"
                  type="text"
                  placeholder="შეიყვანეთ ავტორი"
                  onChange={handleInputChange}
                />
                <div className={styles.info}>
                  <span
                    style={{
                      color: authorSymbolsValidate
                        ? "red"
                        : inputValues.author_input === ""
                        ? "grey"
                        : "green",
                    }}
                  >
                    მინიმუმ 4 სიმბოლო{" "}
                  </span>
                  <span
                    style={{
                      color: authorWordsValidate
                        ? "red"
                        : author === ""
                        ? "grey"
                        : "green",
                    }}
                  >
                    მინიმუმ ორი სიტყვა{" "}
                  </span>
                  <span
                    style={{
                      color: valideAlphabet
                        ? "green"
                        : author === ""
                        ? "grey"
                        : "red",
                    }}
                  >
                    {" "}
                    მხოლოდ ქართული სიმბოლოები
                  </span>
                </div>
              </div>
              <div className={styles.title}>
                <Input
                  className={
                    titleValid && title.trim() !== ""
                      ? styles.error_border
                      : title
                      ? styles.success_border
                      : ""
                  }
                  label="სათაური"
                  name="title_input"
                  autoComplete="off"
                  id="title"
                  type="text"
                  placeholder="შეიყვანეთ სათაური"
                  onChange={handleInputChange}
                />
                <span
                  style={{
                    color:
                      titleValid && title.trim() !== ""
                        ? "red"
                        : title === ""
                        ? "grey"
                        : "green",
                  }}
                  // className={styles.info}
                >
                  მინიმუმ 2 სიმბოლო
                </span>
              </div>
            </div>

            <div className={styles.description}>
              <Input
                className={
                  `test ` +
                  (inputValues.description_input.length < 2 &&
                  inputValues.description_input.trim() !== ""
                    ? styles.error_border
                    : styles.success_border)
                }
                label="აღწერა"
                name="description_input"
                autoComplete="off"
                id="description"
                textarea
                placeholder="შეიყვანეთ აღწერა"
                onChange={handleInputChange}
              />
              <span>მინიმუმ 2 სიმბოლო</span>
            </div>
            <div className={styles.date_category}>
              <div className={styles.date}>
                <img className={styles.calendar} src={calendar} />
                <Input
                  label="გამოქვეყნების თარიღი"
                  autoComplete="off"
                  id="publish"
                  type="date"
                  name="date_input"
                  onChange={handleInputChange}
                />
              </div>
              <Input
                label="კატეგორია"
                name="category_input"
                autoComplete="off"
                id="category"
                type="text"
                placeholder="აირჩიეთ კატეგორია"
                onChange={handleInputChange}
              />
              <MultipleSelectChip />
            </div>
            <div>
              <Input
                className={
                  validateEmmail
                    ? styles.error_border
                    : inputValues.email_input
                    ? styles.success_border
                    : ""
                }
                label="ელ-ფოსტა"
                name="email_input"
                id="email"
                type="text"
                placeholder="Example@redberry.ge"
                autoComplete="off"
                onChange={handleInputChange}
              />
              {validateEmmail && (
                <p style={{ color: "#EA1919", fontSize: "12px" }}>
                  მეილი უნდა მთავრდებოდეს @redberry.ge- ით
                </p>
              )}
            </div>
            {successPopUp && (
              <SuccessPopUp>
                <p>ჩანაწერი წარმატებით დაემატა</p>
                <Link to="/" className={styles.btn}>
                  მთავარ გვერდზე დაბრუნება
                </Link>
              </SuccessPopUp>
            )}
            <div className={styles.publish_button}>
              <button type="submit">გამოქვეყნება</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BlogUpload;
