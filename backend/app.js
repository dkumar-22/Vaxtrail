const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hospitalsRouter = require("./routes/hospitals");
const registeredRouter = require("./routes/registered");
const vaccineRouter = require("./routes/vaccines");
const usersRouter = require("./routes/users");
const feedbackRouter = require("./routes/feedback");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/locationDB", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
app.get("/", (req, res) => {
  res.send("\nHello World");
});

app.use("/hospitals", hospitalsRouter);
app.use("/registered", registeredRouter);
app.use("/vaccines", vaccineRouter);
app.use("/users", usersRouter);
app.use("/feedback", feedbackRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
