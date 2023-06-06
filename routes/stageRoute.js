const express = require('express');

const router = express.Router();

const stageController = require('../controller/stageController');

const stageValidation = require('../validation/stageValidation');

router.get('/stages-details/:id', stageController.getAllStageForOneProjectWithEveryThing);

router.get('/stages/:id', stageController.getAllStageForOneProject);

router.post('/stage/store', stageValidation.storeStage, stageController.stageStore);

router.get('/stage/:stage_id/:project_id', stageController.getOneStage);


module.exports = router;