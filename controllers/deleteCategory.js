const Category = require('../models/categorySchema');

exports.deleteCategories = async (req, res) => {
    const id = req.params.id;
    try {
        let updatedCategory = await Category.updateOne({ id }, { $set: { status: "BLOCK" } });
        if (updatedCategory.matchedCount === 1) {
            let data = {
                message: `Category blocked`,
                status: '200',
                categoryStatus: "BLOCK"
            }
            return res.status(200).send(data);
        }
        return res.status(404).json({
            message: "Category not found",
            status: "404"
        })
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}