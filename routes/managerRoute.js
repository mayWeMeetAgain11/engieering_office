const express = require('express');

const router = express.Router();

const managerController = require('../controller/managerController');

router.get('/managers', managerController.getAllManagers);

router.get('/manager/:id', managerController.getOneManager);

router.post('/manager/store', managerController.storeManager);

router.put('/manager/edit/:id', managerController.updateManager);

router.delete('/manager/delete/:id', managerController.deleteManager);


module.exports = router;