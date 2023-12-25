import Header from "../../components/header/Header";
import styles from "./BlogUpload.module.css";
import uploadPhoto from "../../../public/images/folder-add.svg";

function BlogUpload() {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#FCFCFD", padding: "33px 240px 0" }}>
        <h2>ბლოგის დამატება</h2>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>ატვირთეთ ფოტო</label>
            <div className={styles.file}>
              <label className={styles.img_file} htmlFor="file">
                <img src={uploadPhoto} alt="Upload icon" />
                <input id="file" type="file" className={styles.fileInput} />
                <p className={styles.file_info}>
                  ჩააგდეთ ფაილი აქ ან{" "}
                  <span className={styles.underline_text}>აირჩიეთ ფაილი</span>{" "}
                </p>
              </label>
            </div>
          </div>
          <div className={styles.author_title}>
            <div className={styles.inputGroup}>
              <label htmlFor="authorInput">ავტორი *</label>
              <input
                id="authorInput"
                type="text"
                placeholder="შეიყვანეთ ავტორი"
              />
              <div className={styles.author_info}>
                <span>მინიმუმ 4 სიმბოლო </span>
                <span>მინიმუმ ორი სიტყვა </span>
                <span> მხოლოდ ქართული სიმბოლოები</span>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="titleInput">სათაური *</label>
              <input
                id="titleInput"
                type="text"
                placeholder="შეიყვანეთ სათაური"
              />
              <span>მინიმუმ 2 სიმბოლო</span>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="descriptionInput">აღწერა *</label>
            <textarea
              className={styles.description}
              id="descriptionInput"
              placeholder="შეიყვანეთ აღწერა"
            />
            <span>მინიმუმ 2 სიმბოლო</span>
          </div>
          <div className={styles.date_category}>
            <div className={styles.inputGroup}>
              <label htmlFor="publishInput">გამოქვეყნების თარიღი *</label>
              <input
                id="publishInput"
                type="text"
                placeholder="შეიყვანეთ სათაური"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="categoryInput">კატეგორია *</label>
              <input
                id="categoryInput"
                type="text"
                placeholder="აირჩიეთ კატეგორია"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="categoryInput">ელ-ფოსტა</label>
            <input
              id="categoryInput"
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
