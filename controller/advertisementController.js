const { Advertisement } = require('../models');

exports.getAllAdvertisements = async (req, res, next) => {
    try {
        const advertisements = await Advertisement.findAll();
        return res.status(200).json(advertisements);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneAdvertisement = async (req, res, next) => {
    const { id } = req.params; //advertisement_id
    try {
        const advertisement = await Advertisement.findAll({
            where: {
                advertisement_id: id
            }
        });
        return res.status(200).json(advertisement);
    } catch (error) {
        return res.status(500).json(error);
    }
};
