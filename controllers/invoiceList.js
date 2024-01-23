const Invoice = require('../models/invoiceSchema');

exports.displayAllInvoices = async (req, res) => {
    try {
        let invoiceList = await Invoice.find().sort({ createdAt: -1 });
        let data = {
            message: 'Successfully created',
            status: '200',
            data: invoiceList
        }
        return res.status(200).send(data);
    }

    catch (err) {
        return res.status(400).send(err.message);
    }
}