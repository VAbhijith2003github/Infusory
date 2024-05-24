import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { imageDB } from "../../firebase-config";
import Sidebar from "../../components/sidebar";

const Upload = () => {
  const [image, setImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleClick = () => {
    if (!image) return;

    const fileExtension = image.name.split(".").pop();
    if (fileExtension !== "glb") {
      console.error("Invalid file extension. Only .glb files are allowed.");
      alert("Invalid file extension. Only .glb files are allowed.");
      return;
    }

    const storageRef = ref(imageDB, `glb-files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (uploadProgress === 100) {
      setDownloadURL(image.name);
    }
  }, [uploadProgress, image]);

  return (
    <>
      <Sidebar />
      <div className="content" id="uploaddiv">
        <input
          type="file"
          name="glbinput"
          id="upload"
          onChange={(e) => setImage(e.target.files[0])}
          className="uploadinput"
        />
        <button onClick={handleClick} className="uploadbutton">
          upload
        </button>
        {uploadProgress > 0 && (
          <p style={{ color: "white" }}>
            Upload progress: {uploadProgress.toFixed(2)}%
          </p>
        )}
        {downloadURL && (
          <p style={{ color: "white" }}>File uploaded successfully!</p>
        )}
      </div>
    </>
  );
};

export default Upload;
