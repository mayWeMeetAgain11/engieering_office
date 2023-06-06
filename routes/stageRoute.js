const express = require('express');

const router = express.Router();

const stageController = require('../controller/stageController');

router.get('/stages-details/:id', stageController.getAllStageForOneProjectWithEveryThing);

router.get('/stages/:id', stageController.getAllStageForOneProject);

router.get('/stages-info/:id', stageController.getAllStageForOneProjectHabib);

router.post('/stage/store', stageController.stageStore);

router.get('/stage/:stage_id/:project_id', stageController.getOneStage);


module.exports = router;