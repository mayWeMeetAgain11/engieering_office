const Joi = require('joi');

exports.storeEngineer = async (req, res, next) => {
    const Schema = Joi.object({
        first_name: Joi.string().regex(/^[,. a-zA-Z]+$/).max(30).required(),
        last_name: Joi.string().regex(/^[,. a-zA-Z]+$/).max(30).required(),
        manager_id: Joi.number().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(8).max(30).pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$')).required(),
        address: Joi.string().min(8).max(40).required(),
        phone: Joi.string().length(10).pattern(/^09\d{8}$/).required(),
        job: Joi.string().regex(/^[,. a-zA-Z]+$/).required(),
        card_id: Joi.string().required(),
        salary: Joi.number().required(),
    });
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map((errorDetail) => {
            return  {
                path: errorDetail.path[0],
                massage: errorDetail.message
            }
        });
        return res.status(400).json({
            errors: errors
        });
    }
    next();
};