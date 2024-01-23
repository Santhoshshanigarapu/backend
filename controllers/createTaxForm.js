const Tax = require('../models/taxSchema');
let k = 1
exports.getTaxDetails = async (req, res) => {
    try {
        let tax = new Tax({
            id: k,
            name: req.body.name,
            period: {
                startDate: req.body.period.startDate,
                endDate: req.body.period.endDate,
            },
            percentage: req.body.percentage,
        });
        k++;
        let checkName = await Tax.find({ name: req.body.name });
        if (checkName && checkName.length != 0) {
            let data = {
                message: `${req.body.name} already exists`,
                status: '400'
            }
            return res.status(400).send({ data })
        }
        const taxResponse = await tax.save();

        // let formData = await Tax.find().populate('period');
        // let formData = await Tax.find({ _id: tax._id }).populate('period', 'startDate endDate -_id');

        let data = {
            message: 'Successfully created',
            status: '201',
            data: taxResponse
        }
        return res.status(201).send({ data });
    }

    catch (err) {
        return res.status(400).send({ err });
    }
}