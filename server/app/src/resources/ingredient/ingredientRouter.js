const router = require("express").Router();
const ingredientController = require("./ingredientController");

router.route("/").get(ingredientController.getAll);
router.route("/:ingredientId").get(ingredientController.findById);
router.route("/").post(ingredientController.create);
router.route("/:ingredientId").put(ingredientController.updateById);
router.route("/:ingredientId").delete(ingredientController.removeById);
router.route("/").delete(ingredientController.removeAll);

module.exports = router;
