const Register = require('../models/registerRoleSchema');

exports.addFields = async (req, res) => {
    try {
        const update = {
            $set: {
                gender: req.body._id
            }
        };
        let populated = await Register.updateOne({}, update).populate('gender');
        res.status(200).send(populated)

    }
    catch (err) {
        return res.status(400).send(err);
    }

}