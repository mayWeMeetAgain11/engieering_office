const { Engineer, Stage, StageEngineer } = require('../models');
const { Op } = require('sequelize');

exports.storeEngineerInStage = async (req, res, next) => { 
    const { stage_id, engineer_ids, starting_date, ending_date } = req.body; 
    let eng_names = "";
    let eng_ids_donot_wanted = [];
    // let eng_ids_wanted = [];
    try { 
        // // console.log(engineer_ids); 
        const stage = await Stage.findByPk(stage_id); 
        const engineerIdsInStage = await StageEngineer.findAll({
            attributes: [
                'engineer_id'
            ],
            where: {
                stage_id: stage_id
            }
        });
        for (let index = 0; index < engineerIdsInStage.length; index++) {
            eng_ids_donot_wanted.push(engineerIdsInStage[index].engineer_id);
        }
        const engineers = await Engineer.findAll({ 
            where: {
                [Op.and]: [
                    {engineer_id: {
                        [Op.notIn]: eng_ids_donot_wanted
                    }},
                    {engineer_id: { 
                        [Op.in]: engineer_ids
                    }}
                ]
            }
        });
        if (engineers.length === 0) { 
            return res.status(400).json({message: 'The engineers are already in this stage'}); 
        } 
        if (starting_date && ending_date) { 
            stage.starting_date = starting_date; 
            stage.ending_date = ending_date; 
            stage.status = true; 
            await stage.save(); 
        } 

        for (let index = 0; index < engineers.length; index++) {
            eng_names = eng_names + (engineers[index].first_name + " " + engineers[index].last_name) + ",";
        }
        const stageEngineers = await stage.addEngineers(engineers); 
        return res.status(200).json({
            message: `stage updated sucssefuly with adding engineers ${eng_names}`
        }); 
        // console.log(req.body)
        // return res.status(200).json( stage_id, engineer_ids, starting_date, ending_date);
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