const Dish = require("../models").Dish;
const Ingredient = require("../models").Ingredient;
const DishPhoto = require("../models").DishPhoto;
const Category = require("../models").Category;
const Order = require("../models").Order;

module.exports = {
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
      .then((classrooms) => res.status(200).send(classrooms))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  listSelected(req, res) {
    const idList = req.params.list.split(",");
    return Dish.findAll({
      where: { id: idList },
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
      .then((classrooms) => res.status(200).send(classrooms))
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
            res.status(204).send(`Dish with id ${req.params.id} was deleted`)
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
          message: "Course Not Found",
        });
      }
      await dish
        .setIngredient(ingredient, { through: { is_default: canChange } })
        .then(() => {
          return res.status(200).send({ message: `Ingredient ${ingredient.title} was added to ${dish.title}` });
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
      await dish.setCategory(category).then(() => {
        return res.status(200).send(dish);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
