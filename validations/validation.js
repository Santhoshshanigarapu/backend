const Joi = require('joi');
const { Schema } = require('mongoose');
const Product = require('../models/productSchema')
const loginValidations = (data) => {
    const Schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3),
    });
    return Schema.validate(data);
}

const registrationValidations = (data) => {
    const Schema = Joi.object({
        id: Joi.number().required(),
        role: Joi.string().required().valid('Admin', 'Manager','User'),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3)
    });
    return Schema.validate(data);
}

module.exports.registrationValidations = registrationValidations;
module.exports.loginValidations = loginValidations;
