const sql = require("../../utils/db");

class Category {
  constructor(category) {
    this.title = category.title;
  }
  static getAll = async (result) => {
    sql.query("SELECT * FROM category", (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Number of category found:", res.length);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  static create = async (newCategory, result) => {
    sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      console.log("created category: ", { id: res.insertId, ...newCategory });
      result(null, { id: res.insertId, ...newCategory });
    });
  };

  static findById = async (categoryId, result) => {
    sql.query(`SELECT * FROM category WHERE id = ${categoryId}`, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found category:", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  };

  static updateById = async (id, category, result) => {
    sql.query("UPDATE category SET ? WHERE id = ?", [category, id], (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found category with the given id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    });
  };

  static removeById = async (id, result) => {
    sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found category with the given id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted category with the id: ", id);
      result(null, res);
    });
  };

  static removeAll = async (result) => {
    sql.query("DELETE FROM category", (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // zero rows in the table category
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`deleted ${res.affectedRows} category`);
      result(null, res);
    });
  };
}
module.exports = Category;