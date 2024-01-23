const Product = require('../models/productSchema');
const Customer = require('../models/custmoreDetailsSchema');
const Invoice = require('../models/invoiceSchema');
const Category = require('../models/categorySchema');
const Order = require('../models/orderSchema');

exports.getSaleActivity = async (req, res) => {
    try {
        // Retrieve all products
        const products = await Product.find({});

        let totalQuantity = 0;

        // Calculate the total quantity in hand by summing up the quantity of each product
        products.forEach((product) => {
            totalQuantity += product.quantity;
        });
        const countProduct = await Product.aggregate([
            {
                $count: 'totalProducts'
            }
        ]);

        const countCustomer = await Customer.aggregate([
            {
                $count: 'totalCustomers'
            }
        ]);
        const countInvoice = await Invoice.aggregate([
            {
                $count: 'totalInvoices'
            }
        ]);

        const countCategory = await Category.aggregate([
            {
                $count: 'totalCategories'
            }
        ]);
        const orders = await Order.find({}); // Retrieve all orders

        let totalQuantitySold = 0;

        // Calculate the total quantity sold by summing up the quantity of each item in all orders
        orders.forEach((order) => {
            order.itemsList.forEach((item) => {
                totalQuantitySold += item.quantity;
            });
        });

        const totalCustomers = countCustomer.length > 0 ? countCustomer[0].totalCustomers : 0;
        const totalProducts = countProduct.length > 0 ? countProduct[0].totalProducts : 0;
        const totalInvoices = countInvoice.length > 0 ? countInvoice[0].totalInvoices : 0;
        const totalCategories = countCategory.length > 0 ? countCategory[0].totalCategories : 0;

        return res.status(200).json({
            message: "Success",
            status: '200',
            totalCustomers: totalCustomers,
            totalProducts: totalProducts,
            totalInvoices: totalInvoices,
            totalCategories: totalCategories,
            totalQuantity: totalQuantity ,
            totalQuantitySold: totalQuantitySold
        });
    } catch (err) {
        return res.status(400).send(err.message);
    }
};
