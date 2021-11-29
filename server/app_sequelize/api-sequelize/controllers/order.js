const Order = require("../models").Order;
const Dish = require("../models").Dish;
const OrderDish = require("../models").OrderDish;
const db = require("../models/index");
const { QueryTypes } = require("sequelize");

module.exports = {
  list(req, res) {
    return Order.findAll({
      include: [
        {
          model: OrderDish,
          include: [
            {
              model: Dish,
            },
          ],
        },
      ],
    })
      .then((order) => res.status(200).send(order))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderDish,
          include: [
            {
              model: Dish,
            },
          ],
        },
      ],
    })
      .then((order) => {
        if (!order) {
          return res.status(404).send({
            message: "order Not Found",
          });
        }
        return res.status(200).send(order);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  getByCustmerId(req, res) {
    return Order.findAll({
      include: [
        {
          model: OrderDish,
          include: [
            {
              model: Dish,
            },
          ],
        },
      ],
      where: {
        customer_id: req.params.customerId,
      },
    })
      .then((orders) => {
        if (!orders) {
          return res.status(404).send({
            message: "Orders Not Found",
          });
        }
        return res.status(200).send(orders);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  async add(req, res) {
    const dish = req.body.dish;
    try {
      const date = req.body.delivery_date;
      const order = await Order.create({
        customer_id: req.body.customer_id,
        delivery_method: req.body.delivery_method,
        total_price: req.body.total_price,
        delivery_date: date,
        contact_name: req.body.contact_name,
        contact_phone: req.body.contact_phone,
        payment_method: req.body.payment_method,
        adress: req.body.adress,
        status: req.body.status,
        comment: req.body.comment,
      });
      for (let elem of dish) {
        await db.sequelize.query(
          "INSERT INTO `OrderDish` (`id`, `DishId`, `OrderId`, `quantity`, `excluded_ingredients`) VALUES (DEFAULT, ?, ?, ?, ? )",
          {
            replacements: [
              elem.dish_id,
              order.id,
              elem.dish_amount,
              elem.excluded_ingredients,
            ],
            type: QueryTypes.INSERT,
          }
        );
      }
      res.status(200).send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async update(req, res) {
    try {
      const result = await Order.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).send("Order was updated succesfully");
    } catch (err) {
      res.status(400).send(error);
    }
  },

  delete(req, res) {
    return Order.findByPk(req.params.id)
      .then((order) => {
        if (!order) {
          return res.status(400).send({
            message: `Order Not Found order with id ${req.params.id}`,
          });
        }
        return order
          .destroy()
          .then(() =>
            res.status(200).send(`Order with id ${req.params.id} was deleted`)
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
