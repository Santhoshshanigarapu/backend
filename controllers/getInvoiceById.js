const Invoice = require('../models/invoiceSchema');

exports.invoiceDetailsById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await Invoice.find({ orderId });
        if (result.length === 0) {
            return res.status(404).json({
                message: "No invoice found",
                status: "404"
            });
        }
        const data = {
            message: "success",
            status: '200',
            invoice: result
        }
        return res.status(200).json(data);

    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}

