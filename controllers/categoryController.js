const Categories = require("../models/categories");
const { body, validationResult } = require("express-validator");
const { decode } = require("html-entities");

const category_index = (req, res) => {
    Categories.find()
        .then(data => res.render("categoryIndex", { title: "Categories", categories: data, decode: decode }))
        .catch (err => console.log(err));
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

const category_details = (req, res) => {
    Categories.findOne({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data === null) {
                res.redirect("/404");
            } else {
                res.render("categoryDetails", { title: data.name, category: data, decode: decode });
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect("404");
        });
};

const category_delete = (req, res) => {
    Categories.findOneAndDelete({ _id: req.params.id })
        .then(data => res.json({ redirect: "/categories" }))
        .catch(err => console.log(err));
};

const category_modify_get = (req, res) => {
    Categories.findOne({ _id: req.params.id })
    .exec()
    .then(data => {
        if (data === null) {
            res.redirect("/404");
        } else {
            res.render("categoryForm", { title: "Modify category", formAction: `/categories/${req.params.id}/modify`, category: data, errors: null });
    }
})
    .catch(err => {
        res.redirect("404");
    });
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
            const updatedCategory = await Categories.findByIdAndUpdate(req.params.id, category, {});
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