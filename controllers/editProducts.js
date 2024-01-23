const Product = require('../models/productSchema');
const upload = require('../middlewares/upload');
const Category = require('../models/categorySchema');
const { inventoryStatus } = require('./inventoryStatus');

exports.editProducts = async (req, res) => {
  try {
    let _id = req.params._id;
    let data;
    let body = {};

    // Parse the form data and files using multer middleware
    upload.array('image', 10)(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err);
      }

      // Iterate over the keys of req.body and add them to the body object
      for (let i in req.body) {
        body[i] = req.body[i];
      }

      if (req.files && req.files.length > 0) {
        const url = 'http://206.189.140.51:4300/';
        // const url = 'http://192.168.0.242:4300/';

        const imageUrls = req.files.map((file) => url + file.path);
        body.image = imageUrls.join(',');
      }

      try {
        let quantity = req.body.quantity;
        let inventoryStatus;
        if (quantity >= 1 && quantity <= 15) {
          inventoryStatus = "LOWSTOCK";
        }
        if (quantity > 15) {
          inventoryStatus = "INSTOCK";
        }
        if (quantity <= 0) {
          inventoryStatus = "OUTOFSTOCK";
        }

        const updatedRecord = await Product.findByIdAndUpdate({ _id: _id }, { new: true });
        updatedRecord.productName = req.body.productName || updatedRecord.productName;
        updatedRecord.productDescription = req.body.productDescription || updatedRecord.productDescription;
        updatedRecord.productCode = req.body.productCode || updatedRecord.productCode;
        updatedRecord.price = req.body.price || updatedRecord.price;
        updatedRecord.category = req.body.category ? req.body.category.split(",") : updatedRecord.category;
        updatedRecord.quantity = quantity || updatedRecord.quantity;
        updatedRecord.inventoryStatus = inventoryStatus || updatedRecord.inventoryStatus;
        updatedRecord.image = body.image || updatedRecord.image;
        let categoryList = await Category.find().select('name');
        let list = [];

        if (categoryList.length != 0) {
          for (let i = 0; i < categoryList.length; i++) {
            list.push(categoryList[i].name);
          }
          for (let i = 0; i < updatedRecord.category.length; i++) {
            if (list.includes(updatedRecord.category[i])) { }
            else { return res.status(400).send({ message: `${updatedRecord.category[i]} doesn't exist in the category list` }) }

          }
          await updatedRecord.save();
          data = {
            message: "Product edited successfully",
            status: '200',
            edited: updatedRecord
          };
          return res.status(200).send({ data });
        }
        return res.status(400).send({
          message: `Category doesn't exist`,
          status: '400'
        })
      } catch (err) {
        return res.status(400).send(err.message);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};
