const express = require('express');
const multer = require('multer');

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdf/contractor');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        // new date().toISOString() + '-' + 
    }
});
const fileFilter = (req, file, cb) => {
        cb(null, true);
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const contractorDocumentController = require('../controller/contractorDocumentController');

const contractorValidation = require('../validation/contractorValidation');

router.post('/contractor-document/store', contractorValidation.storContractorDocument, upload.single('pdf'), contractorDocumentController.contractorDocumentStore);

module.exports = router;