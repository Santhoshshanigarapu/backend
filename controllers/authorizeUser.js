const Register = require("../models/registerRoleSchema");
const Token = require("../models/tokens");

exports.authorizeProtected = async (req, res) => {
    try {
        //  console.log(`Cookies: ${req.cookies.jwt}`);
        res.send("Successfully authorized");
    }
    catch (err) {
        return res.status(400).send(err);
    }

}