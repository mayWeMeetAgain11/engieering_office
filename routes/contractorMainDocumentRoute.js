// const express = require('express');
// const multer = require('multer');

// const router = express.Router();

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/pdf/contractor');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//         // new date().toISOString() + '-' + 
//     }
// });
// const fileFilter = (req, file, cb) => {
//         cb(null, true);
// };

// const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// const contractorMainDocumentController = require('../controller/contractorMainDocumentController');

// router.post('/contractor-main-document/store', upload.single('pdf'),contractorMainDocumentController.contractorMainDocumentStore);

// module.exports = router;