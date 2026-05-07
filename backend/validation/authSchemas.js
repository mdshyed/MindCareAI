const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'counselor', 'admin').required(),
    speciality: Joi.when('role', {
        is: 'counselor',
        then: Joi.string().min(2).required(),
        otherwise: Joi.string().optional().allow(''),
    }),
    credentials: Joi.when('role', {
        is: 'counselor',
        then: Joi.string().min(2).required(),
        otherwise: Joi.string().optional().allow(''),
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
