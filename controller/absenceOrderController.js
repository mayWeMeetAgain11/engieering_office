const { Op } = require('sequelize');
const { AbsenceOrder, Engineer } = require('../models');

exports.getAllAbsenceOrder = async (req, res, next) => {
    try {
        const order = await AbsenceOrder.findAll({
            where: {
                accepted: null,
            },
            include: ['engineer']
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
};