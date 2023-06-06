const { Latency, Stage, Project } = require('../models');

exports.getAllAcceptedLatency = async (req, res, next) => {
    try {
        const latency = await Latency.findAll({
            where: {
                accepted: true
            }
        });
        return res.status(200).json(latency);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllLatency = async (req, res, next) => {
    try {
        const latency = await Latency.findAll({
            where: {
                accepted: null
            }
        });
        return res.status(200).json(latency);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getNotAcceptedLatency = async (req, res, next) => {
    try {
        const latency = await Latency.findAll({
            where: {
                accepted: false
            },
            include: [{
                model: Stage,
                as: 'stage',
                attributes: ['name'],
                include: [{
                    model: Project,
                    as: 'project',
                    attributes: ['name']
                }]
            }]
        });
        return res.status(200).json(latency);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneLatency = async (req, res, next) => {
    let { id } = req.params;
    try {
        const latency = await Latency.findOne({
            where: {
                latency_id: id
            },
            include: ['latencydocuments', {
                model: Stage,
                as: 'stage',
                include: [{
                    model: Project,
                    as: 'project',
                    attributes: ['name']
                }]
            }]
        });
        return res.status(200).json(latency);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeLatency = async (req, res, next) => {
    const { comment, days_expected, stage_id } = req.body;
    try {
        const latency = await Latency.create({
            days_expected: days_expected,
            comment: comment,
            stage_id: stage_id
        });
        return res.status(200).json(latency);
    } catch (error) {
        return res.status(500).json(error);
    }
};