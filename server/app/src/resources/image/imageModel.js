const sql = require("../../utils/db");

class Image {
  constructor(image) {
    this.dish_id = image.dish_id;
    this.public_id = image.public_id;
    this.photo_url = image.photo_url;
    this.width = image.width;
    this.height = image.height;
    this.ordinal_num = 1;
  }

  static addImage = async (newImage, result) => {
    const { dish_id, ...photo } = newImage;
    sql.query(
      "INSERT INTO dishes_photos SET dish_id = ?, ?",
      [dish_id, photo],
      (err, res) => {
        if (err) {
          console.error("error", err);
          result(err, null);
          return;
        }
        console.log("created image: ", { imagePath: newImage.photo_url });
        result(null, photo);
      }
    );
  };

  static removeImage = async (id, result) => {
    sql.query(
      "DELETE FROM dishes_photos WHERE public_id = ?",
      id,
      (err, res) => {
        if (err) {
          console.error("error", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // not found image with the given id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Photo deleted succesfully");
        result(null, res);
      }
    );
  };

  static removeAllImages = async (id, result) => {
    sql.query("DELETE FROM dishes_photos WHERE dish_id = ?", id, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found image with the given id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Dish photos deleted succesfully");
      result(null, res);
    });
  };
}
module.exports = Image;
