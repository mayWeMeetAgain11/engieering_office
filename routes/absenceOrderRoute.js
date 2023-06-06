const express = require('express');

const router = express.Router();

const absenceOrderController = require('../controller/absenceOrderController');

router.get('/absence-orders', absenceOrderController.getAllAbsenceOrder);

module.exports = router;