const Reserve = require("../models/").Reserve;
const checkReservation = (reserve_date, num_of_persons, reserve_time) => {
    const { count, rows } = await Reserve.findAndCountAll({
        include: [{
            model: Table,
            required: true,
            where: { persons: num_of_persons }
        }],

        attributes: [
            [sequelize.fn('COUNT', sequelize.col('*')), 'num_of_reservations']
        ],

        where: {
            reserve_date: reserve_date,
            reserve_time: {
                [Op.between]: [reserve_time, reserve_time.addHours(2)]
            }
        }
    });
    return count === 0;
}


module.exports = {
    async add(req, res) {
        
        if(!checkReservation(req.body.reserve_date, req.body.num_of_persons, req.body.reserve_time)) {
            res.status(400).send(error);
        }
       const reserve = await Reserve.create({
        reserve_date = req.body.reserve_date,
        reserve_time = req.body.reserve_time,

       })
        
        const order = await Order.create({
            customer_id: req.body.customer_id,
            contact_name: req.body.contact_name,
            contact_phone: req.body.contact_phone,
            payment_method: req.body.payment_method,
            adress: req.body.adress,
            status: req.body.status,
            comment: req.body.comment,
        });
        
        return
    }
}