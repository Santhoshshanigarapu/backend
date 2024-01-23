const Period = require('../models/periodSchema');

exports.getDateDetails = async (req, res) => {
    try {
        let period = new Period({
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        let data = await period.save();
        return res.status(201).send(data);
    }

    catch (err) {
        return res.status(400).send({ err });
    }
}