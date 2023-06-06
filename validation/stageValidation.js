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