import styles from "./UploadImage.module.css";
import uploadPhoto from "../../../../public/images/folder-add.svg";
import { useBlogs } from "../../../context/BlogContextProvider";

function UploadImage() {
  const { handleFileInputChange } = useBlogs();
  return (
    <div className={styles.inputGroup}>
      <label htmlFor="file">ატვირთეთ ფოტო</label>
      <div className={styles.file}>
        <label className={styles.img_file} htmlFor="file">
          <img src={uploadPhoto} alt="Upload icon" />
          <input
            name="upload_input"
            id="file"
            type="file"
            className={styles.fileInput}
            onChange={(e) => handleFileInputChange(e)}
          />
          <p className={styles.file_info}>
            ჩააგდეთ ფაილი აქ ან{" "}
            <span className={styles.underline_text}>აირჩიეთ ფაილი</span>{" "}
          </p>
        </label>
      </div>
    </div>
  );
}

export default UploadImage;
