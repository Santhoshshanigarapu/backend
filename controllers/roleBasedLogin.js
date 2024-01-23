const { loginValidations } = require('../validations/validation');
const jwt = require('jsonwebtoken');
const Register = require('../models/registerRoleSchema');
const bcrypt = require('bcryptjs');
const Token = require('../models/tokens');

exports.loginBasedRole = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = loginValidations(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await Register.findOne({ email }).lean(); // Add .lean() to improve performance

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const token = jwt.sign({ id: user.id, role: user.role, _id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '20m' });
                const authToken = new Token({
                    token: token,
                    roleId: user.id,
                    role: user.role
                });

                // res.cookie('jwt', token, { expires: new Date(Date.now() + 3000000) });
                await authToken.save();

                const data = {
                    message: "Login Successful",
                    status: '200',
                    roleId: user.id,
                    role: user.role,
                    token: token
                };

                return res.status(200).json({ data });
            }
        }

        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (err) {
        return res.status(400).send(err.message);
    }
};
