const express = require("express");
const dishRouter = require("./resources/dish/dishRouter");
const app = express();
require("dotenv").config();

const PORT = process.env.NODE_PORT || 5000;

app.use(express.json());

app.use("/", (req, res, next) => {
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

app.use("/api/menu", dishRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}.`);
});
