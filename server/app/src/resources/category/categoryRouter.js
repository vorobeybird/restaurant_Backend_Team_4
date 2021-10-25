const router = require("express").Router();
const categoryController = require("./categoryController");

router.route("/").get(categoryController.getAll);
router.route("/:categoryId").get(categoryController.findById);
router.route("/").post(categoryController.create);
router.route("/:categoryId").put(categoryController.updateById);
router.route("/:categoryId").delete(categoryController.removeById);
router.route("/").delete(categoryController.removeAll);

module.exports = router;
