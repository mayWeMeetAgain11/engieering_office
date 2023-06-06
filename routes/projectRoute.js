const express = require('express');

const router = express.Router();

const projectController = require('../controller/projectController');

router.get('/projects/active', projectController.getCurrentProjects);

router.get('/projects/finished', projectController.getAllFinishedProject);

router.get('/projects', projectController.getAllNotAcceptedProject);

router.put('/project/update-accepted/:id', projectController.updateProjectToAccepted);

router.put('/project/update-rejected/:id', projectController.updateProjectToUnaccepted);

router.get('/project/:id', projectController.getOneProject);

router.get('/projects-with-no-plan', projectController.getAllProjectsWiteNoPlan);

router.get('/projects/rejected', projectController.getRejectedProjects);




module.exports = router;