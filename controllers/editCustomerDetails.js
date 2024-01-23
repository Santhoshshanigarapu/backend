const upload = require('../middlewares/upload');
const Customer = require('../models/custmoreDetailsSchema');

exports.editCustomerDetails = async (req, res) => {

    try {
        let id = req.params.id;
        upload.none()(req, res, async (err) => {
            if (err) {
                return res.status(400).send(err);
            }
            try {
                let { name, mobile_no } = req.body;

                let updatedDetails = await Customer.updateOne({ id: id }, { $set: { name, mobile_no } }, { new: true });
                let data = {
                    message: "Customer details edited successfully",
                    status: '200',
                    customerDetails: updatedDetails
                }
                return res.status(200).send({ data });
            }
            catch (err) {
                return res.status(400).send(err);
            }
        });
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err.message);
    }
}