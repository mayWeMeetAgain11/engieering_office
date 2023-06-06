const { OfficeOfferCategory } = require('../models');
const axios = require('axios');

exports.storeOfficeOffer = async (req, res, next) => {
    const { category_id, amount } = req.body;
    const { office_offer_id } = req.params;
    try {
        const officeOfferCategories = await OfficeOfferCategory.create({
            category_id: category_id,
            amount: amount,
            office_offer_id: office_offer_id
        }); 
        return res.status(200).json(officeOfferCategories);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};