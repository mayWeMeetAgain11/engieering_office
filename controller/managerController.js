const { Manager, Owner, Engineer, Contractor } = require('../models');


exports.getAllManagers = async (req, res, next) => {
    try {
        const managers = await Manager.findAll();
        return res.status(200).json(managers);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneManager = async (req, res, next) => {
    const { id } = req.params;
    try {
        const manager = await Manager.findByPk(id);
        if (manager === null) {
            return res.status(404).json({massage: "not found"});
        } else {
            return res.status(200).json(manager);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storeManager = async (req, res, next) => {
    const { first_name, 
        last_name, 
        manager_id, 
        email, 
        password,   
        card_id, 
        phone,
        address,
        office_id,
        salary } = req.body;
    try {
        const owner = await Owner.findOne({
            where: {
                email: email
            }
        });
        const engineer = await Engineer.findOne({
            where: {
                email: email
            }
        });
        const contractor = await Contractor.findOne({
            where: {
                email: email
            }
        });
        if (owner || engineer || contractor) {
            return res.status(401).json({massage: 'this email is already exist'});
        }
        const manager = await Manager.create({
            first_name: first_name,
            last_name: last_name,
            manage_id: manager_id,
            email: email,
            phone: phone,
            address: address,
            password: password,
            office_id: office_id,
            card_id: card_id,
            salary: salary,
        });
        return res.status(200).json(manager);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: error.errors.map(e => e.message)
            })
        } else {
            return res.status(500).json(error);
        }
    }
};

exports.updateManager = async (req, res, next) => {
    let { id } = req.params;
    const { first_name, 
        last_name, 
        manager_id, 
        email, 
        password,   
        card_id, 
        phone,
        address,
        office_id,
        salary } = req.body;
    try {
        const owner = await Owner.findOne({
            where: {
                email: email
            }
        });
        const engineer = await Engineer.findOne({
            where: {
                email: email
            }
        });
        const contractor = await Contractor.findOne({
            where: {
                email: email
            }
        });
        if (owner || engineer || contractor) {
            return res.status(401).json({massage: 'this email is already exist'});
        }
        const manager = await Manager.update({
            first_name: first_name,
            last_name: last_name,
            manage_id: manager_id,
            email: email,
            phone: phone,
            address: address,
            password: password,
            office_id: office_id,
            card_id: card_id,
            salary: salary,
        },
        {
            where: {
                manager_id: id
            }
        });
        return res.status(200).json({massage: "manager updated sucessfully"});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                msg: error.errors.map(e => e.message)
            })
        } else {
            // next(new ErrorResponse(`Sorry, could not save ${req.body.name}`, 404))
            return res.status(500).json(error);
        }
    }
};

exports.deleteManager = async (req, res, next) => {
    const { id } = req.params;
    try {
        const manager = await Manager.destroy({
            where: {
                manager_id: id
            }
        });
        return res.status(200).json({massage: "manager deleted sucessfully"});
    } catch (error) {
        return res.status(500).json(error);
    }
};