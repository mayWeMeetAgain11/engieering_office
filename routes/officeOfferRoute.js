const express = require('express');
const multer = require('multer');
const router = express.Router();

const officeOfferController = require('../controller/officeOfferController');

const validation = require('../validation/officeOfferValidation');

const fileStoragem = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/officeOffers');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        // new date().toISOString() + '-' + 
    }
});
const fileFilterm = (req, file, cb) => {
        cb(null, true);
};

const officeOfferUpload = multer({ storage: fileStoragem, fileFilter: fileFilterm });

router.get('/office-offers', officeOfferController.getAllOfficeOffers);

router.get('/office-offer/id', officeOfferController.getOneOfficeOffer);

router.get('/office-offers/id', officeOfferController.getOfficeOffersForOneOffice);

router.post('/office-offer/store', officeOfferUpload.single('image'), officeOfferController.storeOfficeOffer);

// router.put('/advertisement/edit/:id', officeOfferUpload.single('image'), officeOfferController.updateAdvertisement);

// router.put('/advertisement/change-status/:id', officeOfferController.changeAdvertisementStatus);

// router.delete('/advertisement/delete/:id', officeOfferController.deleteAdvertisement);

module.exports = router




