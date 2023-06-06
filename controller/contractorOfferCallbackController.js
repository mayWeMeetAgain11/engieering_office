const { where } = require('sequelize/types');
const { ContractorOfferCallback, Contractor, OfficeOfferCategory } = require('../models');
// const { Op } = require('sequelize');
// const sequelize = require('sequelize');

exports.storeContractorOfferCallback = async (req, res, next) => {
    const {contractor_id} = req.params;
    const { category_ids, prices } = req.body;
    try {
        //index i in prices array is for index i in category_ids array
        if (category_ids.length !== prices.length) {
            return res.status(500).json("there is an error in the request, there is one category or more has no offer");
        }
        for(let index = 0; index < category_ids.length; index++) {
            const {data} = await ContractorOfferCallback.create({
                contractor_offer_category_id: category_ids[index],
                price: prices[index],
                contractor_id: contractor_id,
                accepted: false,
            });
        }
        return res.status(200).json({message: "contractor offer added successfully"});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// for contractor, this api should move to public project
exports.getAllAcceptedContractorOffers = async (req, res, next) => {
    const {contractor_id} = req.params;
    try {
        const contractorOffers = await ContractorOfferCallback.findAll({
            where: {
                contractor_id: contractor_id,
                accepted: true
            }
        });
        return res.status(200).json(contractorOffers);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.acceptContractorOffer = async (req, res, next) => {
    const {contractor_offer_callback_id} = req.params;
    try {
        const contractorOffer = await ContractorOfferCallback.findByPk(contractor_offer_callback_id);
        contractorOffer.accepted = true;
        await contractorOffer.save();
        return res.status(200).json({message: "contractor offer accepted successfully"});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.getAllContractorOffersForOneOfficeOffer = async (req, res, next) => {
    const {office_offer_id} = req.params;
    try {
        const contractorOffersCallback = await Contractor.findAll({
            include: {
                model: ContractorOfferCallback,
                as: "contractorofferscallback",
                required: true,
                include: {
                    model: OfficeOfferCategory,
                    as: "categories",
                    required: true,
                    where: {
                        office_offer_id: office_offer_id
                    },
                    include: {
                        model: Category,
                        as: "categor"
                    }
                }
            }
        });
        return res.status(200).json(contractorOffersCallback);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};