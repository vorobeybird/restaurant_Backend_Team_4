const sql = require("../../utils/db");

class Dish {
  constructor(dish) {
    this.title = dish.title;
    this.ingredients = dish.ingredients;
    this.category = dish.category;
    this.price = dish.price;
    this.photo = dish.photo;
    this.weight = dish.weight;
    this.calories = dish.calories;
  }

  //need to refactor error logging CREATE TABLE dishes (id INT NOT NULL PRIMARY AUTO_INCREMENT, title VARCHAR(50), ingredients VARCHAR(100), category VARCHAR(100), price INT, photo VARCHAR(50), weight INT, calories INT);

  static getAll = async (result) => {
    sql.query("SELECT * FROM dishes", (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Number of dishes found:", res.length);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  static create = async (newDish, result) => {
    sql.query("INSERT INTO dishes SET ?", newDish, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      console.log("created dish: ", { id: res.insertId, ...newDish });
      result(null, { id: res.insertId, ...newDish });
    });
  };

  static findById = async (dishId, result) => {
    sql.query(`SELECT * FROM dishes WHERE id = ${dishId}`, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found dish:", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static updateById = async (id, dish, result) => {
    sql.query("UPDATE dishes SET ? WHERE id = ?", [dish, id], (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found dish with the given id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated dish: ", { id: id, ...dish });
      result(null, { id: id, ...dish });
    });
  };

  static removeById = async (id, result) => {
    sql.query("DELETE FROM dishes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found dish with the given id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted dish with the id: ", id);
      result(null, res);
    });
  };

  static removeAll = async (result) => {
    sql.query("DELETE FROM dishes", (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // zero rows in the table dishes
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`deleted ${res.affectedRows} dishes`);
      result(null, res);
    });
  };
}
module.exports = Dish;
