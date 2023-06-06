const { StageDocument, StageEngineer } = require('../models');

exports.storeStageDocument = async (req, res, next) => {
    const { stage_id, engineer_id, comment } = req.body;
    const { path } = req.file;
    try {
        const stageDocument = await StageDocument.create({
            document: path,
            comment: comment,
            engineer_id: engineer_id,
            stage_id: stage_id,
        });
        return res.status(200).json(stageDocument);
    } catch (error) {
        return res.status(500).json(error);
    }
};