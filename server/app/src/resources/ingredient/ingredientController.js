const Ingredient = require("./ingredientModel");
module.exports = class IngredientController {
  static getAll = async (req, res) => {
    await Ingredient.getAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res
            .status(404)
            .send({
              message: `Not found ingredients in ingredient table.`,
            });
        } else {
          res.status(500).json({
            message:
              err.message ||
              "Some error occurred while retrieving ingredient from DB.",
          });
        }
      } else {
        res.status(200).json({data});
      }
    });
  };

  static create = async (req, res) => {
    if (!req.body) {
      res
        .status(400)
        .json({message: "Created ingredient cannot be empty" });
    }
    const ingredient = new Ingredient({
      title: req.body.title,
    });
    await Ingredient.create(ingredient, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            err.message || "Some error occurred while creating ingredient in DB.",
        });
      } else {
        res.status(201).json({ data });
      }
    });
  };

  static findById = async (req, res) => {
    await Ingredient.findById(req.params.ingredientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ingredient in ingredient table with the id: ${req.params.ingredientId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while retrieving ingredient id: ${req.params.ingredientId} from DB.`,
          });
        }
      } else {
        res.status(200).json({ data });
      }
    });
  };

  static updateById = async (req, res) => {
    if (!req.body) {
      res
        .status(400)
        .json({message: "Updated ingredient cannot be empty" });
    }
    await Ingredient.updateById(
      req.params.ingredientId,
      new Ingredient(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found ingredient in ingredient table with the id:  ${req.params.ingredientId}.`,
            });
          } else {
            res.status(500).json({
              message:
                err.message ||
                `Some error occurred while updating ingredient id: ${req.params.ingredientId} in DB.`,
            });
          }
        } else {
          res.status(200).json({ data });
        }
      }
    );
  };

  static removeById = async (req, res) => {
    await Ingredient.removeById(req.params.ingredientId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ingredient in ingredient table with the id: ${req.params.ingredientId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while deleting ingredient id: ${req.params.ingredientId} from the DB.`,
          });
        }
      } else {
        res.status(200).json({
          message: `Ingredient ${req.params.ingredientId} was successfully deleted from the DB.`,
        });
      }
    });
  };

  static removeAll = async (req, res) => {
    await Ingredient.removeAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Table ingredient is empty.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while pruning DB table ingredient.`,
          });
        }
      } else {
        res.status(200).json({
          message: `Ingredientes were successfully deleted from the DB.`,
        });
      }
    });
  };
};
