const Table = require("../models/").Table;
const Reserve = require("../models").Reserve;

module.exports = {

  add(req, res) {
    return Table.create({
      table_number: req.body.table_number,
      persons: req.body.persons,
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

  getSortedTables(req, res, date) {
    if(date) {
      module.exports.getTablesByDate(req, res, date);
    }
  },

  getTablesByDate(req, res, date) {
    return Table.findAll({
      include: [
        {
          model: Reserve,
          as: "reserve",
          where: {
            reserve_date: date
          }
        }
      ]
    })
      .then((table) => {
        if(!table) {
          return res.status(404).send({
            message: "No tables found!"
          });
        }
        return res.status(200).send(table);
      })
      .catch((err) => res.status(400).send(error));
  }
}


