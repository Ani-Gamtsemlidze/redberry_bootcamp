import Header from "../../components/header/Header";
import styles from "./BlogUpload.module.css";
import Input from "../../components/form/input/Input";
import UploadImage from "../../components/form/uploadImage/UploadImage";
import calendar from "../../../public/images/calendar.svg";
import { useEffect, useState } from "react";
import SuccessPopUp from "../../components/popup/SuccessPopUp";
import { Link } from "react-router-dom";
import MultipleSelectChip from "../../components/form/Select/Select";
import { useUpload } from "../../context/UploadBlogContext";
import DataFetcherGet from "../../utilis/DataFetcherGet";
import emailInfo from "../../../public/images/info-circle.svg";
import back_icon from "../../../public/images/back_tohome.svg";

function BlogUpload() {
  const [authErr, setIsAuthorValid] = useState(false);

  const {
    inputValues,
    handleInputChange,
    handleCleanValues,
    handleCreateRequest,
    successPopUp,
  } = useUpload();

  const Category_URL = "https://api.blog.redberryinternship.ge/api/categories";
  const { blogData } = DataFetcherGet(Category_URL);

  const email = inputValues.email_input;
  const author = inputValues.author_input;
  const description = inputValues.description_input;
  const date = inputValues.date_input;

  // check symbols length in author input
  const hasSymbolsErr =
    author?.trim().replace(/\s+/g, "")?.length < 4 && author?.trim() !== "";

  // check words length in author input

  const hasWordsErr =
    author?.trim().split(" ")?.length < 2 && author?.trim() !== "";

  // check georgian alphabet in author input

  const georgianAlphabetRegex = /^[\u10D0-\u10FF\s]+$/;
  const hasAlphabetError =
    !georgianAlphabetRegex.test(author) && author?.trim() !== "";

  const validateEmmail =
    email !== "" && !email?.trim().includes("@redberry.ge");
  const title = inputValues.title_input;

  const titleValid = title?.trim()?.length < 2;
  useEffect(() => {
    // Check all conditions for author validation
    const authorHasErr = hasAlphabetError || hasSymbolsErr || hasWordsErr;
    setIsAuthorValid(authorHasErr);
  }, [author, hasWordsErr, hasAlphabetError, hasSymbolsErr]);

  return (
    <>
      <Header />
      <div className={styles.form_page}>
        {/* <div className="common_container"> */}
        <h2 className={styles.page_title}>ბლოგის დამატება</h2>
        <Link className={styles.back} to="/">
          <img src={back_icon} alt="back to homepage" />
        </Link>
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
                  author === ""
                    ? styles.default_border
                    : !authErr
                    ? styles.success_border
                    : styles.error_border
                }
                label="ავტორი"
                name="author_input"
                autoComplete="off"
                id="input"
                type="text"
                spellCheck="false"
                value={
                  JSON.parse(localStorage.getItem("form_values"))?.author_input
                }
                placeholder="შეიყვანეთ ავტორი"
                onChange={handleInputChange}
              />
              <div className={styles.info}>
                <span
                  style={{
                    color: hasSymbolsErr
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
                    color: hasWordsErr
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
                    color:
                      author === ""
                        ? "#85858D"
                        : !hasAlphabetError
                        ? "#14D81C"
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

            <MultipleSelectChip label={"კატეგორიები"} selectArray={blogData} />
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
    </>
  );
}

export default BlogUpload;
