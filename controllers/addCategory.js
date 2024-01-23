const Category = require('../models/categorySchema');

exports.addingCategories = async (req, res) => {
    try {
        let k;
        let list = await Category.find();
        if (list.length === 0) {
            k = 1;
            let category = new Category({
                name: req.body.name,
                id: k++,
            });
            await category.save();
            let data = {
                message: "Category added successfully",
                status: '200',
                category: category
            }
            return res.status(200).json({ data });
        }
        k = list[list.length - 1].id;
        let categoryName = req.body.name.toLowerCase();

        let category = new Category({
            name: req.body.name,
            id: ++k,
        })
        for (let i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase() === categoryName) {
                let data = {
                    message: "Category already exists",
                    status: '400'
                }
                return res.status(400).send({ data })
            }
        }
        await category.save();
        let data = {
            message: "Category added successfully",
            status: '200',
            category: category
        }
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(400).send(err);
    }
}