import { Box, Button, Input, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 } from "uuid";
import { storage } from "../firebase.config/firebase";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
const styles = {
  container: {
    width: "20rem",
    // border: '1px solid red',
    borderRadius: "1.5vw",
    borderStyle: "dashed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    // padding: '2vh 2vw',
    height: "fit-content",
    "& > ::file-selector-button": {
      // backgroundColor: 'red',
      borderRadius: "2vw",
      borderStyle: "dashed",
      outline: "none",
      cursor: "pointer",
      // padding: '2rem',
    },
  },
};

export default function PhotoUploader(props) {
  const { imgUrl, setImgUrl } = props;
  const [file, setFile] = useState(null);
  // let progress = 0;
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  useEffect(() => {
    // console.log(new File(file));
    uploader(file);
    // console.log(loading);
  }, [file]);
  function uploader() {
    if (file == null) return;
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
        // console.log(loading);
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pro);
        console.log("Upload is " + pro + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
        console.log(loading);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          setImgUrl(downloadURL);
          // console.log('File available at', downloadURL);
        });
        setLoading(false);
        alert("Upload is complete");
      }
    );
  }
  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <InputBase
          type="file"
          accept="image/*"
          defaultValue={file}
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
          sx={styles.uploadBtn}
        />
      </Box>
      <Box>
        {loading ? <CircularProgressWithLabel value={progress} /> : <></>}
      </Box>
      {imgUrl ? (
        <Box>
          <img style={{ height: "fit-content", width: "200px" }} src={imgUrl} />
        </Box>
      ) : null}
    </Box>
  );
}
