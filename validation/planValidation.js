const Joi = require('joi');

exports.storePlan = async (req, res, next) => {
    const Schema = Joi.object({
        stages: Joi.array().min(3).messages({
            "array.min": "The plan should not be less than 3 stages"
        })
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