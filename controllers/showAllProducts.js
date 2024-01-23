const Product = require("../models/productSchema");

exports.displayAllProducts = async (req, res) => {
    try {
        let allProducts = await Product.find().sort({ createdAt: -1 });
        return res.status(200).send({ allProducts });
    }
    catch (err) {
        return res.status(400).send(err);
    }
}