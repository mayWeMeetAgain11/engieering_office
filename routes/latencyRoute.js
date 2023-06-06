const express = require('express');

const router = express.Router();

const latencyController = require('../controller/latencyController');

router.get('/accepted-latency', latencyController.getAllAcceptedLatency);

router.get('/latencies', latencyController.getAllLatency);

router.get('/notaccepted-latency', latencyController.getNotAcceptedLatency);

router.get('/latency/:id', latencyController.getOneLatency);

router.post('/latency/store', latencyController.storeLatency);

module.exports = router;