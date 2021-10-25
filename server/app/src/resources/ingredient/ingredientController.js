const Ingredient = require("./ingredientModel");
module.exports = class IngredientController {
  static getAll = async (req, res) => {
    await Ingredient.getAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Ingredients not found.`,
          });
        } else {
          res.status(500).json({
            message: err.message || "Error occured during getting ingredient.",
          });
        }
      } else {
        res.status(200).json({ data });
      }
    });
  };

  static create = async (req, res) => {
    if (!req.body) {
      res.status(400).json({ message: "Ingredient cannot be empty" });
    }
    const ingredient = new Ingredient({
      title: req.body.title,
    });
    await Ingredient.create(ingredient, (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message || "Error occured during creating ingredient.",
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
            message: `Not found ingredient id: ${req.params.ingredientId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Error occured during retrieving ingredient id: ${req.params.ingredientId}.`,
          });
        }
      } else {
        res.status(200).json({ data });
      }
    });
  };

  static updateById = async (req, res) => {
    if (!req.body) {
      res.status(400).json({ message: "Updated ingredient cannot be empty" });
    }
    await Ingredient.updateById(
      req.params.ingredientId,
      new Ingredient(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Ingredient not found id:  ${req.params.ingredientId}.`,
            });
          } else {
            res.status(500).json({
              message:
                err.message ||
                `Error occured during updating ingredient id: ${req.params.ingredientId} in DB.`,
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
            message: `Ingredient not found id: ${req.params.ingredientId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Error occured during deleting ingredient id: ${req.params.ingredientId}`,
          });
        }
      } else {
        res.status(200).json({
          message: `Ingredient ${req.params.ingredientId} successfully deleted.`,
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
              `Error occured during getting pruning DB table ingredient.`,
          });
        }
      } else {
        res.status(200).json({
          message: `Ingredientes were deleted.`,
        });
      }
    });
  };
};
