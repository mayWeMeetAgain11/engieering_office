const { OfficeOffer, OfficeOfferCategory } = require('../models');
const axios = require('axios');

//for contractors
exports.getAllOfficeOffers = async (req, res, next) => {
    try {
        const officeOffers = await OfficeOffer.findAll({
            where: {
                activated: true
            }
        });
        return res.status(200).json(officeOffers);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneOfficeOffer = async (req, res, next) => {
    const { id } = req.params; //office_offer_id
    try {
        const officeOffer = await OfficeOffer.findAll({
            where: {
                office_offer_id: id
            }
        });
        return res.status(200).json(officeOffer);
    } catch (error) {
        return res.status(500).json(error); 
    }
};

exports.getOfficeOffersForOneOffice = async (req, res, next) => {
    const { id } = req.params; //manager_id
    try {
        const officeOfferId = await Manager.findOne({
            attributes: [
                office_id
            ],
            where: {
                manager_id: id
            }
        });
        const officeOffer = await OfficeOffer.findAll({
            where: {
                office_id: officeOfferId.office_id
            }
        });
        return res.status(200).json(officeOffer);
    } catch (error) {
        return res.status(500).json(error); 
    }
};

exports.storeOfficeOffer = async (req, res, next) => {
    // const {offer_id} = req.params;
    const { manager_id, title, comment, category_ids, amounts} = req.body;
    try {
        const officeOfferId = await Manager.findOne({
            attributes: [
                office_id
            ],
            where: {
                manager_id: manager_id
            }
        });
        const officeOffer = await OfficeOffer.create({
            title: title,
            comment: comment,
            activated: false,
            office_id: officeOfferId.office_id
        }); 
        for(let index = 0; category_ids.length; index++) {
            const {data} = await axios.post(`http://localhost:3000/office-offer-category/store`, {
                category_id: category_ids[index],
                amount: amounts[index]
            });
        }
        
        // const officeOfferCategories = await OfficeOfferCategory.create({
        //     category_id: category_id,
        //     amount: amount,
        //     office_offer_id: office_offer_id
        // }); 
        return res.status(200).json(officeOffer);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// exports.updateAdvertisement = async (req, res, next) => {
//     const { contractor_id } = req.body;
//     const { id } = req.params; //advertisement_id
//     const { path } = req.file;
//     try {
//         const advertisement = await Advertisement.update({
//             image: image,
//             status: 0,
//             contractor_id: contractor_id,
//         },{
//             where: {
//                 advertisement_id: id
//             }
//         });
//         return res.status(200).json(advertisement);
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// };
// exports.changeAdvertisementStatus = async (req, res, next) => {
//     const { status } = req.body;
//     const { id } = req.params; //advertisement_id
//     try {
//         const advertisement = await Advertisement.update({
//             status: status,
//         },{
//             where: {
//                 advertisement_id: id
//             }
//         });
//         return res.status(200).json(advertisement);
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// };

// exports.deleteAdvertisement = async (req, res, next) => {
//     let { advertisement_id } = req.params;
//     try {
//         const advertisement = await Advertisement.findByPk(advertisement_id);
//             await advertisement.destroy();
//             return res.status(200).json({massage: 'advertisement deleted sucessfully'});
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// };