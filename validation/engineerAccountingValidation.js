const Joi = require('joi');

exports.storeEngineerAccounting = async (req, res, next) => {
    const Schema = Joi.object({
        date: Joi.date().min('now').required(),
        amount: Joi.number().min(100).required(),
        type: Joi.string().valid('payment', 'pay').insensitive().required(),
        order_id: Joi.number().allow(null)
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