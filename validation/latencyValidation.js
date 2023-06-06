const Joi = require('joi');

exports.storeLatencyDocument = async (req, res, next) => {
    const Schema = Joi.object({
        comment: Joi.string().min(30).required(),
        latency_id: Joi.number().required(),
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

exports.storeLatency = async (req, res, next) => {
    const Schema = Joi.object({
        comment: Joi.string().min(30).required(),
        days_expected: Joi.number().max(365).required(),
        stage_id: Joi.number().required(),
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