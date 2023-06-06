const { StageBill } = require('../models');

exports.storeStageBill = async (req, res, next) => {
    const { stage_id, stage_document_id, cost, comment } = req.body;
    try {
        const stageBill = await StageBill.create({
            cost: cost,
            comment: comment,
            stage_id: stage_id,
            stage_document_id: stage_document_id || null,
        });
        return res.status(200).json(stageBill);
    } catch (error) {
        return res.status(500).json(error);
    }
};