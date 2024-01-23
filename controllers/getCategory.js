const Product = require("../models/productSchema");
const Category = require('../models/categorySchema');
exports.gettingCategories = async (req, res) => {
  try {

    let k = 1;
    let categoryList = [];
    const distinctCategory = await Product.distinct('category');
    await Category.deleteMany();

    for (let i = 0; i < distinctCategory.length; i++) {
      let category = new Category({
        name: distinctCategory[i],
        id: k
      })
      categoryList.push(category);
      k++;
      await category.save();
    }
    return res.status(200).json({ categoryList });
  }
  catch (err) {
    return res.status(400).send({ err });
  }
}