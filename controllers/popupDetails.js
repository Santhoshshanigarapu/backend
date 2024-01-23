const Ticket = require('../models/schema');

// GET THE DETAILS OF THE POP-UP LIST ENTERED BY USING ID
exports.displayPopUpDetails = async (req, res) => {
    try {
      let _id = req.params.id;
      const popUpList = await Ticket.find({ _id }).select('-type').select('-company').select('-employee').select('-topic').select('-comment_count');
      return res.status(200).send({ popUpList });
    }
    catch (err) {
      return res.status(400).json(err.message);
    }
  
  }
  