const { Op } = require('sequelize');
const { EngineerOrder, Engineer } = require('../models');

exports.getAcceptedEngineerOrder = async (req, res, next) => {
    try {
        const order = await EngineerOrder.findAll({
            where: {
                accepted: true,
                amount: {
                    [Op.ne]: 0
                }
            }
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllEngineerOrder = async (req, res, next) => {
    try {
        const order = await EngineerOrder.findAll({
            where: {
                accepted: null,
            },
            include: {
                model: Engineer,
                as: 'engineer',
                attributes: ['first_name', 'last_name', 'email', 'phone', 'card_id', 'job']
            }
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getNotAcceptedEngineerOrder = async (req, res, next) => {
    try {
        const order = await EngineerOrder.findAll({
            where: {
                accepted: false
            }
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneEngineerOrderWithDocument = async (req, res, next) => {
    let { id } = req.params;
    try {
        const order = await EngineerOrder.findOne({
            where: {
                engineer_order_id: id
            },
            include: ['orderdocuments']
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateEngineerOrderToAccepted = async (req, res, next) => {
    let { id } = req.params;
    try {
        const order = await EngineerOrder.update({
            accepted: true
        },
        {
            where: {
                engineer_order_id: id
            }
        });
        return res.status(200).json({massage: "order updated sucessfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeEngineerOrder = async (req, res, next) => {
    let { amount, interval, fee, engineer_id } = req.body;
    try {
        const order = await EngineerOrder.create({
            amount,
            interval,
            fee,
            engineer_id
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
};