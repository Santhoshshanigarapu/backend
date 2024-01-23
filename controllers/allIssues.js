const Ticket = require('../models/schema');

// GET ALL THE TICKET ISSUES RAISED
exports.getAllTheIssues = async (req, res) => {
    try {
      let issuesDetails = await Ticket.find();
      return res.status(200).send(issuesDetails);
    }
    catch (e) {
      return res.status(400).send(e);
    }
  }