const { Material } = require('../models');

exports.getAllMarerials = async (req, res, next) => {
    try {
        const materials = await Material.findAll({
            include: 'contractor'
        });
        return res.status(200).json(materials);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneMarerial = async (req, res, next) => {
    let { id } = req.params;
    try {
        const material = await Material.findByPk(id);
        return res.status(200).json(material);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// exports.getContractorMarerials = async (req, res, next) => {
//     let { id } = req.params;
//     try {
//         const materials = await Material.findAll({
//             where: {
//                 contractor_id: id
//             }
//         });
//         return res.status(200).json(materials);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

exports.getCategoryMarerials = async (req, res, next) => {
    let { category_id } = req.params;
    try {
        const materials = await Material.findAll({
            where: {
                category_id: category_id
            }
        });
        return res.status(200).json(materials);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// exports.storeMarerial = async (req, res, next) => {
//     let { contractor_id, unit_price, name, qualification, category_id } = req.body;
//     let { path } = req.file;
//     try {
//         const material = await Material.create({
//             name: name,
//             unit_price: unit_price,
//             category_id: category_id,
//             contractor_id: contractor_id,
//             qualification: qualification,
//             image: path,
//         });
//         return res.status(200).json(material);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

// exports.updateMarerial = async (req, res, next) => {
//     let { id } = req.params;
//     let { unit_price, name, qualification } = req.body;
//     try {
//         const material = await Material.findByPk(id);
//             material.name = name;
//             material.unit_price = unit_price;
//             material.qualification = qualification;
//             if (req.file) {
//                 material.image = req.file.path;
//             }
//             category.save();
//             return res.status(200).json({massage: 'material updated sucessfully'});
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

// exports.deleteMarerial = async (req, res, next) => {
//     let { id } = req.params;
//     try {
//         const material = await Material.findByPk(id);
//             await material.destroy();
//             return res.status(200).json({massage: 'material deleted sucessfully'});
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };