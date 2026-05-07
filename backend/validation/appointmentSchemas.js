const Joi = require('joi');

const bookAppointmentSchema = Joi.object({
    counselorId: Joi.string().length(24).hex().required(),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
        'string.pattern.base': 'Date must be in YYYY-MM-DD format',
    }),
    time: Joi.string().pattern(/^\d{2}:\d{2}$/).required().messages({
        'string.pattern.base': 'Time must be in HH:MM format',
    }),
    concern: Joi.string().min(10).max(1000).required(),
    anonymous: Joi.boolean().optional(),
});

const updateStatusSchema = Joi.object({
    status: Joi.string().valid('approved', 'rejected', 'completed').required(),
});

module.exports = { bookAppointmentSchema, updateStatusSchema };
