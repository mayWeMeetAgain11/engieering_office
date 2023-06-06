const express = require('express');

const router = express.Router();

const stageEngineerController = require('../controller/stageEngineerController');

const validation = require('../validation/stageValidation');

router.post('/stage-engineer/store', validation.stageUpdate, stageEngineerController.storeEngineerInStage);

router.delete('/stage-engineer/delete/:stage_id/:engineer_id', stageEngineerController.deleteEngineerFromStage);

module.exports = router;