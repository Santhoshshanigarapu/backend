const Ticket = require('../models/schema');

// FILTERING THE DATA ACCORDING TO THE STATUS
exports.filterTheData = async (req, res) => {
    try {
      let status = req.query.status;
      const results = await Ticket.find({ status: status });
      return res.status(200).json({ data: results });
  
    }
    catch (err) {
      return res.status(400).send(err);
    }
  }