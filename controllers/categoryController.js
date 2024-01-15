const Categories = require("../models/categories");
const Potions = require("../models/potions");
const { body, validationResult } = require("express-validator");
const { decode } = require("html-entities");

const category_index = async (req, res) => {
    try {
        const categories = await Categories.find().exec();
        res.render("categoryIndex", { title: "Categories", categories: categories, decode: decode });
    } catch (err) {
        console.error(err);
    };
};

const category_create_get = (req, res) => {
    res.render("categoryForm", { title: "Create category", formAction: "/categories/create", category: null, errors: null });
};

const category_create_post = [
    body("name", "Name should be between 1 and 64 characters").trim().isLength({ min: 1, max: 64 }).escape(),
    body("description", "Description should be between 1 and 1800 characters").trim().isLength({ min: 1, max: 1800 }).escape(),
    async (req, res, next) => {
        const validationError = validationResult(req);
        const category = new Categories({ name: req.body.name, description: req.body.description });

        if (!validationError.isEmpty()) {
            res.render("categoryForm", {
                title: "Create category", formAction: "/categories/create", category: category, errors: validationError.array()
            });
        } else {
            const categoryExists = await Categories.findOne({ name: req.body.name }).collation({ locale: "fr" }).exec();
    
            if (categoryExists) {
                res.redirect(categoryExists.url);
            } else {
                await category.save();
                res.redirect(category.url);
            }
        }
    }
];

const category_details = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id).exec();
        const potions = await Potions.find({ category: req.params.id }).exec();

        if (category === null) {
            res.redirect("/404");
        } else {
            res.render("categoryDetails", { title: category.name, category: category, potions: potions.length === 0 ? null : potions, decode: decode });
        };

    } catch (err) {
        console.error(err);
        res.redirect("404");
    };
};

const category_delete = async (req, res) => {
    try {
        const potions = await Potions.find({ category: req.params.id }).exec();
        
        if (potions.length === 0) {
            await Categories.findOneAndDelete({ _id: req.params.id }).exec();
            res.json({ redirect: "/categories", err: null });
        } else {
            res.json({ redirect: null, err: "Suppression impossible: la catégorie contient encore des élements." });
        }

    } catch (err) {
        console.error(err);
    }
};

const category_modify_get = async (req, res) => {
    try {
        const category = await Categories.findOne({ _id: req.params.id }).exec();

        if (category === null) {
            res.redirect("/404");
        } else {
            res.render("categoryForm", { title: "Modify category", formAction: `/categories/${req.params.id}/modify`, category: category, errors: null });
        }

    } catch (error) {
        console.error(err);
        res.redirect("404");
    }
};

const category_modify_post = [
    body("name", "Name should be between 1 and 64 characters").trim().isLength({ min: 1, max: 64 }).escape(),
    body("description", "Description should be between 1 and 1800 characters").trim().isLength({ min: 1, max: 1800 }).escape(),
    async (req, res, next) => {
        const validationError = validationResult(req);
        const category = new Categories({ name: req.body.name, description: req.body.description, _id: req.params.id });

        if (!validationError.isEmpty()) {
            res.render("categoryForm", {
                title: "Modify category", formAction: `/categories/${req.params.id}/modify`, category: category, errors: validationError.array()
            });
        } else {
            const updatedCategory = await Categories.findByIdAndUpdate(req.params.id, category, {}).exec();
            res.redirect(updatedCategory.url);
        }
    }
];

module.exports = {
    category_index,
    category_create_get,
    category_create_post,
    category_details,
    category_delete,
    category_modify_get,
    category_modify_post
};