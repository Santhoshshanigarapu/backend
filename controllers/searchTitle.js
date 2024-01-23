const Ticket = require('../models/schema');

// SEARCH ACCORDING TO THE TITLE 
exports.searchTitle = async (req, res) => {
    try {
      let title = req.body.title;
      const results = await Ticket.find({ title: { $regex: title, $options: 'i' } });
      return res.status(200).json({ data: results });
  
    }
    catch (err) {
      return res.status(400).send(err);
    }
  }
  