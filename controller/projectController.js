const { Project, StageContractor, Stage, StageMaterial, Material, Database2 } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

exports.getAllFinishedProject = async (req, res, next) => {
    try {
        const project = await Project.findAll({
            where: {
                finished: true,
                accepted: true
            },
            include: ['bills', 'projectdocuments']
        });
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






