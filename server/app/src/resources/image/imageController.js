const Image = require("./imageModel");
const { uploadImage, deleteImage } = require("../../utils/cloudinary");
const fs = require("fs");
const util = require("util");

module.exports = class ImageController {
  static uploadImage = async (req, res) => {
    if (!req.file) {
      res
        .status(400)
        .json({ status: 400, message: "Uploaded image cannot be null" });
    }
    const file = req.file;
    const result = await uploadImage(file.path);
    const deleteFile = util.promisify(fs.unlink);
    await deleteFile(file.path);

    if (req.body.dishId) {
      const image = new Image({
        dish_id: req.body.dishId,
        public_id: result.public_id,
        photo_url: result.url,
        width: result.width,
        height: result.height,
        ordinal_num: 1,
      });
      await Image.addImage(image, async (err, data) => {
        if (err) {
          res.status(500).json({
            status: 500,
            message:
              err.message || "Some error occurred while writing image to DB",
          });
        } else {
          res.status(201).json(data);
        }
      });
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
  };
  // temporary disabled until nginx proxyfication will be set up.
  /*   static downloadById = async (req, res) => {
    const key = req.params.imageId;
    const readStream = downloadImage(key);
    await readStream.pipe(res);
    res.status(200).json(data);

         await Image.findById(key, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 404,
            message: `Not found Images in Images table with the id: ${req.params.imageId}.`,
          });
        } else {
          res.status(500).json({
            status: 500,
            message:
              err.message ||
              `Some error occurred while retrieving Image id: ${req.params.imageId} from DB.`,
          });
        }
      } else {
        req.params.imageId;
        res.status(200).json({ status: 200, data });
      }
    }); 
  }; */
  static deleteAllImages = async (req, res) => {
    //we cannot delete all images without iterating images or using Admin API so we're just whiping the db so far
    await Image.removeAllImages(req.params.dishId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Images in images table with the dish_id: ${req.params.dishId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while deleting Images in of dish_id: ${req.params.dishId} from the DB.`,
          });
        }
      } else {
        res.status(200).json({
          status: 200,
          message: `Images were successfully deleted from the DB.`,
        });
      }
    });
  };

  static deleteById = async (req, res) => {
    await Image.removeImage(req.params.publicId, async (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          const result = await deleteImage(req.params.publicId);
          res.status(200).json({
            status: 200,
            public_id: req.params.publicId,
            message: `Image was successfully deleted from the storage.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while deleting Images in of public_id: ${req.params.publicId} from the DB.`,
          });
        }
      } else {
        const result = await deleteImage(req.params.publicId);
        res.status(200).json({
          status: 200,
          public_id: req.params.publicId,
          message: `Image was successfully deleted from the storage and DB.`,
        });
      }
    });
  };
};
