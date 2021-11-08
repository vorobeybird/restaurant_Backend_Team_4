const Dish = require("../models").Dish;
const Ingredient = require("../models").Ingredient;

module.exports = {
  list(req, res) {
    return Ingredient.findAll({})
      .then((classrooms) => res.status(200).send(classrooms))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Ingredient.findByPk(req.params.id, {
      include: [
        {
          model: Dish,
          as: "dish",
        },
      ],
    })
      .then((Ingredient) => {
        if (!Ingredient) {
          return res.status(404).send({
            message: "Ingredient Not Found",
          });
        }
        return res.status(200).send(Ingredient);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return Ingredient.create({
      title: req.body.title,
    })
      .then((ingredient) => res.status(201).send(ingredient))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    try {
      const result = await Ingredient.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).send("Ingredient was updated succesfully");
    } catch (err) {
      res.status(400).send(error);
    }
  },

  delete(req, res) {
    return Ingredient.findByPk(req.params.id, {
      include: [
        {
          model: Dish,
          as: "dish",
        },
      ],
    })
      .then((ingredient) => {
        if (!ingredient) {
          return res.status(400).send({
            message: "Ingredient Not Found",
          });
        }
        if (ingredient.dish.length) {
          if (req.params.hard !== "delete") {
            const inDishes = ingredient.dish.map((d) => d.id);
            return res.status(200).send({
              dishes: inDishes,
            });
          }
        }
        return ingredient
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ result: `Ingredient ${req.params.id} was deleted` })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
