const Product = require('../models/productSchema');

exports.deleteMultipleProducts = async (req, res) => {
    const { itemIds } = req.body; // Array of item IDs to delete
    try {

        const result = await Product.deleteMany({ _id: { $in: itemIds } });
        let data = {
            message: `${result.deletedCount} items deleted`,
            status: '200',
        }
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(400).json({ err });
    }
};
