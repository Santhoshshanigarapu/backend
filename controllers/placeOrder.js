const Order = require('../models/orderSchema');
const Product = require('../models/productSchema');

let k;
exports.getOrderPlaced = async (req, res) => {
    try {
        // let promise = req.body.map(element => {
        //     let order = new Order(element)
        //     return order.save();
        // });
        // let result = await Promise.all(promise);
        let result = await Order.find();
        let itemsList = req.body.itemsList;
        if (result.length == 0) {
            k = 1;
        }
        else {
            let updateCount = result[result.length - 1].id;
            k = updateCount + 1;
        }
        let order = new Order({
            id: k,
            custName: req.body.custName,
            mobile: req.body.mobile,
            itemsList: req.body.itemsList
        })
        await order.save();

        for (let i = 0; i < itemsList.length; i++) {
           let productName = itemsList[i].productName;
            let check = await Product.find({ productName });
            let finalQuantity = check[0].quantity - itemsList[i].quantity;
            // if (finalQuantity >= 0) {
            //     let final = await Product.updateOne({ productName }, { $set: { quantity: finalQuantity } });
            // }
            if (finalQuantity >= 5 && finalQuantity <= 15) {

                let final = await Product.updateOne({ productName }, { $set: { quantity: finalQuantity, inventoryStatus: "LOWSTOCK" } });
            }
            if (finalQuantity > 15) {
    
                let final = await Product.updateOne({ productName }, { $set: { quantity: finalQuantity, inventoryStatus: "INSTOCK" } });
            }
            if (finalQuantity <= 0) {
    
                let final = await Product.updateOne({ productName }, { $set: { quantity: finalQuantity, inventoryStatus: "OUTOFSTOCK" } });
            }
    
        }
       
        let data = {
            message: "Orders added successfully",
            status: '201',
            orderDetails: order
        }
        return res.status(201).send(data);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
} 
