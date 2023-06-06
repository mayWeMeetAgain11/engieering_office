const { Engineer, Stage, StageEngineer } = require('../models');
const { Op } = require('sequelize');

exports.storeEngineerInStage = async (req, res, next) => {
    const { stage_id, engineer_ids, starting_date, ending_date } = req.body;
    try {
        // console.log(engineer_ids);
        const stage = await Stage.findByPk(stage_id);
        const engineers = await Engineer.findAll({
            where: {
                engineer_id: {
                    [Op.in]: engineer_ids
                }
            }
        });
        const stageEngineer = await StageEngineer.findAll({
            where: {
                engineer_id: {
                    [Op.in]: engineer_ids
                },
                stage_id: stage_id
            }
        })
        if (stageEngineer.length > 0) {
            return res.status(400).json({message: 'Engineer already in stage'});
        }
        if (starting_date && ending_date) {
            stage.starting_date = starting_date;
            stage.ending_date = ending_date;
            stage.status = true;
            await stage.save();
        }
        const stageEngineers = await stage.addEngineers(engineers);
        return res.status(200).json({
            message: "stage updated sucssefuly",
            data: stageEngineers
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};
exports.deleteEngineerFromStage = async (req, res, next) => {
    const { stage_id, engineer_id } = req.params;
    try {
        const engineer = await StageEngineer.destroy({
            where: {
                engineer_id: engineer_id,
                stage_id: stage_id
            }
        });
        return res.status(200).json({message: "Engineer deleted successfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
};