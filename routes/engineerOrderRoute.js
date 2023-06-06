const express = require('express');

const router = express.Router();

const engineerOrderController = require('../controller/engineerOrderController');

const engineerOrderValidation = require('../validation/engineerOrderValidation');

router.get('/engineer-order/accepted', engineerOrderController.getAcceptedEngineerOrder); 

router.get('/engineer-orders', engineerOrderController.getAllEngineerOrder); 

router.get('/engineer-order/rejected', engineerOrderController.getNotAcceptedEngineerOrder); 

router.get('/engineer-order/:id', engineerOrderController.getOneEngineerOrderWithDocument); 

router.put('/engineer-order/edit/:id', engineerOrderController.updateEngineerOrderToAccepted); 

router.post('/engineer-order/store', engineerOrderValidation.storeEngineerOrder, engineerOrderController.storeEngineerOrder); 


module.exports = router;