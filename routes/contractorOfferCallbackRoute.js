const express = require('express');

const router = express.Router();

const contractorOfferCallbackController = require('../controller/contractorOfferCallbackController');

// const validation = require('../validation/contractorOfferCallbackController');

// router.get('/advertisements', advertisementController.getAllAdvertisements);

// router.get('/advertisement/id', advertisementController.getOneAdvertisement);

router.post('/contractor-offer-callback/store', contractorOfferCallbackController.storeContractorOfferCallback);

router.get('/contractor-offer-callbacks/:contractor_id', contractorOfferCallbackController.getAllAcceptedContractorOffers);

router.put('/contractor-offer/accept', contractorOfferCallbackController.acceptContractorOffer);

module.exports = router
