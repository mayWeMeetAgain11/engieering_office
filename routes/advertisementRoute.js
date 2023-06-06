const express = require('express');

const router = express.Router();

const advertisementController = require('../controller/advertisementController');

const validation = require('../validation/advertisementValidation');

router.get('/advertisements', advertisementController.getAllAdvertisements);

router.get('/advertisement/id', advertisementController.getOneAdvertisement);

module.exports = router




