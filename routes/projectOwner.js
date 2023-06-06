const express = require('express');

const router = express.Router();

const projectController = require('../controller/projectOwnerController');


router.post('/owner-project/store/:id', projectController.storeOwnerProject);