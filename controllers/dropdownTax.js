const Tax = require('../models/taxSchema');

exports.getTaxList = async (req, res) => {
    try {
        let taxList = await Tax.find().select('id').select('name').select('percentage');
        return res.status(200).json({ taxList });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}