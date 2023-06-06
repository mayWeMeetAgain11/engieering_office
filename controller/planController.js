const { Plan, Database1 } = require('../models');

exports.getAllPlans = async (req, res, next) => {
    try {
        const plans = await Plan.findAll({
            where: {
                parent_id: 0,
            }
        });
        return res.status(200).json(plans);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOnePlan = async (req, res, next) => {
    const { id } = req.params;
    try {
        const plans = await Plan.findAll({
            attributes: ['id', 'name', 'parent_id'],
            where: {
                p_id: id,
            }
        });
        return res.status(200).json(plans);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.storePlan = async (req, res, next) => {
    try {
        const [result, metaData] = await Database1.query('INSERT INTO plans (id, name, parent_id) VALUES :plans', {
            replacements: { 
                plans: req.body.stages,
            },
        });
        const lastRecord = await Plan.findOne({
            attributes: ['p_id'],
            order: [
                ['plan_id', 'DESC'], 
            ]
        });
        await Database1.query('ALTER TABLE plans CHANGE p_id p_id INT(11) NOT NULL DEFAULT :p_id', {
            replacements: { 
                p_id: lastRecord.p_id + 1,
            },
        });
        return res.status(200).json({massage: `plan added sucessfully`, plan_id: lastRecord.p_id});
    } catch (error) {
        return res.status(500).json(error);
    }
};

// exports.storePlan = async (req, res, next) => {
//     try {
//         const { id, name } = req.body;
//         const roots = {};
//         const nodes = [];
//         if (!id) {
//             const root = await Plan.create({
//                 name: name
//             });
//             roots.id = root.plan_id;
//         } else {
//             const root = await Plan.findByPk(id);
//             roots.id = root.root_plan_id
//         }
//         for (const [key, value] of Object.entries(req.body)) {
//             if (key === "id" || key === "name") {
//                 continue;
//             } else {
//                 // console.log(`${key}: ${value}`);
//                 const child = await Plan.create({
//                     name: value,
//                     parent_plan_id: id || roots.id,
//                     root_plan_id: roots.id
//                 });
//                 nodes.push(child);
//             }
//         }
//         return res.status(200).json(nodes);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

// exports.deleteNode = async (req, res, next) =>{
//     const { id } = req.params;
//     try {
//         const node = await Plan.destroy({
//             where: {
//                 plan_id: id
//             }
//         });
//         return res.status(200).json({massage: "stage deleted sucessfully"});
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

// exports.updateNode = async (req, res, next) =>{
//     const { id } = req.params;
//     const { name } = req.body;
//     try {
//         const node = await Plan.update({
//             name: name
//         },
//         {
//             where: {
//                 plan_id: id
//             }
//         });
//         return res.status(200).json({massage: "stage updated sucessfully"});
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };



