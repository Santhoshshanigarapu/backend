const Customer = require('../models/custmoreDetailsSchema');

exports.deleteCustomerDetails = async (req, res) => {

    try {
        let { itemIds } = req.body;
        const deleted = await Customer.deleteMany({ id: { $in: itemIds } });
        let data = {
            message: `${deleted.deletedCount} items deleted`,
            status: '200',
        }
        return res.status(200).json({ data });

    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}