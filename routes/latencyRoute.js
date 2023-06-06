const express = require('express');

const router = express.Router();

const latencyController = require('../controller/latencyController');

const latencyValiation = require('../validation/latencyValidation');

router.get('/accepted-latency', latencyController.getAllAcceptedLatency);

router.get('/latencies', latencyController.getAllLatency);

router.get('/notaccepted-latency', latencyController.getNotAcceptedLatency);

router.get('/latency/:id', latencyController.getOneLatency);

router.post('/latency/store', latencyValiation.storeLatency, latencyController.storeLatency);

module.exports = router;