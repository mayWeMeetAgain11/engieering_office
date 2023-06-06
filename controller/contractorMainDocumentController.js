// const { ContractorMainDocument } = require('../models');

// exports.contractorMainDocumentStore = async (req, res, next) => {
//     const { contractor_id, comment } = req.body;
//     const { path } = req.file;
//     try {
//         const contractorMainDocumect = await ContractorMainDocument.create({
//             contractor_id: contractor_id,
//             document: path,
//             comment: comment
//         })
//         return res.status(200).json(contractorMainDocumect);
//     } catch (error) {
//         return res.status(200).json(error);
//     }
// };