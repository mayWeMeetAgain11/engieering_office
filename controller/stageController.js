const { Stage, Engineer, Plan, Database1 } = require('../models');

exports.getAllStageForOneProjectWithEveryThing = async (req, res, next) => {
    let { id } = req.params;
    try {
        const stages = await Stage.findAll({
            where: {
                project_id: id
            },
            include: ['stagedocuments', {
                model: Engineer,
                as: 'engineers',
                through: {
                    attributes: []
                }
            }, 'stagebills', 'latencys', 'stagefiles']
        });
        return res.status(200).json(stages);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneStage = async (req, res, next) => {
    const { stage_id, project_id } = req.params;
    try {
        const stage = await Stage.findOne({
            where: {
                project_id: project_id,
                id: stage_id
            },
            include: {
                model: Engineer,
                as: 'engineers',
                attributes: ["engineer_id", "first_name", "last_name", "email", "phone"],
                through: {
                    attributes: []
                }
            }
        });
        if (!stage) {
            return res.status(404).json({message: "stage not found"});
        }
        return res.status(200).json(stage);
    } catch (error) {
        return res.status(500).json(error);
    }
};


exports.getAllStageForOneProject = async (req, res, next) => {
    let { id } = req.params;
    try {
        const stages = await Stage.findAll({
            attributes: ['id', 'name', 'parent_id'],
            where: {
                project_id: id
            },
        });
        return res.status(200).json(stages);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllStageForOneProjectHabib = async (req, res, next) => {
    let { id } = req.params;
    try {
        const stages = await Stage.findAll({
            attributes: ['stage_id', 'project_id', 'starting_date', 'ending_date', 'ended' ],
            where: {
                project_id: id
            },
        });
        return res.status(200).json(stages);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.stageStore = async (req, res, next) => {
    try {
        // if (req.body.p_id && !req.body.stages) {
            const plans = await Plan.findAll({
                where: {
                    p_id: req.body.p_id
                }
            });
            let stages = plans.reduce((stages, item)=>{
                let arr=[];
                arr.push(req.body.p_id);
                arr.push(item.id);
                arr.push(item.name);
                arr.push(item.parent_id);
                arr.push(req.body.project_id);
                stages.push(arr);
                return stages
            },[]);
            const [result, metaData] = await Database1.query('INSERT INTO stages (plan_id, id, name, parent_id, project_id) VALUES :stages', {
                replacements: { 
                    stages: stages,
                },
            });
            return res.status(200).json({massage: "stages added sucessfully"});
            // console.log('llll');
        // } else {
        //     const stages = req.body.stages.map((item) => {
        //         item.unshift(req.body.p_id);
        //         item.push(req.body.project_id);
        //         return item;
        //     });
        //     const [result, metaData] = await Database1.query('INSERT INTO stages (plan_id, id, name, parent_id, project_id) VALUES :stages', {
        //         replacements: { 
        //             stages: stages,
        //         },
        //     });
        //     console.log(req.body.stages);
        //     return res.status(200).json({massage: "stages added sucessfully"});
        // }
    } catch (error) {
        return res.status(500).json(error);
    }
};