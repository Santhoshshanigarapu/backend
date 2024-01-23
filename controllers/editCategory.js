const Category = require('../models/categorySchema');

exports.editCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const { name, status } = req.body;
        let editedCategory = await Category.updateOne({ id }, { $set: { name} });
        if (editedCategory.matchedCount === 1) {
            let data = {
                message: "Category edited successfully",
                status: '200',
                edited: editedCategory
            }
            return res.status(200).send(data);
        }
        return res.status(404).json({
            message: "Category not found",
            status: "404"
        })
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}