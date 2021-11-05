const Dish = require("../models").Dish;
const DishPhoto = require("../models").DishPhoto;
const { uploadImage, deleteImage } = require("../config/cloudinary");
const fs = require("fs");
const util = require("util");

module.exports = {
  async add(req, res) {
    if (!req.file) {
      res
        .status(400)
        .json({ status: 400, message: "Uploaded image cannot be null" });
    }
    const result = await uploadImage(req.file.path);
    const deleteFile = util.promisify(fs.unlink);
    await deleteFile(req.file.path);

    if (req.body.dishId) {
      return DishPhoto.create({
        dish_id: req.body.dishId,
        public_id: result.public_id,
        photo_url: result.url,
        width: result.width,
        height: result.height,
        ordinal_num: 1,
      })
        .then((result) => res.status(201).send(result))
        .catch((error) => res.status(400).send(error));
    } else {
      const {
        public_id,
        width,
        height,
        url: photo_url,
        ordinal_num = 1,
      } = result;
      res
        .status(201)
        .json({ public_id, width, height, photo_url, ordinal_num });
    }
  },

  async delete(req, res) {
    return DishPhoto.findOne({ where: { public_id: req.params.publicId } })
      .then((result) => {
        if (!result) {
          return res.status(400).send({
            message: "Image Not Found",
          });
        }
        return result
          .destroy()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              status: 200,
              public_id: req.params.publicId,
              message: `Image was successfully deleted from the storage and DB.`,
            });
          })
          .then(() => deleteImage(req.params.publicId))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
