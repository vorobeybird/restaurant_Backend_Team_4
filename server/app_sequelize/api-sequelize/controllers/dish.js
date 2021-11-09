const Dish = require("../models").Dish;
const Ingredient = require("../models").Ingredient;
const DishPhoto = require("../models").DishPhoto;
const Category = require("../models").Category;
const Order = require("../models").Order;
const { Op } = require("sequelize");

module.exports = {
  showDishes(req, res) {
    const { ids, category, filter } = req.query;
    if (ids) {
      module.exports.listSelected(req, res, ids);
    } else if (filter) {
      module.exports.filterByTitle(req, res, filter);
    } else if (category) {
      module.exports.getByCategory(req, res, category);
    } else {
      module.exports.list(req, res);
    }
  },

  filterByTitle(req, res, title) {
    return Dish.findAll({
      where: {
        title: { [Op.like]: `${title}%` },
      },

      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: DishPhoto,
          as: "photo",
        },
        {
          model: Ingredient,
          as: "ingredient",
        },
      ],
    })
      .then((dishes) => res.status(200).send(dishes))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  list(req, res) {
    return Dish.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: DishPhoto,
          as: "photo",
        },
        {
          model: Ingredient,
          as: "ingredient",
        },
      ],
    })
      .then((dishes) => res.status(200).send(dishes))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  listSelected(req, res, sorted) {
    return Dish.findAll({
      where: { id: sorted.split(",") },
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: DishPhoto,
          as: "photo",
        },
        {
          model: Ingredient,
          as: "ingredient",
        },
      ],
    })
      .then((dishes) => res.status(200).send(dishes))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Dish.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: DishPhoto,
          as: "photo",
        },
        {
          model: Ingredient,
          as: "ingredient",
        },
      ],
    })
      .then((dish) => {
        if (!dish) {
          return res.status(404).send({
            message: "dish Not Found",
          });
        }
        return res.status(200).send(dish);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  async getByCategory(req, res, category) {
    return Dish.findAll({
      include: [
        {
          model: Category,
          as: "category",
          where: {
            id: category,
          },
        },
        {
          model: DishPhoto,
          as: "photo",
        },
        {
          model: Ingredient,
          as: "ingredient",
        },
      ],
    })
      .then((dish) => {
        if (!dish) {
          return res.status(404).send({
            message: "dish Not Found",
          });
        }
        return res.status(200).send(dish);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return Dish.create({
      title: req.body.title,
      price: req.body.price,
      weight: req.body.weight,
      calories: req.body.calories,
    })
      .then((classroom) => res.status(201).send(classroom))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    try {
      const result = await Dish.update(req.body, {
        where: { id: req.params.id },
      });
      console.log(req.body);
      res.status(201).send("Dish was updated succesfully");
    } catch (err) {
      res.status(400).send(error);
    }
  },

  delete(req, res) {
    return Dish.findByPk(req.params.id)
      .then((dish) => {
        if (!dish) {
          return res.status(400).send({
            message: `Dish Not Found dish with id ${req.params.id}`,
          });
        }
        return dish
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ message: `Dish with id ${req.params.id} was deleted` })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  async addIngredient(req, res) {
    const dishID = req.body.dishID,
      ingredientID = req.body.ingredientID,
      canChange = req.body.is_default;
    try {
      const dish = await Dish.findOne({
        where: { id: dishID },
        include: "ingredient",
      });
      if (!dish) {
        return res.status(404).send({
          message: "dish Not Found",
        });
      }
      const ingredient = await Ingredient.findOne({
        where: { id: ingredientID },
      });
      if (!ingredient) {
        return res.status(404).send({
          message: "Ingredient Not Found",
        });
      }
      await dish
        .addIngredient(ingredient, { through: { is_default: canChange } })
        .then(() => {
          return res.status(200).send({
            message: `Ingredient ${ingredient.title} was added to ${dish.title}`,
          });
        });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  async haveOrder(dishId) {
    const dish = await Dish.findByPk(dishId, {
      include: [{ model: Order, as: "order", attributes: ["status"] }],
    });
    return dish.order.length;
  },
  async deleteIngredient(req, res) {
    const dishID = req.body.dishID,
      ingredientID = req.body.ingredientID,
      canChange = req.body.is_default;
    orderStatus = await module.exports.haveOrder(dishID);
    if (orderStatus) {
      return res.status(400).send({
        message: "This ingredient is used in active order",
      });
    }
    try {
      const dish = await Dish.findOne({
        where: { id: dishID },
        include: "ingredient",
      });
      if (!dish) {
        return res.status(404).send({
          message: "dish Not Found",
        });
      }
      const ingredient = await Ingredient.findOne({
        where: { id: ingredientID },
      });
      if (!ingredient) {
        return res.status(404).send({
          message: "Ingredient Not Found",
        });
      }
      await dish.removeIngredient(ingredient).then(() => {
        return res.status(200).send({
          message: `Ingredient ${ingredient.title} was removed from ${dish.title}`,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async addCategory(req, res) {
    try {
      const dish = await Dish.findOne({
        where: { id: req.body.dishID },
        include: "ingredient",
      });
      if (!dish) {
        return res.status(404).send({
          message: "dish Not Found",
        });
      }
      const category = await Category.findOne({
        where: { id: req.body.categoryID },
      });
      if (!category) {
        return res.status(404).send({
          message: "Category Not Found",
        });
      }
      await dish.addCategory(category).then(() => {
        return res.status(200).send(dish);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async addBigDish(req, res) {
    const categories = req.body.category,
      ingredients = req.body.ingredient;
    try {
      const dish = await Dish.create(
        {
          title: req.body.title,
          price: req.body.price,
          weight: req.body.weight,
          calories: req.body.calories,
          photo: req.body.photo,
        },
        {
          include: [
            {
              model: DishPhoto,
              as: "photo",
            },
          ],
        }
      );

      for (const elem of categories) {
        const category = await Category.findByPk(elem.id);
        await dish.addCategory(category);
      }
      for (const elem of ingredients) {
        const ingredient = await Ingredient.findByPk(elem.id);
        await dish.addIngredient(ingredient, {
          through: { is_default: elem.is_default },
        });
      }
      await res.status(200).send(dish);
    } catch (error) {
      console.log(error);
    }
  },
};
