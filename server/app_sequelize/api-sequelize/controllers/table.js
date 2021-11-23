const Table = require("../models/").Table;
const Reserve = require("../models/").Reserve;
module.exports = {
  add(req, res) {
    return Table.create({
      table_number: req.body.table_number,
      persons: req.body.persons,
      is_available: req.body.is_available,
    })
      .then((table) => res.status(201).send(table))
      .catch((error) => res.status(400).send(error));
  },

  async getTables(req, res) {
    return Table.findAll({
      include: [
        {
          model: Reserve,
          as: "reserve",
        },
      ],
    })
      .then((table) => res.status(200).send(table))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getSortedTables(req, res) {
    if (req.params.date) {
      module.exports.getTablesByDate(req, res, req.params.date);
    }
  },

  getTablesByDate(req, res, date) {
    return Table.findAll({
      include: [
        {
          model: Reserve,
          as: "reserve",
          where: {
            reserve_date: date,
          },
        },
      ],
    })
      .then((table) => {
        if (!table) {
          return res.status(404).send({
            message: "No tables found!",
          });
        }
        return res.status(200).send(table);
      })
      .catch((err) => res.status(400).send(error));
  },

  update(req, res) {
    return Table.findByPk(req.params.id, {
      include: [
        {
          model: Reserve,
          as: "reserve",
        },
      ],
    })
      .then((table) => {
        if (!table) {
          return res.status(400).send({
            message: "Table Not Found",
          });
        }
        if (table.reserve.length) {
          if (req.params.hard !== "update") {
            const timeStamp = new Date();
            const reservedOn = table.reserve.filter((r) => {
              let dateReserved = new Date(
                r.reserve_date + " " + r.reserve_start_time
              );
              dateReserved = new Date(
                dateReserved.setHours(dateReserved.getHours() + 3)
              );
              if (timeStamp < dateReserved) {
                return dateReserved;
              }
            });
            if (reservedOn.length) {
              return res.status(200).send({
                reservations: reservedOn,
              });
            }
          }
        }
        return table
          .update(req.body)
          .then(() =>
            res
              .status(200)
              .send(`Table with id ${req.params.id} was updated successfully`)
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Table.findByPk(req.params.id, {
      include: [
        {
          model: Reserve,
          as: "reserve",
        },
      ],
    })
      .then((table) => {
        if (!table) {
          return res.status(400).send({
            message: "Table Not Found",
          });
        }
        if (table.reserve.length) {
          if (req.params.hard !== "delete") {
            const timeStamp = new Date();
            const reservedOn = table.reserve.filter((r) => {
              let dateReserved = new Date(
                r.reserve_date + " " + r.reserve_start_time
              );
              dateReserved = new Date(
                dateReserved.setHours(dateReserved.getHours() + 3)
              );
              if (timeStamp < dateReserved) {
                return dateReserved;
              }
            });
            if (reservedOn.length) {
              return res.status(200).send({
                reservations: reservedOn,
              });
            }
          }
        }
        return table
          .destroy()
          .then(() =>
            res.status(200).send(`Table with id ${req.params.id} was deleted`)
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
