const express = require('express');
const multer = require('multer');

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdf');
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

const latencyDocumentController = require('../controller/latencyDocumentController');

const latencyDocumentValidation = require('../validation/latencyValidation');

router.post('/latency-document/store', latencyDocumentValidation.storeLatencyDocument, upload.single('pdf'), latencyDocumentController.storeLatencyDocument);

module.exports = router;