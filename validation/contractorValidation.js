const Joi = require('joi');

exports.storContractorDocument = async (req, res, next) => {
    const Schema = Joi.object({
        stage_contractor_id: Joi.number().required(),
        comment: Joi.string().min(20).required(),
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