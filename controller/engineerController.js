const { Engineer, Manager, Owner, EngineerAccounting, Contractor, EngineerOrder, StageEngineer, Project, Stage } = require('../models');
const { Op } = require('sequelize');

exports.getAllEngineers = async (req, res, next) => {
    try {
        const engineer = await Engineer.findAll();
        return res.status(200).json(engineer);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneEngineer = async (req, res, next) => {
    const { id } =req.params;
    try {
        const engineer = await Engineer.findOne({
            where: {
                engineer_id: id
            },
            include: 'workhours'
        });
        if (engineer === null) {
            return res.status(404).json({massage: "not found"});
        } else {
            return res.status(200).json(engineer);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeEngineer = async (req, res, next) => {
    const { first_name, 
        last_name, 
        manager_id, 
        email, 
        password,   
        card_id, 
        phone,
        address,
        job,
        salary } = req.body;
    try {
        const manage = await Manager.findOne({
            where: {
                email: email
            }
        });
        const owner = await Owner.findOne({
            where: {
                email: email
            }
        });
        const contractor = await Contractor.findOne({
            where: {
                email: email
            }
        });
        if (manage || owner || contractor) {
            return res.status(401).json({massage: 'this email is already exist'});
        }
        const engineers = await Engineer.create({
            first_name: first_name,
            last_name: last_name,
            manager_id: manager_id,
            email: email,
            phone: phone,
            address: address,
            password: password,
            job: job,
            card_id: card_id,
            salary: salary,
        });
        return res.status(200).json({message: `${first_name} ${last_name} added successfully`});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: error.errors.map(e => e.message)
            })
        } else {
            // next(new ErrorResponse(`Sorry, could not save ${req.body.name}`, 404))
            return res.status(500).json(error);
        }
    }
};
exports.updateEngineer = async (req, res, next) => {
    const { id } = req.params;
    const { first_name, 
        last_name, 
        manager_id, 
        email, 
        password,   
        card_id, 
        phone,
        address,
        job,
        salary } = req.body;
    try {
        const manage = await Manager.findOne({
            where: {
                email: email
            }
        });
        const owner = await Owner.findOne({
            where: {
                email: email
            }
        });
        const contractor = await Contractor.findOne({
            where: {
                email: email
            }
        });
        if (manage || owner || contractor) {
                return res.status(401).json({massage: 'this email is already exist'});
        }
        const engineers = await Engineer.update({
            first_name: first_name,
            last_name: last_name,
            manager_id: manager_id,
            email: email,
            phone: phone,
            address: address,
            password: password,
            job: job,
            card_id: card_id,
            salary: salary,
        },
        {
            where: {
                engineer_id: id
            }
        });
        return res.status(200).json({massage: "engineer updated sucessfully"});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: error.errors.map(e => e.message)
            })
        } else {
            // next(new ErrorResponse(`Sorry, could not save ${req.body.name}`, 404))
            return res.status(500).json(error);
        }
    }
};

exports.deleteEngineer = async (req, res, next) => {
    const { id } = req.params;
    try {
        const engineer = await Engineer.destroy({
            where: {
                engineer_id: id
            }
        });
        return res.status(200).json({massage: "engineer deleted sucessfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.engineerWithoutSalary = async (req, res, next) => {
    const { month } = req.body;
    try {
        // let ids = [];
        // const engineerAccountings = await EngineerAccounting.findAll({
            // attributes: ['engineer_id'],
            // where: {
            //     [Op.or]: [
            //         {date: month},
            //         {engineer_order_id: null}
            //     ]
            // }
        // });
        // for (let index = 0; index < engineerAccountings.length; index++) {
        //     ids.push(engineerAccountings[index].engineer_id);
        // }
        const engineer = await Engineer.findAll({});
        for (let index = 0; index < engineer.length; index++) {
            engineer[index].deserve += engineer[index].salary;
            engineer[index].save();
        }
        return res.status(200).json(engineer);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllEngineerDeserve = async (req, res, next) => {
    try {
        const engineer = await Engineer.findAll({
            where: {
                deserve: {
                    [Op.ne]: 0,
                }
            },
            order: [['deserve', 'DESC']]
        });
        return res.status(200).json(engineer);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneEngineerDeserveWithOrder = async (req, res, next) => {
    let { id } = req.params;
    try {
        const engineer = await Engineer.findOne({
            where: {
                engineer_id: id
            },
            include: [{
                model: EngineerOrder,
                as: 'engineerorders',
                where: {
                    amount: {
                        [Op.ne]: 0, 
                    }
                }
            }]
        });
        return res.status(200).json(engineer);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllEngineerProjects = async (req, res, next) => {
    const { id } = req.params;
    try {
        let ids = []
        const stageEngineers = await StageEngineer.findAll({
            attributes: ['stage_id'],
            where: {
                engineer_id: id
            }
        });
        for (let index = 0; index < stageEngineers.length; index++) {
            ids.push(stageEngineers[index].stage_id);
        }
        console.log(ids);
        const engineerProjects = await Project.findAll({
            include: {
                model: Stage,
                as: 'stages',
                where: {
                    stage_id: {
                        [Op.in]: ids
                    }
                }
            }
        })
        return res.status(200).json(engineerProjects);
    } catch (error) {
        return res.status(500).json(error);
    }
};