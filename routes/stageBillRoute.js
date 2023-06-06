const express = require('express');

const router = express.Router();

const stageBillController = require('../controller/stageBillController');

router.post('/stage-bill/store', stageBillController.storeStageBill);

module.exports = router;