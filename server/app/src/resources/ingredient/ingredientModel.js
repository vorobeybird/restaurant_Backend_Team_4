const sql = require("../../utils/db");

class Ingredient {
  constructor(ingredient) {
    this.title = ingredient.title;
  }
  static getAll = async (result) => {
    sql.query("SELECT * FROM ingredient", (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Number of ingredient found:", res.length);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  static create = async (newIngredient, result) => {
    sql.query("INSERT INTO ingredient SET ?", newIngredient, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      console.log("created ingredient: ", { id: res.insertId, ...newIngredient });
      result(null, { id: res.insertId, ...newIngredient });
    });
  };

  static findById = async (ingredientId, result) => {
    sql.query(`SELECT * FROM ingredient WHERE id = ${ingredientId}`, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found ingredient:", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static updateById = async (id, ingredient, result) => {
    sql.query("UPDATE ingredient SET ? WHERE id = ?", [ingredient, id], (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found ingredient with the given id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ingredient: ", { id: id, ...ingredient });
      result(null, { id: id, ...ingredient });
    });
  };

  static removeById = async (id, result) => {
    sql.query("DELETE FROM ingredient WHERE id = ?", id, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found ingredient with the given id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted ingredient with the id: ", id);
      result(null, res);
    });
  };

  static removeAll = async (result) => {
    sql.query("DELETE FROM ingredient", (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // zero rows in the table ingredient
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`deleted ${res.affectedRows} ingredient`);
      result(null, res);
    });
  };
}
module.exports = Ingredient;
