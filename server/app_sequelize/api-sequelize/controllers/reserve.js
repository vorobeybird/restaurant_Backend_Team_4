const Reserve = require("../models/").Reserve;
const Table = require("../models/").Table;
const Order = require("../models/").Order;
const Dish = require("../models/").Dish;
const { Op, literal } = require("sequelize");

const parseDateToUTC = (date) => {
  const parsed = new Date(date);
  return new Date(parsed.toUTCString());
};

module.exports = {
  async add(req, res) {
    const reserveDate = parseDateToUTC(req.body.reserve_date);
    const startTime = parseDateToUTC(req.body.reserve_time);
    const endTime = parseDateToUTC(startTime);
    endTime.setUTCHours(Math.min(23, startTime.getUTCHours() + 3));
    endTime.setUTCMinutes(endTime.getUTCMinutes() + 59);

    const tables = await module.exports.getTables(
      startTime,
      endTime,
      req.body.num_of_persons,
      reserveDate
      //13.00
    );
    if (!tables.length) {
      res.status(400).send({ message: "No tables found!" });
      return;
    }
    const reserve = await Reserve.create({
      reserve_date: reserveDate,
      reserve_start_time: startTime,
      reserve_end_time: endTime,
      table_id: tables[0].id,
    });
    try {
      const order = await Order.create({
        customer_id: req.body.customer_id,
        delivery_method: req.body.delivery_method,
        total_price: req.body.total_price,
        delivery_date: req.body.delivery_date,
        contact_name: req.body.contact_name,
        contact_phone: req.body.contact_phone,
        payment_method: req.body.payment_method,
        adress: req.body.adress,
        status: req.body.status,
        comment: req.body.comment,
        reserve_id: reserve.id,
      });
      const dish = req.body.dish;
      for (const elem of dish) {
        const dish_item = await Dish.findByPk(elem.dish_id);
        await order.addDish(dish_item, {
          through: {
            quantity: elem.dish_amount,
            excluded_ingredients: elem.excluded_ingredients,
          },
        });
      }
      res.status(200).send(tables[0]);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  async getTables(startTime, endTime, persons, reserveDate) {
    return await Table.findAll({
      include: [
        {
          model: Reserve,
          as: "reserve",
          attributes: ["id"],
          required: false,
          where: {
            reserve_date: reserveDate,
            [Op.or]: [
              {
                reserve_start_time: {
                  [Op.between]: [startTime, endTime],
                },
              },
              {
                reserve_end_time: {
                  [Op.between]: [startTime, endTime],
                },
              },
            ],
          },
        },
      ],
      where: {
        is_available: true,
        persons: {
          [Op.gte]: persons,
        },
        [Op.where]: literal("reserve.id IS NULL"),
      },
      order: ["persons"],
    });
  },
};
