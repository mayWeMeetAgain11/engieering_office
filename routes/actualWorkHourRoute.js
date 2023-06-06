const express = require('express');

const router = express.Router();

const absenceOrderController = require('../controller/actualWorkHourController');

router.get('/actual-work-hours', absenceOrderController.getOneEngineerWorksInDay);

module.exports = router;