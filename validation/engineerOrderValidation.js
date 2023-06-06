const Joi = require('joi');

exports.storeEngineerOrder = async (req, res, next) => {
    const Schema = Joi.object({
        amount: Joi.number().min(100).required(),
        interval: Joi.number().max(24).required(),
        fee: Joi.number().required(),
        engineer_id: Joi.number().required()
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