const { Contractor, Database2, Manager, Owner, Engineer, StageContractor, Project, Stage, Material, EvaluationOwnerMaterial, EvaluationEnginnerMaterial } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

exports.getAllContractors = async (req, res, next) => {
    try {
        const contractors = await Contractor.findAll();
        return res.status(200).json(contractors);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneContractorWithMaterials = async (req, res, next) => {
    const { id } = req.params;
    try {
    const contractor = await Contractor.findAll({
        where: {
            contractor_id: id
        },
        include: {
            required: false,
            model: Material,
            as: 'materials',
            attributes: [
                'material_id', 'name', 'image', 'unit_price', 'qualification',
                [Sequelize.fn('COALESCE', Sequelize.fn('AVG', Sequelize.col('materials->evaluationownermaterials.value')), 0), 'owner_rate'],
                [Sequelize.fn('COALESCE', Sequelize.fn('AVG', Sequelize.col('materials->evaluationenginnermaterials.value')), 0), 'engineer_rate']
            ],
            include: [
                {
                    model: EvaluationOwnerMaterial,
                    as: 'evaluationownermaterials',
                    attributes: [],
                },
                {
                    model: EvaluationEnginnerMaterial,
                    as: 'evaluationenginnermaterials',
                    attributes: [],
                },
            ],
            group: ['Material.material_id']
        },
    });
    if (!contractor[0].contractor_id) {
        return res.status(404).json({msg: 'contractor not found'});
    }
            return res.status(200).json(contractor);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllContractorProjects = async (req, res, next) => {
    const { contractor_id } = req.body;
    try {
        let ids = []
        const stageContractors = await StageContractor.findAll({
            attributes: ['stage_id'],
            where: {
                contractor_id: contractor_id
            }
        });
        for (let index = 0; index < stageContractors.length; index++) {
            ids.push(stageContractors[index].stage_id);
        }
        console.log(ids);
        const contractorProjects = await Project.findAll({
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
        return res.status(200).json(contractorProjects);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getContractorMaterialFromOneStage = async (req, res, next) => {
    const { id } = req.params;
    const { contractor_id } = req.body;
    try {   
        const [result, metaData] = await Database2.query(`SELECT m.name, m.unit_price, m.image, sm.price, sm.quatity
                                                                FROM materials m
                                                                INNER JOIN engineering_office.stagematerials sm
                                                                ON m.material_id = sm.material_id
                                                                WHERE m.contractor_id = :contractor_id AND sm.stage_id = :stage_id`,
                                                                    {
                                                                        replacements: { 
                                                                            contractor_id: contractor_id,
                                                                            stage_id: id
                                                                        },
                                                                        // type: QueryTypes.SELECT
                                                                    });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};
