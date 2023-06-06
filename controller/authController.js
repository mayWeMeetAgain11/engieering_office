const { Manager, Engineer, Owner, Contractor } = require('../models');

exports.login =  (req, res, next) => {
    const { email, password, type } = req.body;
    try {
        if (type === "manager") {
            managerLogin(email, password, res);
        } else if (type === "engineer") {
            enginnerLogin(email, password, res);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// exports.contractorLogin = async (req, res, next) => {
//     let { email, password } = req.body;
//     try {
//         const contractor = await Contractor.findOne({
//             where: {
//                 email: email
//             }
//         });
//         if (!contractor) {
//             return res.status(401).json({massage: 0});
//         } else {
//             if (contractor.password === password) {
//                 return res.status(200).json(contractor);
//             }
//             return res.status(401).json({massage: 1});
//         }
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

exports.engineerlogout = async (req, res, next) => {
    let { id } = req.params;
    try {
        const engineer = await Engineer.findByPk(id);
        engineer.online = false;
        engineer.save();
        return res.status(200).json({ engineer_online: engineer.online });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.managerlogout = async (req, res, next) => {
    let { id } = req.params;
    try {
        const manager = await Manager.findByPk(id);
        manager.online = false;
        manager.save();
        return res.status(200).json({ manager_online: manager.online });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// exports.ownerLogin = async (req, res, next) => {
//     const { email, password } = req.body;
//     const owner = await Owner.findOne({
//         where: {
//             email: email
//         }
//     });
//     if (!owner) {
//         return res.status(401).json({massage: 0});
//     } else {
//         if (owner.password === password) {
//             return res.status(200).json(owner);
//         }
//         return res.status(401).json({massage: 1});
//     }
// };









async function managerLogin(email, password, res) {
    const manager = await Manager.findOne({
        where: {
            email: email
        }
    });
    if (!manager) {
        return res.status(401).json({massage: 0});
    } else {
        if (manager.password === password) {
            manager.online = true;
            manager.save();
            return res.status(200).json(manager);
        }
        return res.status(401).json({massage: 1});
    }
};

async function enginnerLogin(email, password, res) {
    const enginner = await Engineer.findOne({
        where: {
            email: email
        }
    });
    if (!enginner) {
        return res.status(401).json({massage: 0});
    } else {
        if (enginner.password === password) {
            enginner.online = true;
            enginner.save();
            return res.status(200).json(enginner);
        }
        return res.status(401).json({masage: 1});
    }
};