const Ticket = require('../models/schema');
const Admin = require('../models/adminSchema');

// ADMIN DROPDOWN LIST
exports.getAdminList = async (req, res) => {
  try {
    let admin;
    const enumValues = Ticket.schema.path('admin').enumValues;
    await Admin.deleteMany();

    for (let i = 0; i < enumValues.length; i++) {
      admin = new Admin({
        name: enumValues[i]
      });
      await admin.save();
    }
    let list = await Admin.find();
    return res.status(200).json({ data: list });

  }
  catch (err) {
    return res.status(400).json(err.message);
  }

}