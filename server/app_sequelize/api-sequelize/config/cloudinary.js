const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "../../.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

const uploadImage = (file) => {
  return cloudinary.uploader.upload(file, function (error, result) {});
};

exports.uploadImage = uploadImage;

const deleteImage = (publicId) => {
  return cloudinary.uploader.destroy(publicId, function (error, result) {});
};
exports.deleteImage = deleteImage;
