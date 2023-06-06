const express = require('express');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/categories');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname );
        // new date().toISOString() + '-' + 
    }
});
const fileFilter = (req, file, cb) => {
        cb(null, true);
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const router = express.Router();

const categoryController = require('../controller/categoryController');

router.get('/categories', categoryController.getAllCategories);

router.get('/category/:id', categoryController.getOneCategorie);

router.put('/category/edit/:id', upload.single('image'), categoryController.updateCatrgory); // not implemented

router.delete('/category/delete/:id', categoryController.deleteCategory);

module.exports = router;






