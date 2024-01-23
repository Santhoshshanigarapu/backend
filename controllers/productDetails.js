const Product = require('../models/productSchema');
const path = require('path');

var count;
exports.addProductsList = async (req, res) => {
    try {
        let inventoryStatus;
        let result = await Product.find();
        const quantity = req.body.quantity;
        if(quantity>=1 && quantity <=15){
            inventoryStatus = "LOWSTOCK"
         }
         if(quantity>15)
         {
             inventoryStatus = "INSTOCK"
         }
         if(quantity<=0)
         {
             inventoryStatus = "OUTOFSTOCK"

         }
        if (result.length == 0) {
            count = 1000;
        }
        else {
            let updateCount = result[result.length - 1].id;
            count = updateCount + 1;
        }
        let productList = new Product({
            id: count,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productCode: req.body.productCode,
            price: req.body.price,
            category: req.body.category.split(","),
            inventoryStatus: inventoryStatus,
            quantity: quantity,
        });

       
        let details = await Product.find();
        if (req.files) {
            const url = 'http://206.189.140.51:4300/';
            // const url = 'http://192.168.0.242:4300/';
            const paths = req.files.map((file) => url + file.path);
            const concat = paths.join(', ');
            productList.image = concat;
        }

        for (let i = 0; i < details.length; i++) 
        {
            let code = details[i].productCode;
            if (details[i].productName == req.body.productName) {
                return res.status(400).json({
                    message: "Product name already exists",
                    status: "400"
                })

            }
            if (code === req.body.productCode) {
                return res.status(400).json({
                    message: "Product code already exists",
                    status: "400"
                })            }
        }
        await productList.save();
        let data = {
            message: "Product added successfully",
            status: '201',
            productDetails: productList
        }

        return res.status(201).json({ data })
    }
    catch (err) {
        return res.status(400).send(err);
    }
}
