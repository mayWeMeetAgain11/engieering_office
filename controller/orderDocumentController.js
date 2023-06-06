const { OrderDocument } = require('../models');


// not implemented
exports.storeOrderDocument = async (req, res, next) => {
    let { id } = req.params;
    let orderDocument = [];
    try {
        for (let index = 0; index < req.body.length; index++) {
            const document = await OrderDocument.create({
                document: req.file[index].path,
                comment: req.body[index].comment,
                engineer_order_id: id
            });
            orderDocument.push(document);
        }
        return res.status(200).json(orderDocument);
    } catch (error) {
        return res.status(500).json(error);
    }
};