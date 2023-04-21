import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row, Button } from "antd";
import axios from "axios";
const { Title } = Typography;
const { Meta } = Card;

function Home() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex + 1 < videos.length ? prevIndex + 1 : 0
    );
  };

  const renderCurrentVideo = () => {
    if (videos.length > 0) {
      const video = videos[currentVideoIndex];
      var minutes = Math.floor(video.duration / 60);
      var seconds = Math.floor(video.duration - minutes * 60);

      return (
        <div style={{ position: "relative" }}>
          <video
            controls
            style={{ width: "100%" }}
            src={`http://localhost:3001/api/video/${video.filePath}`}
          />
          <div
            className=" duration"
            style={{
              bottom: 0,
              right: 0,
              position: "absolute",
              margin: "4px",
              color: "#fff",
              backgroundColor: "rgba(17, 17, 17, 0.8)",
              opacity: 0.8,
              padding: "2px 4px",
              borderRadius: "2px",
              letterSpacing: "0.5px",
              fontSize: "12px",
              fontWeight: "500",
              lineHeight: "12px",
            }}
          >
            <span>
              {minutes}:{seconds}
            </span>
          </div>
          <br />
          <Meta
            avatar={<Avatar src={video.writer.image} />}
            title={video.title}
          />
          <span>{video.writer.name} </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Recommended </Title>
      <hr />

      {renderCurrentVideo()}
      <Button onClick={handleNextVideo}>Next</Button>
    </div>
  );
}

export default Home;
