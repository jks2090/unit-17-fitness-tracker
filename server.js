const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
const PORT = process.env.PORT || 4000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// db.on("error", error => {
//   console.log("database error:", error);
// });

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;



app.use(apiRoutes);
app.use(htmlRoutes);
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});