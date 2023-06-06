const express = require('express');

const router = express.Router();

const stageBillController = require('../controller/stageBillController');

const stageValidation = require('../validation/stageValidation');

router.post('/stage-bill/store', stageValidation.storeStageBill, stageBillController.storeStageBill);

module.exports = router;