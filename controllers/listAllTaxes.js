const Tax = require('../models/taxSchema');

exports.getAllTaxDisplay = async (req, res) => {
    try {
        // let formData = await Tax.find().populate('period', 'startDate endDate -_id');
        let formData = await Tax.find().sort({ createdAt: -1 });

        let data = {
            message: 'Successfully created',
            status: '200',
            data: formData
        }
        return res.status(200).send({ data });
    }

    catch (err) {
        return res.status(400).send({ err });
    }
}