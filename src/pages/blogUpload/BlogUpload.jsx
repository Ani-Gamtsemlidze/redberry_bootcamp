import Header from "../../components/header/Header";
import styles from "./BlogUpload.module.css";
import Input from "../../components/form/input/Input";
import UploadImage from "../../components/form/uploadImage/UploadImage";
import { useState } from "react";
import { useBlogs } from "../../context/BlogContextProvider";
import axios from "axios";

function BlogUpload() {
  //   const { userImage } = useBlogs();
  //   console.log(userImage);
  const [inputValues, setInputValues] = useState({
    title_input: "",
    desctiption_input: "",
    author_input: "",
    date_input: "",
    category_input: "",
    email_input: "",
    upload_input: "",
  });

  const blogData = {
    title: inputValues.title_input,
    description: inputValues.desctiption_input,
    author: inputValues.author_input,
    publish_date: inputValues.date_input,
    categories: inputValues.category_input,
    email: inputValues.email_input,
    image: inputValues.upload_input,
  };
  console.log(blogData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  //   localStorage.setItem("values", inputValues);

  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1";
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.post(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          data: `${blogData}`,
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
        <form onSubmit={handleCreateRequest} className={styles.form}>
          <UploadImage handleInputChange={(e) => handleInputChange(e)} />

          <div className={styles.author_title}>
            <div className={styles.author}>
              <Input
                label="ავტორი"
                name="author_input"
                id="author"
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
