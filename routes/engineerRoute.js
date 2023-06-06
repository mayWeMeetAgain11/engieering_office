const express = require('express');

const router = express.Router();

const engineerController = require('../controller/engineerController');

router.get('/engineers', engineerController.getAllEngineers); 

router.get('/engineer/:id', engineerController.getOneEngineer); 

router.post('/engineer/store', engineerController.storeEngineer); 

router.put('/engineer/edit/:id', engineerController.updateEngineer); 

router.delete('/engineer/delete/:id', engineerController.deleteEngineer); 

router.get('/engineer-without-salary', engineerController.engineerWithoutSalary);

router.get('/engineer-deserve', engineerController.getAllEngineerDeserve); 

router.get('/engineer-deserve/:id', engineerController.getOneEngineerDeserveWithOrder); 

router.get('/engineer-projects/:id', engineerController.getAllEngineerProjects); 

module.exports = router;