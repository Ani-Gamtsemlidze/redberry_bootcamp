import styles from "./UploadImage.module.css";
import uploadPhoto from "../../../../public/images/folder-add.svg";
import { useState } from "react";
import { useBlogs } from "../../../context/BlogContextProvider";

function UploadImage({ handleInputChange }) {
  // const [userImage, setUserImage] = useState();
  // function handleChangeImage(e) {
  //   const file = e.target.files[0];
  //   const imgUrl = URL.createObjectURL(file);
  //   setUserImage(imgUrl);
  // }
  // const { handleChangeImage } = useBlogs();
  return (
    <div className={styles.inputGroup}>
      <label>ატვირთეთ ფოტო</label>
      <div className={styles.file}>
        <label className={styles.img_file} htmlFor="file">
          <img src={uploadPhoto} alt="Upload icon" />
          <input
            name="upload_input"
            id="file"
            type="file"
            className={styles.fileInput}
            onChange={(e) => handleInputChange(e)}
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
