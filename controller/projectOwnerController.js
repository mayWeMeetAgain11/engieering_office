const { ProjectOwner } = require('../models');



exports.storeOwnerProject = async (req, res, next) => {

    const {owner_id} = req.body;
    const {id} = req.params; //copy_project_id

    try {
        const projectOwner = await ProjectOwner.findOne({
            attributes: [
                "owner_id"
            ],
            where: {
                copy_project_id: id,
                owner_id: owner_id
            },
        });
        if (!projectOwner) {
            const owner = await ProjectOwner.create({
                owner_id: owner_id,
                copy_project_id: id
            });
            return res.status(200).json(owner);
        }
        else {
            return res.status(401).json({msg: "this user is already exists in your project!"});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};