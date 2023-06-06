const express = require('express');

const router = express.Router();

const engineerAccountingController = require('../controller/engineerAccountingController');

router.get('/engineer-accounting-salary/:id', engineerAccountingController.getAllEngineerSalaries);

router.post('/engineer-accounting/store/:id', engineerAccountingController.storeEngineerAccount);

router.get('/engineer-accounting-advance-payment/:id', engineerAccountingController.getOneEngineerAdvancePayments);

module.exports= router;