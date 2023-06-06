const { Engineer, EngineerAccounting, EngineerOrder } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

exports.storeEngineerAccount = async (req, res, next) => {
    let { date, amount, type, order_id } = req.body;
    let { id } = req.params;
    try {
        const engineerAccount = await EngineerAccounting.create({
            date: date,
            amount: amount,
            type: type,
            engineer_id: id,
            engineer_order_id: order_id || null
        });
        if (type === "pay" && !order_id) {
            const engineer = await Engineer.findByPk(id);
            engineer.deserve -= amount;
            engineer.save();
        } else if(type === "payment" && order_id) {
            const order = await EngineerOrder.findByPk(order_id);
            order.amount -= amount;
            order.save();
        }
        return res.status(200).json(engineerAccount);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllEngineerSalaries = async (req, res, next) => {
    let { id } = req.params;
    try {
        const accounting = await EngineerAccounting.findAll({
            where: {
                engineer_id: id,
                engineer_order_id: null
            }
        });
        return res.status(200).json(accounting);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneEngineerAdvancePayments = async (req, res, next) => {
    let { id } = req.params;
    try {
        const accounting = await EngineerAccounting.findAll({
            where: {
                engineer_id: id,
                engineer_order_id: {
                    [Op.ne]: null
                }
            }
        });
        return res.status(200).json(accounting);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllEmployeesAccountingInSpeceficDate = async (req, res, next) => {
    let { date } = req.body;
    try {
        const accounting = await EngineerAccounting.findAll({
            where: {
                date: {
                    [Op.between]: [
                        Date(date.showMonthFirstDay()),
                        Date(date.showMonthLastDay())
                    ]
                }
            }
        });
        return res.status(200).json(accounting);
    } catch (error) {
        return res.status(500).json(error);
    }
};