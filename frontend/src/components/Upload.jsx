import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import TagsInput from "./TagsInput";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../fireabase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const Wrapper = styled.div`
  width: 60vw;
  height: auto;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2vh;
  padding: 24px;
  border-radius: 8px;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: inherit;
  color: ${({ theme }) => theme.textSoft};
  border: none;
  outline: none;
  text-decoration: none;
  font-size: 16px;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 12px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  &:focus {
    outline: transparent;
  }
  &[type="file"] {
    margin-left: 8px;
    cursor: pointer;
    color: ${({ theme }) => theme.textSoft};
  }
`;

const Description = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  &:focus {
    outline: ${({ theme }) => theme.soft};
  }
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const FileInput = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tag, setTag] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const type= urlType === "imgUrl" ? "image/" :"video/";
    const storage = getStorage(app);
    console.log(storage);
    const fileName = type + new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        console.log(uploadTask.snapshot.ref);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags: tag });
    setOpen(false);
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>
          <ClearIcon />
        </Close>
        <Title>Upload a New Video</Title>
        <FileInput>
          <label>Upload Video: </label>
          {videoPerc > 0 ? (
            <Loader perc={videoPerc} />
          ) : (
            <Input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          )}
        </FileInput>
        <Input
          type="text"
          placeholder="Title of the video..."
          name="title"
          onChange={handleChange}
        />
        <Description
          placeholder="Description"
          name="desc"
          rows={5}
          onChange={handleChange}
        />
        <TagsInput setTag={setTag} />
        <FileInput>
          <label>Upload Image: </label>
          {imgPerc > 0 ? (
            <Loader perc={imgPerc} />
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
        </FileInput>
        <Button onClick={handleUpload}>UPLOAD</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
