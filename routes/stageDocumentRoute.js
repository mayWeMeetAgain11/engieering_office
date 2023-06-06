const express = require('express');
const multer = require('multer');

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/pdf/stage');
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

const stageDocumentController = require('../controller/stageDocumentController');

const stageValidation = require('../validation/stageValidation');

router.post('/stage-document/store', stageValidation.storeStageDocument, upload.single('pdf'), stageDocumentController.storeStageDocument);

module.exports = router;