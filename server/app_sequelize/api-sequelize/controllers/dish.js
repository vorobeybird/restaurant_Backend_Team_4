const Dish = require("../models").Dish;
const Ingredient = require("../models").Ingredient;
const DishPhoto = require("../models").DishPhoto;
const Category = require("../models").Category;

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

//   getById(req, res) {
//     return Classroom.findByPk(req.params.id, {
//       include: [
//         {
//           model: Student,
//           as: "students",
//         },
//       ],
//     })
//       .then((classroom) => {
//         if (!classroom) {
//           return res.status(404).send({
//             message: "Classroom Not Found",
//           });
//         }
//         return res.status(200).send(classroom);
//       })
//       .catch((error) => {
//         console.log(error);
//         res.status(400).send(error);
//       });
//   },

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

//   update(req, res) {
//     return Classroom.findByPk(req.params.id, {
//       include: [
//         {
//           model: Student,
//           as: "students",
//         },
//       ],
//     })
//       .then((classroom) => {
//         if (!classroom) {
//           return res.status(404).send({
//             message: "Classroom Not Found",
//           });
//         }
//         return classroom
//           .update({
//             class_name: req.body.class_name || classroom.class_name,
//           })
//           .then(() => res.status(200).send(classroom))
//           .catch((error) => res.status(400).send(error));
//       })
//       .catch((error) => res.status(400).send(error));
//   },

//   delete(req, res) {
//     return Classroom.findByPk(req.params.id)
//       .then((classroom) => {
//         if (!classroom) {
//           return res.status(400).send({
//             message: "Classroom Not Found",
//           });
//         }
//         return classroom
//           .destroy()
//           .then(() => res.status(204).send())
//           .catch((error) => res.status(400).send(error));
//       })
//       .catch((error) => res.status(400).send(error));
//   },
};
