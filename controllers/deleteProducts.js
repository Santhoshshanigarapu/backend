const Product = require('../models/productSchema');

exports.deleteProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedProduct = await Product.deleteMany({ id });
        let data = {
            message: "Product deleted",
            status: '200',
        }
        return res.status(200).send({ data });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}