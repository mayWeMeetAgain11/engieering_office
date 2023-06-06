const { ContractorDocument } = require('../models');

exports.contractorDocumentStore = async (req, res, next) => {
    const { stage_contractor_id, comment } = req.body;
    const { path } = req.file;
    try {
        const contractorDocumect = await ContractorDocument.create({
            stage_contractor_id: stage_contractor_id,
            document: path,
            comment: comment
        });
        return res.status(200).json(contractorDocumect);
    } catch (error) {
        return res.status(200).json(error);
    }
};