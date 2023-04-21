import React, { useState, useEffect } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import Auth from "../utils/auth";

const { Title } = Typography;
const { TextArea } = Input;

function UploadVideoPage(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let { exp, iat, data: decodedUserToken } = Auth.getProfile(); // NOTE: exp is when token expires, iat is when token was issued, data is the user data

        setUser(decodedUserToken);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    console.log(event.currentTarget.value);
    setDescription(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      title === "" ||
      Description === "" ||
      FilePath === "" ||
      Duration === "" ||
      Thumbnail === ""
    ) {
      return alert("Please first fill all the fields");
    }
    const variables = {
      writer: user?.id,
      title: title,
      description: Description,
      // privacy: privacy,
      filePath: FilePath,
      // category: Categories,
      duration: Duration,
      thumbnail: Thumbnail,
    };
    axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        alert("video Uploaded Successfully");
        props.history.push("/");
      } else {
        alert("Failed to upload video");
      }
    });
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);
    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.filePath);
        //gerenate thumbnail with this filepath !
        axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.thumbsFilePath);
          } else {
            alert("Failed to make the thumbnails");
          }
        });
      } else {
        alert("failed to save the video in server");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {Thumbnail !== "" && (
            <div>
              <img src={`http://localhost:3001/${Thumbnail}`} alt="haha" />
            </div>
          )}
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={handleChangeDecsription} value={Description} />
        <br />
        <br />
        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
