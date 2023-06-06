const { WorkHour } = require('../models');

exports.getOneWorkHoure = async (req, res, next) => {
    const { id } = req.params;
    try {
        const workHoure = await WorkHour.findAll({
            where: {
                engineer_id: id
            }
        });
        return res.status(200).json(workHoure);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeWorkHoure = async (req, res, next) => {
    try {
        const { id } = req.params;
        const nodes = [];
        for (let index = 0; index < req.body.length; index++) {
            const workHoure = await WorkHour.create({
                day: req.body[index].day,
                start_time: req.body[index].start_time,
                finish_time: req.body[index].finish_time,
                engineer_id: id
            });
            nodes.push(workHoure);
            // req.body.forEach(async (element) => {
            // });
        }
        return res.status(200).json(nodes);
    } catch (error) {
        return res.status(500).json(error);
    }
};


