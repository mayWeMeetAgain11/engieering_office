const express = require('express');

const router = express.Router();

const orderDocumentController = require('../controller/orderDocumentController');

router.post('/order-document/store', orderDocumentController.storeOrderDocument); // not implemented


module.exports = router;