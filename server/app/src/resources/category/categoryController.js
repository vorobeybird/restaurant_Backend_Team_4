const Category = require("./categoryModel");
module.exports = class CategoryController {
  static getAll = async (req, res) => {
    await Category.getAll((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res
            .status(404)
            .send({
              message: `Category not found.`,
            });
        } else {
          res.status(500).json({
            message:
              err.message ||
              "Error during getting category.",
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
        .json({message: "Category cannot be empty" });
    }
    const category = new Category({
      title: req.body.title,
      showInMain: req.body.showInMain,
    });
    await Category.create(category, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            err.message || "Error occured during getting category.",
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
            message: `No such category id: ${req.params.categoryId}.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Error occured during getting category id: ${req.params.categoryId}`,
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
        .json({message: "Category cannot be empty" });
    }
    await Category.updateById(
      req.params.categoryId,
      new Category(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found category id:  ${req.params.categoryId}.`,
            });
          } else {
            res.status(500).json({
              message:
                err.message ||
                `Error occurred during updating category id: ${req.params.categoryId}`,
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
            message: `Category not found.`,
          });
        } else {
          res.status(500).json({
            message:
              err.message ||
              `Error occurred while deleting category id: ${req.params.categoryId}`,
          });
        }
      } else {
        res.status(200).json({
          message: `Category ${req.params.categoryId} was deleted `,
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
              `Error occurred during pruning category.`,
          });
        }
      } else {
        res.status(200).json({
          message: `Category wes deleted from the DB.`,
        });
      }
    });
  };
};