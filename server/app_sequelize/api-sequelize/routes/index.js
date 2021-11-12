var express = require("express");
var router = express.Router();
const dishController = require("../controllers").dish;
const ingredientController = require("../controllers").ingredient;
const categoryController = require("../controllers").category;
const orderController = require("../controllers").order;
const tableController = require("../controllers").table;
const reserveController = require("../controllers").reserve;

const dishPhotoController = require("../controllers").dishphoto;
const multer = require("multer");
const upload = multer({ dest: "dishesphotos/" });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//ids=1,3,4,5 & category=3 & filter=Сардины
router.get("/api/dishes", dishController.showDishes);

router.post("/api/dish", dishController.add);

router.post("/api/addBigDish", dishController.addBigDish);

router.put("/api/dish/:id", dishController.update);
router.delete("/api/dish/:id", dishController.delete);
router.post("/api/dish/addIngredient", dishController.addIngredient);
router.delete("/api/dishremoveIngredient", dishController.deleteIngredient);
router.post("/api/dish/addCategory", dishController.addCategory);

router.get("/api/ingredient", ingredientController.list);
router.post("/api/ingredient", ingredientController.add);
router.get("/api/ingredient/:id", ingredientController.getById);
router.put("/api/ingredient/:id", ingredientController.update);
router.delete("/api/ingredient/:id/:hard?", ingredientController.delete);

router.get("/api/category", categoryController.list);
router.post("/api/category", categoryController.add);
router.get("/api/category/:id", categoryController.getById);
router.put("/api/category/:id", categoryController.update);
router.delete("/api/category/:id", categoryController.delete);

router.get("/api/order", orderController.list);
router.post("/api/order", orderController.add);
router.get("/api/order/:id", orderController.getById);
router.put("/api/order/:id", orderController.update);
router.delete("/api/order/:id", orderController.delete);

router.post("/api/image", upload.single("image"), dishPhotoController.add);
router.delete("/api/image/:publicId", dishPhotoController.delete);

router.get("/api/tables", tableController.getTables);
router.post("/api/tables", tableController.add);
router.get("/api/tables:date", tableController.getSortedTables);

router.post("/api/reserve", reserveController.add);


module.exports = router;
