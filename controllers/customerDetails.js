const Customer = require('../models/custmoreDetailsSchema');

exports.getCustomerDetails = async(req,res)=> {
    try{
        let k;
        let result = await Customer.find();
        if (result.length == 0) {
            k = 1;
        }
        else {
            let updateCount = result[result.length - 1].id;
            k = updateCount + 1;
        }
      let customer = new Customer({
        id:k,
        name: req.body.name,
        mobile_no: req.body.mobile_no
      });
      await customer.save();
      let data = {
        message: "Customer details added successfully",
        status: '201',
        customerDetails: customer
    }
    return res.status(201).send({ data });
    }
    catch(err)
    {
        return res.status(400).send(err.message);
    }
}