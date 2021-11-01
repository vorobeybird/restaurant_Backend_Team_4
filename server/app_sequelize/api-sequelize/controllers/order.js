const Order = require("../models").Order;
const Dish = require("../models").Dish;

module.exports = {
  list(req, res) {
    return Order.findAll({
      include: [
        {
          model: Dish,
          as: "dish",
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
          model: Dish,
          as: "dish",
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

  async add(req, res) {
    const dish = req.body.dish;
    try {
      const date = req.body.delivery_date;
    //   const date = new Date(req.body.delivery_date)
      const order = await Order.create({
        customer_id: req.body.customer_id,
        delivery_method: req.body.delivery_method,
        total_price: req.body.total_price,
        delivery_date: date,
        contact_info: req.body.contact_info,
        payment_method: req.body.payment_method,
        adress: req.body.adress,
        status: req.body.status,
        comment: req.body.comment,
      });
      for (const elem of dish){
        const dish_item =  await Dish.findByPk(elem.dish_id);
        await order.addDish(dish_item,{through: { quantity: elem.dish_amount }})
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
      res.status(201).send("Order was updated succesfully");
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
            res.status(204).send(`Order with id ${req.params.id} was deleted`)
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
