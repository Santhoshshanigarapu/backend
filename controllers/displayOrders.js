const Order = require('../models/orderSchema');

exports.displayAllOrders = async (req, res) => {
    try {
        let result = await Order.find().sort({ createdAt: -1 });
        await Order.updateMany({}, { $set: { createdAt: new Date() } });
        let data = {
            message: 'Success',
            status: '200',
            data: result
        }
        return res.status(200).send({ data });
    }

    catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message );
    }
}