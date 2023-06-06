const Joi = require('joi');


// not finished yet
exports.storeWorkHoure = async (req, res, next) => {
    const Schema = Joi.object({
        day: Joi.array().min(3),
        start_time: Joi.array().min(3),
        finish_time: Joi.array().min(3),
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