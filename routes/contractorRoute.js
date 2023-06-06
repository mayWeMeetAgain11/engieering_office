const express = require('express');

const router = express.Router();

const contractorController = require('../controller/contractorController');

router.get('/contractors', contractorController.getAllContractors);

router.get('/contractor/:id', contractorController.getOneContractorWithMaterials);

router.post('/contractor-projects', contractorController.getAllContractorProjects);

router.post('/contractor-materials/:id', contractorController.getContractorMaterialFromOneStage);

module.exports = router;