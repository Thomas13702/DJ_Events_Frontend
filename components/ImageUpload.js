import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //gets data from form
    formData.append("files", image); //sets file in formData to image
    formData.append("ref", "events"); //adds a reference to image that its an event
    formData.append("refId", evtId); //adds ID to image so we know what event it links to
    formData.append("field", "image"); //adds image to image field in DB

    const res = await fetch(`${API_URL}/upload`, {
      // use /upload to upload something with strapi
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      imageUploaded(); //if everything okay, call image uploaded in edit/[id].js through props
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
