const { Category } = require('../models');

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.findAll({
            where: {
                parent_category_id: null
            }
        });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.getOneCategorie = async (req, res, next) => {
    let { id } = req.params;
    try {
        const category = await Category.findAll({
            where: {
                parent_category_id: id
            }
        });
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// not implemented
exports.updateCatrgory = async (req, res, next) => {
    let { id } = req.params;
    let { name, evaluation_type, parent_category_id } = req.body;
    try {
        const category = await Category.findByPk(id);
            category.name = name;
            category.evaluation_type = evaluation_type;
            category.parent_category_id = parent_category_id;
            if (req.file) {
                category.image = req.file.path;
            }
            category.save();
            return res.status(200).json({massage: 'category updated sucessfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    let { id } = req.params;
    try {
        const category = await Category.findByPk(id);
            category.destroy();
            return res.status(200).json({massage: 'category deleted sucessfully'});
    } catch (error) {
        return res.status(500).json(error);
    }
};