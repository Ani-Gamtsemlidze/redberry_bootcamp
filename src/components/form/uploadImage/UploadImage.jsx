import styles from "./UploadImage.module.css";
import uploadPhoto from "../../../../public/images/folder-add.svg";

function UploadImage() {
  return (
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
  );
}

export default UploadImage;
