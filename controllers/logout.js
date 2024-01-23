const Token = require("../models/tokens");

exports.logOutUser = async (req, res) => {
    try {
        let updatedData = await Token.updateMany({ id: req.user.roleId }, { $set: { token: '' } });
         let result=await Token.findOne({id: req.user.roleId})
        //  console.log(result.token)
         if(result.token == '')
         {
         return res.status(200).send({message: "Successfully Logout"})
         }
        // return res.status(200).send("Successfully Logout")
    }
    catch (err) {
        return res.status(400).send(err);
    }
}