const Order = require('../models/orderSchema');
const Invoice = require('../models/invoiceSchema');

exports.getTotalPurchasesAndQuantitySold = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: 'invoices',
          localField: 'id',
          foreignField: 'orderId',
          as: 'invoiceDetails'
        }
      },
      {
        $unwind: {
          path: '$invoiceDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          productName: '$itemsList.productName',
          quantityOrdered: '$itemsList.quantity',
          quantitySold: {
            $cond: {
              if: {
                $eq: ['$invoiceDetails', null]
              },
              then: 0,
              else: '$invoiceDetails.items.quantity'
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalPurchases: { $sum: '$quantityOrdered' },
          totalQuantitySold: { $sum: '$quantitySold' }
        }
      },
      {
        $project: {
          _id: 0,
          totalPurchases: 1,
          totalQuantitySold: 1
        }
      }
    ];

    const result = await Order.aggregate(pipeline);
    return res.status(200).json(result[0]); // Return the first (and only) element of the result array
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
