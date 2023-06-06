const express = require('express');

const router = express.Router();

const officeOfferCategory = require('../controller/officeOfferCategoryController');

router.post('/office-offer-category/store', officeOfferCategory.storeOfficeOffer);


module.exports = router;