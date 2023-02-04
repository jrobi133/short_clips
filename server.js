// create a server that uses the express and axios modules
const express = require("express");
const sequelize = require("./config/connection");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3000;

// use the express.json() middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// use the routes
app.use(routes);

// start the server with the sequelize.sync() method
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
