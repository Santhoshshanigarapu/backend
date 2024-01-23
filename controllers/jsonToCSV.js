const json2csv = require('json2csv').parse;
const fs = require('fs');
const Product = require('../models/productSchema');

exports.convertingToCSV = async (req, res) => {
    try {
        let data = await Product.find();
        let fields = ['productName', 'productDescription', 'productCode', 'price', 'category', 'inventoryStatus', 'ratings', 'images'];
        let csv = json2csv(data, { fields });
        fs.writeFile('data.csv', csv, (err) => {
            if (err) return res.send(err);
            console.log("File saved successfully");
            return res.status(200).send({
                message: "File saved successfully",
                status: '200',
                data: csv
            });
        });

    }
    catch (err) {
        return res.status(400).send(err);
    }
}
(err) => {
    if (err) return res.send(err);
    console.log("File save successfully");
    return res.status(200).send({ message: "File save successfully" });
}