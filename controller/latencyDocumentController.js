const { LatencyDocument } = require('../models');

exports.storeLatencyDocument = async (req, res, next) => {
    const { comment, latency_id } = req.body;
    const { path } = req.file;
    try {
        const latencyDocument = await LatencyDocument.create({
            comment: comment,
            document: path,
            latency_id: latency_id
        });
        return res.status(200).json(latencyDocument);
    } catch (error) {
        return res.status(500).json(error);
    }
};