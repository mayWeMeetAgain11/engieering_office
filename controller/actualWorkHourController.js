const { ActualWorkHour } = require('../models');
// const axios = require('axios');

exports.getOneEngineerWorksInDay = async (req, res, next) => {
    const {date, employee_id} = req.body;
    try {
        const workHours = await ActualWorkHour.findAll({
            where: {
                date: date,
                employee_id: employee_id
            }
        });
        return res.status(200).json(workHours);
    } catch (error) {
        return res.status(500).json(error);
    }
}