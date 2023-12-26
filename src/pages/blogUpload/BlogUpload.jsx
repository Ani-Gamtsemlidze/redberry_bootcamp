import Header from "../../components/header/Header";
import styles from "./BlogUpload.module.css";
import Input from "../../components/form/input/Input";
import UploadImage from "../../components/form/uploadImage/UploadImage";
import { useBlogs } from "../../context/BlogContextProvider";
import axios from "axios";
import { useState } from "react";
import LoginBox from "../../components/loginBox/LoginBox";
import SuccessPopUp from "../../components/popup/SuccessPopUp";
import { Link } from "react-router-dom";

function BlogUpload() {
  const [successPopUp, setSuccessPopUp] = useState(false);
  const { inputValues, handleInputChange } = useBlogs();

  // send request to back for adding blog

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

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
        // console.log("data exists:", response.data);
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
                  label="ავტორი"
                  name="author_input"
                  autoComplete="off"
                  id="input"
                  type="text"
                  placeholder="შეიყვანეთ ავტორი"
                  onChange={handleInputChange}
                />
                <div className={styles.info}>
                  <span>მინიმუმ 4 სიმბოლო </span>
                  <span>მინიმუმ ორი სიტყვა </span>
                  <span> მხოლოდ ქართული სიმბოლოები</span>
                </div>
              </div>
              <div className={styles.title}>
                <Input
                  label="სათაური"
                  name="title_input"
                  autoComplete="off"
                  id="title"
                  type="text"
                  placeholder="შეიყვანეთ სათაური"
                  onChange={handleInputChange}
                />
                <span className={styles.info}>მინიმუმ 2 სიმბოლო</span>
              </div>
            </div>

            <div className={styles.description}>
              <Input
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
              <Input
                label="გამოქვეყნების თარიღი"
                autoComplete="off"
                id="publish"
                type="date"
                name="date_input"
                onChange={handleInputChange}
              />
              <Input
                label="კატეგორია"
                name="category_input"
                autoComplete="off"
                id="category"
                type="text"
                placeholder="აირჩიეთ კატეგორია"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="ელ-ფოსტა"
                name="email_input"
                id="email"
                type="text"
                placeholder="Example@redberry.ge"
                autoComplete="off"
                onChange={handleInputChange}
              />
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
