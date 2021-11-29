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
const isAuth = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//ids=1,3,4,5 & category=3 & filter=Сардины
router.get("/api/dishes", dishController.showDishes);

router.post("/api/dish", isAuth, dishController.add);

router.post("/api/addBigDish", isAuth, dishController.addBigDish);

router.put("/api/dish/:id", isAuth, dishController.update);
router.delete("/api/dish/:id", isAuth, dishController.delete);
router.post("/api/dish/addIngredient", isAuth, dishController.addIngredient);
router.delete("/api/dishremoveIngredient", isAuth, dishController.deleteIngredient);
router.post("/api/dish/addCategory", isAuth, dishController.addCategory);

router.get("/api/ingredient", ingredientController.list);
router.post("/api/ingredient", isAuth, ingredientController.add);
router.get("/api/ingredient/:id", ingredientController.getById);
router.put("/api/ingredient/:id", isAuth, ingredientController.update);
router.delete("/api/ingredient/:id/:hard?", isAuth, ingredientController.delete);

router.get("/api/category", categoryController.list);
router.post("/api/category", isAuth, categoryController.add);
router.get("/api/category/:id", categoryController.getById);
router.put("/api/category/:id", isAuth, categoryController.update);
router.delete("/api/category/:id", isAuth, categoryController.delete);

router.get("/api/order", isAuth, orderController.list);
router.post("/api/order", isAuth, orderController.add);
router.get("/api/order/:id", isAuth, orderController.getById);
router.put("/api/order/:id", isAuth, orderController.update);
router.delete("/api/order/:id", isAuth, orderController.delete);

router.get("/api/orderByCustomer/:customerId", isAuth, orderController.getByCustmerId);

router.post("/api/image", isAuth, upload.single("image"), dishPhotoController.add);
router.delete("/api/image/:publicId", isAuth, dishPhotoController.delete);

router.post("/api/tables", isAuth, tableController.add);
router.get("/api/tables", isAuth, tableController.getTablesReservatons);
router.get("/api/tablepool", isAuth, tableController.getTables);
router.get("/api/tables/:date", isAuth, tableController.getSortedTables);
router.post("/api/tables", isAuth, tableController.add);
router.put("/api/tables/:id/:hard?", isAuth, tableController.update);
router.delete("/api/tables/:id/:hard?", isAuth, tableController.delete);

router.post("/api/reserve", isAuth, reserveController.add);

module.exports = router;
