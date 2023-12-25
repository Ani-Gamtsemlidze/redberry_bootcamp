import Header from "../../components/header/Header";
import styles from "./BlogUpload.module.css";
import Input from "../../components/form/input/Input";
import UploadImage from "../../components/form/uploadImage/UploadImage";

function BlogUpload() {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#FCFCFD", padding: "33px 240px 100px" }}>
        <h2 className={styles.page_title}>ბლოგის დამატება</h2>
        <form className={styles.form}>
          <UploadImage />
          <div className={styles.author_title}>
            <div className={styles.author}>
              <Input
                label="ავტორი"
                id="author"
                type="text"
                placeholder="შეიყვანეთ ავტორი"
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
                id="title"
                type="text"
                placeholder="შეიყვანეთ სათაური"
              />
              <span className={styles.info}>მინიმუმ 2 სიმბოლო</span>
            </div>
          </div>

          <div className={styles.description}>
            <Input
              label="აღწერა"
              id="description"
              textarea
              placeholder="შეიყვანეთ აღწერა"
            />
            <span>მინიმუმ 2 სიმბოლო</span>
          </div>
          <div className={styles.date_category}>
            <div>
              <Input label="გამოქვეყნების თარიღი" id="publish" type="date" />
            </div>
            <div>
              <Input
                label="კატეგორია"
                id="category"
                type="text"
                placeholder="აირჩიეთ კატეგორია"
              />
            </div>
          </div>
          <div>
            <Input
              label="ელ-ფოსტა"
              id="email"
              type="text"
              placeholder="Example@redberry.ge"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default BlogUpload;
