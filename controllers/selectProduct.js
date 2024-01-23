const Product = require('../models/productSchema');

exports.selectProductField = async (req, res) => {
    try {
        let arr = [];
        let productList = await Product.find();
        for (let i = 0; i < productList.length; i++) {
            if (productList[i].quantity != 0) {
                arr.push({
                    id: productList[i].id,
                    name: productList[i].productName,
                    price: productList[i].price,
                    quantity: productList[i].quantity
                });
            }
        }
        let data = {
            message: 'success',
            status: '200',
            lists: arr
        }
        return res.status(200).send({ data });
    }

    catch (err) {
        return res.status(400).send({ err });
    }
}