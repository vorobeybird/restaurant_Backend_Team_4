const Dish = require("../models").Dish;
const Category = require("../models").Category;

module.exports = {

  list(req, res) {
    const data = {};
    return Category.findAll({
      include: [
        {
          model: Dish,
          as: "dish",
        },
      ],
    })
      .then((categories) => res.status(200).send(categories))
      .catch((error) => {
        res.status(400).send(error);
      });
  },
  
  listAllIncluded(req, res) {
    return Category.findAll({
      include: [
        {
          all: true
        },
      ],
    })
      .then((categories) => res.status(200).send(categories))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Category.findByPk(req.params.id, {
      include: [
        {
          model: Dish,
          as: "dish",
        },
      ],
    })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "category Not Found",
          });
        }
        return res.status(200).send(category);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  getByTitle(req, res) {
    return Category.findOne({
      where: { title: req.params.title },
      include: [
        {
          model: Dish,
          as: "dish",
        },
      ],
    })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "category Not Found",
          });
        }
        return res.status(200).send(category);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  add(req, res) {
    return Category.create({
      title: req.body.title,
      show_in_menu: req.body.show_in_menu,
    })
      .then((category) => res.status(201).send(category))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    try {
      const result = await Category.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).send({ message: "Category was updated succesfully" });
    } catch (err) {
      res.status(400).send(error);
    }
  },

  delete(req, res) {
    return Category.findByPk(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(400).send({
            message: "Category Not Found",
          });
        }
        return category
          .destroy()
          .then(() =>
            res
              .status(200)
              .send(`Category with id ${req.params.id} was deleted`)
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
