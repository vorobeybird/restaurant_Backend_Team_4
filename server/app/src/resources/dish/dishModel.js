const sql = require("../../utils/db");

class Dish {
  constructor(dish) {
    this.title = dish.title;
    this.default_ingredients = dish.default_ingredients;
    this.categories = dish.categories;
    this.ingredients = dish.ingredients;
    this.price = dish.price;
    this.photos = dish.photos;
    this.weight = dish.weight;
    this.calories = dish.calories;
  }

  //need to refactor error logging CREATE TABLE dishes (id INT NOT NULL PRIMARY AUTO_INCREMENT, title VARCHAR(50), ingredients VARCHAR(100), category VARCHAR(100), price INT, photo VARCHAR(50), weight INT, calories INT);
  static getAll = async (result) => {
    sql.query(
      //SELECT f.*, d.* FROM dishes_photos AS f INNER JOIN dishes as d ON d.id=f.dish_id,
      //"SELECT d.*, f.*,  d_i.*, d_c.* FROM dishes AS d INNER JOIN dishes_photos AS f ON f.dish_id=d.id INNER JOIN dishes_ingredients AS d_i ON d_i.dish_id=d.id INNER JOIN dishes_categories AS d_c ON d_c.dish_id=d.id",
      //"SELECT * FROM dishes_photos, dishes WHERE dishes.id = dishes_photos.dish_id",
      "SELECT * FROM dishes ORDER BY id LIMIT 30",
      (err, res) => {
        if (err) {
          console.error("error", err);
          result(err, null);
          return;
        }

        if (res.length) {
          const mainRows = res;
          const dishes = [];
          mainRows.forEach((row, i) => {
            let dish = {
              id: row.id,
              title: row.title,
              default_ingredients: row.default_ingredients,
              price: row.price,
              weight: row.weight,
              photos: [],
              categories: [],
              ingredients: [],
            };
            //getting the photos
            sql.query(
              "SELECT * FROM dishes_photos WHERE dish_id = ?",
              dish.id,
              (err, res) => {
                if (err) {
                  console.error("error", err);
                  result(err, null);
                  return;
                }
                if (res.length) {
                  res.forEach((row) => {
                    const photo = {
                      photo_url: row.photo_url,
                      ordinal_num: row.ordinal_num,
                      width: row.width,
                      height: row.height,
                    };
                    dish.photos.push(photo);
                  });
                }
                //getting the categories
                sql.query(
                  "SELECT category_id FROM dishes_categories WHERE dish_id = ?",
                  dish.id,
                  (err, res) => {
                    if (err) {
                      console.error("error", err);
                      result(err, null);
                      return;
                    }
                    if (res.length) {
                      res.forEach((row) => {
                        dish.categories.push(row.category_id);
                      });
                    }
                    //getting the ingredients
                    sql.query(
                      "SELECT * FROM dishes_ingredients WHERE dish_id = ?",
                      dish.id,
                      (err, res) => {
                        if (err) {
                          console.error("error", err);
                          result(err, null);
                          return;
                        }
                        if (res.length) {
                          res.forEach((row) => {
                            dish.ingredients.push(row.ingredient_id);
                          });
                        }
                        dishes.push(dish);
                        if (i === mainRows.length - 1) {
                          result(null, dishes);
                          return;
                        }
                      }
                    );
                  }
                );
              }
            );
          });
          console.log("Number of dishes found:", res.length);
        } else {
          result({ kind: "not_found" }, null);
        }
      }
    );
  };

  static create = async (newDish, result) => {
    // needs refactoring
    /*     sql.beginTransaction((err) => {
      if (err) {
        throw err;
      } */
    const { photos, categories, ingredients, ...dish } = newDish;
    sql.query("INSERT INTO dishes SET ?", dish, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      const dish_id = res.insertId;
      photos.forEach((photo) => {
        sql.query(
          "INSERT INTO dishes_photos SET dish_id = ?, ?",
          [dish_id, photo],
          (err, res) => {
            if (err) {
              console.error("error", err);
              result(err, null);
              return;
            }
          }
        );
      });
      categories.forEach((category) => {
        sql.query(
          "INSERT INTO dishes_categories SET dish_id = ?, category_id = ?",
          [dish_id, category],
          (err, res) => {
            if (err) {
              console.error("error", err);
              result(err, null);
              return;
            }
          }
        );
      });
      ingredients.forEach((ingredient) => {
        sql.query(
          "INSERT INTO dishes_ingredients SET dish_id = ?, ingredient_id = ?",
          [dish_id, ingredient],
          (err, res) => {
            if (err) {
              console.error("error", err);
              result(err, null);
              return;
            }
          }
        );
      });
      console.log("created dish: ", { id: dish_id, ...newDish });
      result(null, { id: dish_id, ...newDish });
    });
    //});
  };

  static findById = async (dishId, result) => {
    // needs refactoring
    sql.query("SELECT * FROM dishes WHERE id = ?", dishId, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      if (res.length) {
        let dish = {
          id: res[0].id,
          title: res[0].title,
          default_ingredients: res[0].default_ingredients,
          price: res[0].price,
          weight: res[0].weight,
          photos: [],
          categories: [],
          ingredients: [],
        };
        //getting the photos
        sql.query(
          "SELECT * FROM dishes_photos WHERE dish_id = ?",
          dish.id,
          (err, res) => {
            if (err) {
              console.error("error", err);
              result(err, null);
              return;
            }
            if (res.length) {
              res.forEach((row) => {
                const photo = {
                  photo_url: row.photo_url,
                  ordinal_num: row.ordinal_num,
                  width: row.width,
                  height: row.height,
                };
                dish.photos.push(photo);
              });
            }
            //getting the categories
            sql.query(
              "SELECT category_id FROM dishes_categories WHERE dish_id = ?",
              dish.id,
              (err, res) => {
                if (err) {
                  console.error("error", err);
                  result(err, null);
                  return;
                }
                if (res.length) {
                  res.forEach((row) => {
                    dish.categories.push(row.category_id);
                  });
                }
                //getting the ingredients
                sql.query(
                  "SELECT * FROM dishes_ingredients WHERE dish_id = ?",
                  dish.id,
                  (err, res) => {
                    if (err) {
                      console.error("error", err);
                      result(err, null);
                      return;
                    }

                    if (res.length) {
                      res.forEach((row) => {
                        dish.ingredients.push(row.ingredient_id);
                      });
                    }
                    result(null, dish);
                    return;
                  }
                );
              }
            );
          }
        );
        console.log("found dish:", res[0]);
      } else {
        result({ kind: "not_found" }, null);
      }
    });
  };

  static updateById = async (id, updatedDish, result) => {
    /*     sql.beginTransaction((err) => {
      if (err) {
        throw err;
      } */
    const { photos, categories, ingredients, ...dish } = updatedDish;
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
      sql.query(
        "DELETE FROM dishes_photos WHERE dish_id = ?",
        id,
        (err, res) => {
          if (err) {
            console.error("error", err);
            result(err, null);
            return;
          }
          photos.forEach((photo) => {
            sql.query(
              "INSERT INTO dishes_photos SET ?, dish_id = ?",
              [photo, id],
              (err, res) => {
                if (err) {
                  console.error("error", err);
                  result(err, null);
                  return;
                }
              }
            );
          });
        }
      );

      sql.query(
        "DELETE FROM dishes_categories WHERE dish_id = ?",
        id,
        (err, res) => {
          if (err) {
            console.error("error", err);
            result(err, null);
            return;
          }
          categories.forEach((category) => {
            sql.query(
              "INSERT INTO dishes_categories SET category_id = ?, dish_id = ?",
              [category, id],
              (err, res) => {
                if (err) {
                  console.error("error", err);
                  result(err, null);
                  return;
                }
              }
            );
          });
        }
      );

      sql.query(
        "DELETE FROM dishes_ingredients WHERE dish_id = ?",
        id,
        (err, res) => {
          if (err) {
            console.error("error", err);
            result(err, null);
            return;
          }
          ingredients.forEach((ingredient) => {
            sql.query(
              "INSERT INTO dishes_ingredients SET ingredient_id = ?, dish_id = ?",
              [ingredient, id],
              (err, res) => {
                if (err) {
                  console.error("error", err);
                  result(err, null);
                  return;
                }
              }
            );
          });
        }
      );

      console.log("updated dish: ", { id, ...updatedDish });
      result(null, { id, ...updatedDish });
    });
  };

  static removeById = async (id, result) => {
    sql.query("DELETE FROM dishes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.error("error", err);
        result(err, null);
        return;
      }
      //no need to use it as we have foreign key constraint ON DELETE CASCADE set
      /*       sql.query("DELETE FROM dishes_ingredients WHERE dish_id = ?", id, (err, res) => {
        if (err) {
          console.error("error", err);
          result(err, null);
          return;
        }
        sql.query("DELETE FROM dishes_photos WHERE dish_id = ?", id, (err, res) => {
          if (err) {
            console.error("error", err);
            result(err, null);
            return;
          }
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
        });
      }); */
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
