const { required } = require('joi');
const Joi = require('joi');

exports.stageUpdate = async (req, res, next) => {
    const Schema = Joi.object({
        stage_id: Joi.number().required(),
        engineer_ids: Joi.array().required(),
        starting_date: Joi.date().allow(null),
        ending_date: Joi.date().allow(null)
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

exports.storeStageBill = async (req, res, next) => {
    const Schema = Joi.object({
        stage_id: Joi.number().required(),
        stage_document_id: Joi.number().allow(null),
        cost: Joi.number().required(),
        comment: Joi.string().min(30).required()
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

exports.storeStageDocument = async (req, res, next) => {
    const Schema = Joi.object({
        stage_id: Joi.number().required(),
        engineer_id: Joi.number().required(),
        comment: Joi.string().min(30).required()
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

exports.storeStage = async (req, res, next) => {
    const Schema = Joi.object({
        p_id: Joi.number().required(),
        project_id: Joi.number().required(),
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