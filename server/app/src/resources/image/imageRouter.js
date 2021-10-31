const router = require("express").Router({ mergeParams: true });
const imageController = require("./imageController");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: "dishesphotos/" });
router.route("/").post(upload.single("image"), imageController.uploadImage);
//router.route("/:imageId").get(imageController.downloadById);
//router.route("/all/:dishId").delete(imageController.deleteAllImages);
router.route("/:publicId").delete(imageController.deleteById);

module.exports = router;
