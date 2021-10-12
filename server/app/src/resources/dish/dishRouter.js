const router = require("express").Router();
const dishController = require("./dishController");

router.route("/").get(dishController.getAll);
router.route("/:dishId").get(dishController.findById);
router.route("/").post(dishController.create);
router.route("/:dishId").put(dishController.updateById);
router.route("/:dishId").delete(dishController.removeById);
router.route("/").delete(dishController.removeAll);

module.exports = router;
