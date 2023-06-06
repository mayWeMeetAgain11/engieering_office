const { Office } = require('../models');

// exports.storeOffice = async (req, res, next) => {
//     const { name } = req.body;
//     try {
//         const office = await Office.create({
//             name: name,
//         });
//         return res.status(200).json({massage: "office added sucessfully", office_id: office.office_id});
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };