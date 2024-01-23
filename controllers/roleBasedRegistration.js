const Register = require('../models/registerRoleSchema');
const { registrationValidations } = require('../validations/validation');
const bcrypt = require('bcryptjs');

exports.registrationBasedRole = async (req, res) => {
    try {
      let { error } = registrationValidations(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      let register = new Register({
        id: req.body.id,
        role: req.body.role,
        email: req.body.email,
        password: hashedPassword,
      });
      await register.save();
  
      let data = {
        message: "Registered Successfully",
        status: '201',
        roleId: req.body.id,
        role: req.body.role
      }
      return res.status(201).json({ data });
    }
    catch (err) {
      return res.status(400).send(err);
    }
  
  }