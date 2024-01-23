const Ticket = require('../models/schema');

//GET THE NAMES OF THE EMPLOYEES
exports.getAllTheNames = async (req, res) => {
    try {
      const user = req.params.company;
      const company = await Ticket.find({ company: user }).select('-company').select('-topic').select('-title').select('-message').select('-status');
      if (company.length === 0) {
        return res.status(200).send("Incorrect company name")
      }
      res.json({ company });
    }
    catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  