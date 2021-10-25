const express = require("express");
const dishRouter = require("./resources/dish/dishRouter");

const categoryRouter = require("./resources/category/categoryRouter")
const ingredientRouter = require("./resources/ingredient/ingredientRouter");
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

app.use("/api/dish", dishRouter);
app.use("/api/ingredient", ingredientRouter);

app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}.`);
});
