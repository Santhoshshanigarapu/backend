//const Product = require('../models/productSchema');
const Order = require('../models/orderSchema');

exports.getTopSellingItems = async (req, res) => {
  try {
    const aggregationPipeline = [
      { $unwind: '$itemsList' }, // Flatten the itemsList array
      {
        $group: {
          _id: '$itemsList.productName',
          totalQuantitySold: { $sum: '$itemsList.quantity' }
        }
      },
      { $sort: { totalQuantitySold: -1 } }, // Sort in descending order based on totalQuantitySold
      { $limit: 5 }, // Limit the result to the top 5 items (adjust as needed)
      {
        $lookup: {
          from: 'products', // Name of the products collection
          localField: '_id',
          foreignField: 'productName',
          as: 'product'
        }
      },
      {
        $project: {
          productName: '$_id',
          image: { $arrayElemAt: ['$product.image', 0] },
          totalQuantitySold: 1,
          _id: 0
        }
      }
    ];

    const result = await Order.aggregate(aggregationPipeline);

    return res.status(200).json({
      message: 'Success',
      status: '200',
      topSellingItems: result
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
