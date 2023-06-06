const express = require('express');

const router = express.Router();

const authController = require('../controller/authController');

router.post('/login', authController.login);

router.put('/engineer-logout/:id', authController.engineerlogout);

router.put('/manager-logout/:id', authController.managerlogout);

// router.post('/owner-login', authController.ownerLogin);

// router.post('/contractor-login', authController.contractorLogin);

module.exports = router;