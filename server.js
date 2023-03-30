// create a server that uses the express and axios modules
const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

// use the express.json() middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  app.use(express.static(path.join(__dirname, "./client/build")));
}

// use the routes
// app.use(routes);
// app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/api/video", require("./routes/api/video"));
app.use("/api/user", require("./routes/api/user"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// start the server with the sequelize.sync() method
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
