import styles from "./UploadImage.module.css";
import uploadPhoto from "../../../../public/images/folder-add.svg";
import gallery from "../../../../public/images/gallery.png";
import close from "../../../../public/images/close.svg";
import { useState } from "react";
import { useUpload } from "../../../context/UploadBlogContext";

function UploadImage() {
  const { handleFileInputChange, inputValues } = useUpload();
  const [imgToggler, setImgToggler] = useState(false);
  function handleUploadImage(e) {
    handleFileInputChange(e);
    setImgToggler(true);
  }

  return (
    <>
      <div className={styles.inputGroup}>
        <label htmlFor="file">ატვირთეთ ფოტო</label>
        {!imgToggler ? (
          <div className={styles.file}>
            <label className={styles.img_file} htmlFor="file">
              <img src={uploadPhoto} alt="Upload icon" />
              <input
                name="upload_input"
                id="file"
                type="file"
                className={styles.fileInput}
                onChange={(e) => handleUploadImage(e)}
              />
              <p className={styles.file_info}>
                ჩააგდეთ ფაილი აქ ან{" "}
                <span className={styles.underline_text}>აირჩიეთ ფაილი</span>{" "}
              </p>
            </label>
          </div>
        ) : (
          <div className={styles.uploaded}>
            <div className={styles.gallery_name}>
              <img src={gallery} />
              <p>{inputValues.upload_input.name}</p>
            </div>
            <div>
              <img onClick={() => setImgToggler(false)} src={close} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadImage;
