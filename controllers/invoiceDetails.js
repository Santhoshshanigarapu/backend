const Invoice = require('../models/invoiceSchema');
const Order = require('../models/orderSchema');
let count = 1;
exports.detailsOfInvoice = async (req, res) => {
  try {
    let invoice;
    let orderList = await Order.find().sort({ createdAt: -1 });
    for (let i = 0; i < orderList.length; i++) {
      let checkId = await Invoice.find({ orderId: orderList[i].id });
      if (!checkId || checkId.length === 0) {

        let price = 0, tax = 0, amount = 0;
        for (let j = 0; j < orderList[i].itemsList.length; j++) {
          price = price + orderList[i].itemsList[j].price;
          amount = amount + orderList[i].itemsList[j].amount;
          tax = tax + orderList[i].itemsList[j].tax;
        }
        let result = await Invoice.find();
        if (result.length == 0) {
          count = 1;
        }
        else {
          let updateCount = result[result.length - 1].counter;
          count = updateCount + 1;
        }
        let currentDate = new Date();

        let day = String(currentDate.getDate()).padStart(2, '0');
        let month = String(currentDate.getMonth() + 1).padStart(2, '0');
        let year = String(currentDate.getFullYear());
        let invoiceId = `${year}${month}${day}-${String(count).padStart(4, '0')}`;
        let date = `${year}-${month}-${day}`;
        let due_month = String(Number(month) + 1);
        let due_date = `${year}-${due_month}-${day}`;
        invoice = new Invoice({
          invoiceId: invoiceId,
          orderId: orderList[i].id,
          totalPrice: price,
          totalAmount: amount,
          totalTax: tax,
          counter: count,
          invoice_date: date,
          due_date: due_date,
          custName: orderList[i].custName,
          mobile_no: orderList[i].mobile,
          items: orderList[i].itemsList
        })
        await invoice.save();
      }
    }
    let data = await Invoice.find().sort({ createdAt: -1 });
    return res.status(200).send(data);
  }
  catch (err) {
    return res.status(400).send(err.message);
  }
}