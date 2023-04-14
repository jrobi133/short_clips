const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

const Video = require("./models/video").Video;

// Define route handler
app.get("/api/auth/user", (req, res) => {
  // Return a dummy user object
  const user = { name: "John Doe", email: "john.doe@example.com" };
  res.json(user);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}
// Define routes
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/videos", async (req, res) => {
  try {
    const { writer, title, description, filePath, duration, thumbnail } =
      req.body;
    const video = await Video.create({
      writer,
      title,
      description,
      filePath,
      duration,
      thumbnail,
    });
    res.json(video);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/api/video", require("./routes/api/video"));
// Serve uploaded thumbnail images
app.use(
  "/uploads/thumbnails",
  express.static(path.join(__dirname, "/uploads/thumbnails"))
);

app.use("/api/user", require("./routes/api/user"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
