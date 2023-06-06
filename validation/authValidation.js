const Joi = require('joi');

exports.login = async (req, res, next) => {
    const Schema = Joi.object({
        type: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        new_password: Joi.string().min(8).max(30).required().pattern(new RegExp('^^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$')),
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