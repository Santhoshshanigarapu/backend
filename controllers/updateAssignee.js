const Ticket = require('../models/schema');

// UPDATE THE ASSIGNEE 
exports.updateTheAssignee = async (req, res) => {
    try {
      let _id = req.params.id;
      let assignee = req.body.assignee;
      let updated = await Ticket.updateOne({ _id }, { $set: { assignee: assignee } });
      return res.status(200).send({ updated });
    }
    catch (err) {
      return res.status(400).json(err.message);
    }
  
  }