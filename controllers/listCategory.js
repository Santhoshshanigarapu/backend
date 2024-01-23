const Category = require('../models/categorySchema');

exports.listingCategories = async (req, res) => {
    try {
        let categoryList = await Category.find().sort({ createdAt: -1 });

        return res.status(200).send({ categoryList });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}