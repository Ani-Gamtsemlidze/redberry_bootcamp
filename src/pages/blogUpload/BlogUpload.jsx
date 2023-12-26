import Header from "../../components/header/Header";
import styles from "./BlogUpload.module.css";
import Input from "../../components/form/input/Input";
import UploadImage from "../../components/form/uploadImage/UploadImage";
import { useBlogs } from "../../context/BlogContextProvider";
import axios from "axios";
import { useEffect } from "react";

function BlogUpload() {
  const { inputValues, handleInputChange } = useBlogs();

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // const formData = new FormData();

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
        console.log("data exists:", response.data);
      }
    } catch (err) {
      console.error("Axios error:", err);
    }
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#FCFCFD", padding: "33px 240px 100px" }}>
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
                autocomplete="off"
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
                autocomplete="off"
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
              autocomplete="off"
              id="description"
              textarea
              placeholder="შეიყვანეთ აღწერა"
              onChange={handleInputChange}
            />
            <span>მინიმუმ 2 სიმბოლო</span>
          </div>
          <div className={styles.date_category}>
            <div>
              <Input
                label="გამოქვეყნების თარიღი"
                autocomplete="off"
                id="publish"
                type="date"
                name="date_input"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                label="კატეგორია"
                name="category_input"
                autocomplete="off"
                id="category"
                type="text"
                placeholder="აირჩიეთ კატეგორია"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Input
              label="ელ-ფოსტა"
              name="email_input"
              id="email"
              type="text"
              placeholder="Example@redberry.ge"
              autocomplete="off"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">გამოქვეყნება</button>
        </form>
      </div>
    </>
  );
}

export default BlogUpload;
