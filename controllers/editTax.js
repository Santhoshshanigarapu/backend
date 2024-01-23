const Tax = require('../models/taxSchema');
const upload = require('../middlewares/upload');

exports.taxEdit = async (req, res) => {
    try {
        let _id = req.params._id;
        // Parse the form data and files using multer middleware
        upload.none()(req, res, async (err) => {
            if (err) {
                return res.status(400).send(err);
            }
            try {
                const { name, period, percentage } = req.body;
                const updatedRecord = await Tax.findByIdAndUpdate(
                    _id,
                    { $set: { name, period, percentage } },
                    { new: true }
                );

                let data = {
                    message: "Tax form edited successfully",
                    status: '200',
                    edited: updatedRecord
                };

                return res.status(200).send(data);
            } catch (err) {
                return res.status(400).send(err);
            }
        });
    } catch (err) {
        return res.status(400).send(err);
    }
};
