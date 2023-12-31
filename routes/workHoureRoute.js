const express = require('express');

const router = express.Router();

const workHoureController = require('../controller/workHoureController');

const workHoureValidation = require('../validation/workHoureValidation'); //not finished yet

router.get('/engineer/work-houre/:id', workHoureController.getOneWorkHoure);

router.post('/engineer/store-work-houre/:id', workHoureController.storeWorkHoure);


module.exports = router;