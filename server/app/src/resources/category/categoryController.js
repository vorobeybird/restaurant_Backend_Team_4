const Category = require("./categoryModel");
module.exports = class CategoryController {
  static getAll = async (req, res) => {
    await Category.getAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res
            .status(404)
            .send({
              message: `Not found categorys in category table.`,
            });
        } else {
          res.status(500).json({
            message:
              err.message ||
              "Some error occurred while retrieving category from DB.",
          });
        }
      } else {
        res.status(200).json({data });
      }
    });
  };

  static create = async (req, res) => {
    if (!req.body) {
      res
        .json({ status: 400, message: "Created category cannot be empty" });
    }
    const category = new Category({
      title: req.body.title,
      showInMain: req.body.showInMain,
    });
    await Category.create(category, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            err.message || "Some error occurred while creating category in DB.",
        });
      } else {
        res.status(201).json({data });
      }
    });
  };

  static findById = async (req, res) => {
    await Category.findById(req.params.categoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found category in category table with the id: ${req.params.categoryId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while retrieving category id: ${req.params.categoryId} from DB.`,
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
        .json({message: "Updated category cannot be empty" });
    }
    await Category.updateById(
      req.params.categoryId,
      new Category(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found category in category table with the id:  ${req.params.categoryId}.`,
            });
          } else {
            res.status(500).json({
              message:
                err.message ||
                `Some error occurred while updating category id: ${req.params.categoryId} in DB.`,
            });
          }
        } else {
          res.status(200).json({data });
        }
      }
    );
  };

  static removeById = async (req, res) => {
    await Category.removeById(req.params.categoryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found category in category table with the id: ${req.params.categoryId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while deleting category id: ${req.params.categoryId} from the DB.`,
          });
        }
      } else {
        res.status(200).json({
          message: `Category ${req.params.categoryId} was successfully deleted from the DB.`,
        });
      }
    });
  };

  static removeAll = async (req, res) => {
    await Category.removeAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Table category is empty.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Some error occurred while pruning DB table category.`,
          });
        }
      } else {
        res.status(200).json({
          message: `Categoryes were successfully deleted from the DB.`,
        });
      }
    });
  };
};