const express = require('express');
const multer = require('multer');

const router = express.Router();

const materialController = require('../controller/materialController');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/materials');
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


router.get('/materials', materialController.getAllMarerials);

router.get('/material/:id', materialController.getOneMarerial);

router.get('/material-category/:category_id', materialController.getCategoryMarerials);


module.exports = router;





