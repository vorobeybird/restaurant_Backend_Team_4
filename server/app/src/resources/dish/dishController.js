const Dish = require("./dishModel");
module.exports = class DishController {
  static getAll = async (req, res) => {
    await Dish.getAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 404,
            message: `Not found dishes in dishes table.`,
          });
        } else {
          res.status(500).json({
            status: 500,
            message:
              err.message ||
              "Some error occurred while retrieving dishes from DB.",
          });
        }
      } else {
        res.status(200).json({ status: 200, data });
      }
    });
  };

  static create = async (req, res) => {
    if (!req.body) {
      res
        .status(400)
        .json({ status: 400, message: "Created dish cannot be empty" });
    }
    const dish = new Dish({
      title: req.body.title,
      default_ingredients: req.body.default_ingredients,
      categories: req.body.categories,
      ingredients: req.body.ingredients,
      price: req.body.price,
      photos: req.body.photos,
      weight: req.body.weight,
      calories: req.body.calories,
    });
    await Dish.create(dish, (err, data) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message:
            err.message || "Some error occurred while creating dish in DB.",
        });
      } else {
        res.status(201).json({ status: 201, data });
      }
    });
  };

  static findById = async (req, res) => {
    await Dish.findById(req.params.dishId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 404,
            message: `Not found dishes in dishes table with the id: ${req.params.dishId}.`,
          });
        } else {
          res.status(500).json({
            status: 500,
            message:
              err.message ||
              `Some error occurred while retrieving dish id: ${req.params.dishId} from DB.`,
          });
        }
      } else {
        res.status(200).json({ status: 200, data });
      }
    });
  };

  static updateById = async (req, res) => {
    if (!req.body) {
      res
        .status(400)
        .json({ status: 400, message: "Updated dish cannot be empty" });
    }
    await Dish.updateById(
      req.params.dishId,
      new Dish(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 404,
              message: `Not found dishes in dishes table with the id:  ${req.params.dishId}.`,
            });
          } else {
            res.status(500).json({
              status: 500,
              message:
                err.message ||
                `Some error occurred while updating dish id: ${req.params.dishId} in DB.`,
            });
          }
        } else {
          res.status(200).json({ status: 200, data });
        }
      }
    );
  };

  static removeById = async (req, res) => {
    await Dish.removeById(req.params.dishId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found dishes in dishes table with the id: ${req.params.dishId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while deleting dish id: ${req.params.dishId} from the DB.`,
          });
        }
      } else {
        res.status(200).json({
          status: 200,
          message: `Dish ${req.params.dishId} was successfully deleted from the DB.`,
        });
      }
    });
  };

  static removeAll = async (req, res) => {
    await Dish.removeAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 404,
            message: `Table dishes is empty.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while pruning DB table dishes.`,
          });
        }
      } else {
        res.status(200).json({
          status: 200,
          message: `Dishes were successfully deleted from the DB.`,
        });
      }
    });
  };
};
