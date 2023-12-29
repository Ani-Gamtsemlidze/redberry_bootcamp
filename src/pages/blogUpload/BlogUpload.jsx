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
import DataFetcherGet from "../../utilis/DataFetcherGet";
import emailInfo from "../../../public/images/info-circle.svg";

function BlogUpload() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [isAuthorValid, setIsAuthorValid] = useState(false);

  const { inputValues, handleInputChange, handleCleanValues } = useUpload();

  const Category_URL = "https://api.blog.redberryinternship.ge/api/categories";
  const { blogData } = DataFetcherGet(Category_URL);

  const email = inputValues.email_input;
  const author = inputValues.author_input;
  const description = inputValues.description_input;
  const date = inputValues.date_input;

  // check symbols length in author input
  const authorSymbolsValidate =
    author?.trim().replace(/\s+/g, "")?.length < 4 && author?.trim() !== "";

  // check words length in author input

  const authorWordsValidate =
    author?.trim().split(" ")?.length < 2 && author?.trim() !== "";

  // check georgian alphabet in author input

  const georgianAlphabetRegex = /^[\u10D0-\u10FF\s]+$/;
  const valideAlphabet =
    georgianAlphabetRegex.test(author) && author?.trim() !== "";

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  const validateEmmail =
    email !== "" && !email?.trim().includes("@redberry.ge");
  const title = inputValues.title_input;

  const titleValid = title?.trim()?.length < 2;
  console.log();
  useEffect(() => {
    // Check all conditions for author validation
    const isValidAuthor =
      valideAlphabet && !authorSymbolsValidate && !authorWordsValidate;
    setIsAuthorValid(isValidAuthor);
  }, [author, authorWordsValidate, valideAlphabet, authorSymbolsValidate]);

  const handleCreateRequest = async (e) => {
    // send request on publish button
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();

    formData.append("title", inputValues?.title_input);
    formData.append("description", inputValues?.description_input);
    formData.append("image", inputValues?.upload_input); // Ensure this is a File object from the input type="file"
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
                  className={
                    isAuthorValid
                      ? styles.success_border
                      : author === ""
                      ? styles.default_border
                      : styles.error_border
                  }
                  label="ავტორი"
                  name="author_input"
                  autoComplete="off"
                  id="input"
                  type="text"
                  spellCheck="false"
                  value={
                    JSON.parse(localStorage.getItem("form_values"))
                      ?.author_input
                  }
                  placeholder="შეიყვანეთ ავტორი"
                  onChange={handleInputChange}
                />
                <div className={styles.info}>
                  <span
                    style={{
                      color: authorSymbolsValidate
                        ? "#EA1919"
                        : inputValues.author_input === ""
                        ? "#85858D"
                        : "#14D81C",
                    }}
                  >
                    მინიმუმ 4 სიმბოლო{" "}
                  </span>
                  <span
                    style={{
                      color: authorWordsValidate
                        ? "#EA1919"
                        : author === ""
                        ? "#85858D"
                        : "#14D81C",
                    }}
                  >
                    მინიმუმ ორი სიტყვა{" "}
                  </span>
                  <span
                    style={{
                      color: valideAlphabet
                        ? "#14D81C"
                        : author === ""
                        ? "#85858D"
                        : "#EA1919",
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
                    titleValid && title?.trim() !== ""
                      ? styles.error_border
                      : title
                      ? styles.success_border
                      : ""
                  }
                  label="სათაური"
                  name="title_input"
                  value={
                    JSON.parse(localStorage.getItem("form_values"))?.title_input
                  }
                  autoComplete="off"
                  id="title"
                  type="text"
                  spellCheck="false"
                  placeholder="შეიყვანეთ სათაური"
                  onChange={handleInputChange}
                />
                <span
                  style={{
                    color:
                      titleValid && title?.trim() !== ""
                        ? "#EA1919"
                        : title === ""
                        ? "#85858D"
                        : "#14D81C",
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
                  `description_textarea ` +
                  (description?.length < 2 && description?.trim() !== ""
                    ? styles.error_border
                    : description === ""
                    ? styles.default_border
                    : styles.success_border)
                }
                spellCheck="false"
                label="აღწერა"
                name="description_input"
                autoComplete="off"
                id="description"
                textarea
                value={
                  JSON.parse(localStorage.getItem("form_values"))
                    ?.description_input
                }
                placeholder="შეიყვანეთ აღწერა"
                onChange={handleInputChange}
              />
              <span
                style={{
                  color:
                    description?.length < 2 && description?.trim() !== ""
                      ? "#EA1919"
                      : description === ""
                      ? "#85858D"
                      : "#14D81C",
                }}
              >
                მინიმუმ 2 სიმბოლო
              </span>
            </div>
            <div className={styles.date_category}>
              <div className={styles.date}>
                <img className={styles.calendar} src={calendar} />
                <Input
                  className={date && styles.success_border}
                  label="გამოქვეყნების თარიღი"
                  autoComplete="off"
                  id="publish"
                  spellCheck="false"
                  type="date"
                  value={
                    JSON.parse(localStorage.getItem("form_values"))?.date_input
                  }
                  name="date_input"
                  onChange={handleInputChange}
                />
              </div>

              <MultipleSelectChip
                label={"კატეგორიები"}
                selectArray={blogData}
              />
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
                spellCheck="false"
                value={
                  JSON.parse(localStorage.getItem("form_values"))?.email_input
                }
                placeholder="Example@redberry.ge"
                autoComplete="off"
                onChange={handleInputChange}
              />
              {validateEmmail && (
                <div className={styles.email_info}>
                  <img src={emailInfo} alt="not valid email" />
                  <div className={styles.error_info}>
                    <p>მეილი უნდა მთავრდებოდეს @redberry.ge- ით</p>
                  </div>
                </div>
              )}
            </div>

            {successPopUp && (
              <div className={styles.popup_container}>
                <div className={styles.popup_box}>
                  <SuccessPopUp>
                    <p>ჩანაწერი წარმატებით დაემატა</p>
                    <Link
                      to="/"
                      onClick={handleCleanValues}
                      className={styles.btn}
                    >
                      მთავარ გვერდზე დაბრუნება
                    </Link>
                  </SuccessPopUp>
                </div>
              </div>
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
