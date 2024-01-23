const Product = require("../models/productSchema");

exports.inventoryStatus = async (req, res) => {
    try {
        const enumValues = Product.schema.path('inventoryStatus').enumValues;
        let data = {
            status: '200',
            inventoryStatus: enumValues
        }
        return res.status(200).json({ data });
    }
    catch (error) {

        return res.status(500).json({ error });
    }
}