const { Project, StageContractor, Stage, StageMaterial, Material, Database2, Bill, ProjectDocument, StageBill } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

exports.getAllFinishedProject = async (req, res, next) => {
    let project_ids = [];
    try {
        const project = await Project.findAll({
            where: {
                finished: true,
                accepted: true
            },
            include: ['bills', 'projectdocuments']
        });
        for (let index = 0; index < project.length; index++) {
            project_ids.push(project[index].project_id); 
        }

        const stageMaterialsPayment = await Project.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('stages->stagematerials.price')), 'stage_materials_payment'],
                'project_id'
            ],
            include: {
                attributes: [],
                model: Stage,
                as: 'stages',
                include:{
                    attributes: [],
                    model: StageMaterial,
                    as: 'stagematerials',
                } 
            },
            where: {
                project_id: {
                    [Op.in]: project_ids
                }
            },
            group: ['Project.project_id']
        });

        const stageBillsPayment = await Project.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('stages->stagebills.cost')), 'stage_bill_payment'],
                'project_id'
            ],
            include: {
                attributes: [],
                model: Stage,
                as: 'stages',
                include:{
                    attributes: [],
                    model: StageBill,
                    as: 'stagebills',
                } 
            },
            where: {
                project_id: {
                    [Op.in]: project_ids
                }
            },
            group: ['Project.project_id']
        });

        const bills = await Project.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('bills.payment')), 'owner_bill_payment'],
                'project_id'
            ],
            include: {
                attributes: [],
                model: Bill,
                as: 'bills'
            },
            where: {
                project_id: {
                    [Op.in]: project_ids
                }
            },
            group: ['Project.project_id']
        });
        // const projectsWithDocumentsWithStagesWithStageMaterialsWithStageBillssssssssssssssssssss = projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[0].toJSON();
        for (let index = 0; index < project.length; index++) {
            // projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index].setDataValue('stage_materials_payment', stageMaterialsPayment[index].get('stage_materials_payment'));
            project[index].setDataValue('owner_bill_payment', bills[index].get('owner_bill_payment'));
            total_bill = stageMaterialsPayment[index].get('stage_materials_payment') + stageBillsPayment[index].get('stage_bill_payment');
            project[index].setDataValue('total_bill', total_bill);
            // projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index].setDataValue('stage_bill_payment', stageBillsPayment[index].get('stage_bill_payment'));
            // projectsWithDocumentsWithStagesWithStageMaterialsWithStageBillssssssssssssssssssss['iiii'] = 90;
            // projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index]['stage_materials_payment'] = stageMaterialsPayment[index].get('stage_materials_payment');
        }

        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getRejectedProjects = async (req, res, next) => {
    try {
        const project = await Project.findAll({
            where: {
                finished: false,
                accepted: false
            },
        });
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllNotAcceptedProject = async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            where: {
                accepted: null,
                finished: false
            },
            include: 'projectdocuments'
        });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneProject = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project.findOne({
            where: {
                project_id: id
            },
            include: 'projectdocuments'
        });
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateProjectToAccepted = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project.findOne({
            where: {
                project_id: id,
                accepted: false
            },
        });
        if (!project) {
            return res.status(404).json({message: 'project not found'});
        }
        project.accepted = true;
        await project.save();
        return res.status(200).json({message: 'project accepted'});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.updateProjectToUnaccepted = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project.findOne({
            where: {
                project_id: id,
                accepted: null
            },
        });
        if (!project) {
            return res.status(404).json({message: 'project not found'});
        }
        project.accepted = false;
        await project.save();
        return res.status(200).json({message: 'project rejected'});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllProjectsWiteNoPlan = async (req, res, next) => {
    try {
        let ids = [];
        const projectsIds = await Stage.findAll({
            attributes: ['project_id'],
            group: 'project_id',
        });
        for (let index = 0; index < projectsIds.length; index++) {
            ids.push(projectsIds[index].project_id);
        }
        const projects = await Project.findAll({
            where: {
                project_id: {
                    [Op.notIn]: ids,
                },
                accepted: true,
                finished: false
            }
        });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getCurrentProjects = async (req, res, next) => {
    try {
        let ids = [];
        const projectsIds = await Stage.findAll({
            attributes: ['project_id'],
            group: 'project_id',
        });
        for (let index = 0; index < projectsIds.length; index++) {
            ids.push(projectsIds[index].project_id);
        }
        const projects = await Project.findAll({
            where: {
                project_id: {
                    [Op.in]: ids,
                },
                finished: false,
                accepted: true
            }
        });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOwnerProjectInfo = async (req, res, next) => {
    const { owner_id } = req.params;
    let project_ids = [];
    // let stage_ids = [];
    // let pro_id = 0;
    // let index2 = 0;
    // let projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills = [];
    // let obj = {
    //     name: "jdjdjdj",
    //     age: 28
    // };
    let total_stage_materials_payment = 0;
    let total_owner_bill_payment = 0;
    let total_stage_bill_payment = 0;

    try {   
        const projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills = await Project.findAll({
            include: [{
                model: ProjectOwner,
                as: 'projectowners',
                where: {
                    owner_id: owner_id
                },
                attributes: [],
            },{
                model: ProjectDocument,
                as: 'projectdocuments'
            },{
                model:Bill,
                as: 'bills'
            },{
                model: Stage,
                as: 'stages',
                include: [
                    {
                        // required: false,
                        model: StageBill,
                        as: 'stagebills'
                    },{
                        // required: false,
                        model: StageMaterial,
                        as: 'stagematerials'
                    }
                ],  
            }]
        });

        for (let index = 0; index < projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.length; index++) {
            project_ids.push(projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index].project_id); 
        }

        // const stagesIds = await Stage.findAll({
        //     attributes: ['stage_id'],
        //     where: {
        //         project_id: {
        //             [Op.in]: project_ids
        //         }
        //     }
        // });

        const stageMaterialsPayment = await Project.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('stages->stagematerials.price')), 'stage_materials_payment'],
                'project_id'
            ],
            include: {
                attributes: [],
                model: Stage,
                as: 'stages',
                include:{
                    attributes: [],
                    model: StageMaterial,
                    as: 'stagematerials',
                } 
            },
            where: {
                project_id: {
                    [Op.in]: project_ids
                }
            },
            group: ['Project.project_id']
        });

        const stageBillsPayment = await Project.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('stages->stagebills.cost')), 'stage_bill_payment'],
                'project_id'
            ],
            include: {
                attributes: [],
                model: Stage,
                as: 'stages',
                include:{
                    attributes: [],
                    model: StageBill,
                    as: 'stagebills',
                } 
            },
            where: {
                project_id: {
                    [Op.in]: project_ids
                }
            },
            group: ['Project.project_id']
        });

        const bills = await Project.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('bills.payment')), 'owner_bill_payment'],
                'project_id'
            ],
            include: {
                attributes: [],
                model: Bill,
                as: 'bills'
            },
            where: {
                project_id: {
                    [Op.in]: project_ids
                }
            },
            group: ['Project.project_id']
        });
        // const projectsWithDocumentsWithStagesWithStageMaterialsWithStageBillssssssssssssssssssss = projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[0].toJSON();
        for (let index = 0; index < projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.length; index++) {
            projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index].setDataValue('stage_materials_payment', stageMaterialsPayment[index].get('stage_materials_payment'));
            projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index].setDataValue('owner_bill_payment', bills[index].get('owner_bill_payment'));
            projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index].setDataValue('stage_bill_payment', stageBillsPayment[index].get('stage_bill_payment'));

            total_stage_materials_payment += stageMaterialsPayment[index].get('stage_materials_payment');
            total_owner_bill_payment += bills[index].get('owner_bill_payment');
            total_stage_bill_payment += stageBillsPayment[index].get('stage_bill_payment');
            // projectsWithDocumentsWithStagesWithStageMaterialsWithStageBillssssssssssssssssssss['iiii'] = 90;
            // projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills[index]['stage_materials_payment'] = stageMaterialsPayment[index].get('stage_materials_payment');
        }

        projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.push({'total_stage_materials_payment': total_stage_materials_payment});
        projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.push({'total_owner_bill_payment': total_owner_bill_payment});
        projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.push({'total_stage_bill_payment': total_stage_bill_payment});

        return res.status(200).json(projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneProjectInfo = async (req, res, next) => {
    const { project_id } = req.params;
    let total_bill = 0;

    try {   
        const projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills = await Project.findOne({
            include: [
                {
                    model: ProjectDocument,
                    as: 'projectdocuments'
                },{
                    model:Bill,
                    as: 'bills'
                },{
                    model: Stage,
                    as: 'stages',
                    include: [
                        {
                            // required: true,
                            model: StageBill,
                            as: 'stagebills'
                        },{
                            // required: true,
                            model: StageMaterial,
                            as: 'stagematerials'
                        }
                    ],  
            }],
            where: {
                project_id: project_id
            }
        });

        const stageMaterialsPayment = await Project.findOne({
            attributes: [
                [sequelize.fn('sum', sequelize.col('stages->stagematerials.price')), 'stage_materials_payment'],
            ],
            include: {
                attributes: [],
                model: Stage,
                as: 'stages',
                include:{
                    attributes: [],
                    model: StageMaterial,
                    as: 'stagematerials',
                } 
            },
            where: {
                project_id: project_id
            },
            group: ['Project.project_id']
        });

        const stageBillsPayment = await Project.findOne({
            attributes: [
                [sequelize.fn('sum', sequelize.col('stages->stagebills.cost')), 'stage_bill_payment'],
            ],
            include: {
                attributes: [],
                model: Stage,
                as: 'stages',
                include:{
                    attributes: [],
                    model: StageBill,
                    as: 'stagebills',
                } 
            },
            where: {
                project_id: project_id
            },
            group: ['Project.project_id']
        });

        const bills = await Project.findOne({
            attributes: [
                [sequelize.fn('sum', sequelize.col('bills.payment')), 'owner_bill_payment'],
            ],
            include: {
                attributes: [],
                model: Bill,
                as: 'bills'
            },
            where: {
                project_id: project_id
            },
            group: ['Project.project_id']
        });

        projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.setDataValue('stage_materials_payment', stageMaterialsPayment.get('stage_materials_payment'));
        projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.setDataValue('owner_bill_payment', bills.get('owner_bill_payment'));
        projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.setDataValue('stage_bill_payment', stageBillsPayment.get('stage_bill_payment'));

        total_bill = stageMaterialsPayment.get('stage_materials_payment') + stageBillsPayment.get('stage_bill_payment');

        projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills.setDataValue('total_bill', total_bill);

        return res.status(200).json(projectsWithDocumentsWithStagesWithStageMaterialsWithStageBills);
    } catch (error) {
        return res.status(500).json(error);
    }
};


// exports.getAllProjectsForOneOwner = async (req, res, next) => {

//     const {id} = req.params; //owner_id
//     let ids= [];
//     try {
//         const projectIds = await ProjectOwner.findAll({
//             where: {
//                 owner_id: id
//             }
//         });
//         for (let index = 0; index < projectIds.length; index++) {
//             ids.push(projectIds[index].project_id);
//         }
//         const projects = await Project.findAll({
//             where: {
//                 project_id: {
//                     [Op.in]: ids
//                 }
//             },
//             include: {
//                 model: ProjectDocument,
//                 as: "projectdocuments"
//             },
//         });
//         return res.status(200).json(projects);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };





