const Potions = require("../models/potions");
const Categories = require("../models/categories");
const { body, validationResult } = require("express-validator");
const { decode } = require("html-entities");

const potion_index = async (req, res) => {
    try {
        const potions = await Potions.find().populate("category").exec();
        res.render("potionIndex", { title: "Potions", potions: potions, decode: decode, activeNav: "potions" });
    } catch (err) {
        console.error(err);
    }
};

const potion_create_get = async (req, res) => {
    try {
        const categories = await Categories.find().sort({ name: 1 }).exec();
        res.render("potionForm", { title: "Create potion", formAction: "/potions/create", potion: null, errors: null, categories: categories, decode: decode, activeNav: "potions" });
    } catch (err) {
        console.error(err);
    }
};

const potion_create_post = [
    body("name", "Name should be between 1 and 64 characters").trim().isLength({ min: 1, max: 64 }).escape(),
    body("description", "Description should be between 1 and 1800 characters").trim().isLength({ min: 1, max: 1800 }).escape(),
    body("category", "Category cannot be empty").trim().exists().isLength({ min: 1 }).escape(),
    body("price", "Price cannot be lower than 1").isFloat({ min: 1 }),
    body("number_in_stock", "Number in stock cannot be lower than 0").isFloat({ min: 1 }),
    body("password", "Password incorrect").equals(process.env.ADMIN_PW),
    async (req, res) => {
        const validationError = validationResult(req);
        const potion = new Potions({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
        });

        if (!validationError.isEmpty()) {
            const categories = await Categories.find().sort({ name: 1 }).exec();
            res.render("potionForm", { title: "Create potion", formAction: "/potions/create", potion: potion, errors: validationError.array(), categories: categories, decode: decode, activeNav: "potions" });
        } else {
            const potionExists = await Potions.findOne({ name: req.body.name }).collation({ locale: "fr" }).exec();

            if (potionExists) {
                console.log("Potion already exists ! Redirecting...");
                res.redirect(potionExists.url);
            } else {
                await potion.save();
                res.redirect(potion.url);
            }
        }
    }
]

const potion_details = async (req, res) => {
    try {
        const potion = await Potions.findOne({ _id: req.params.id }).populate("category").exec();
        if (potion === null) {
            res.redirect("/404");
        } else {
            res.render("potionDetails", { title: potion.name, potion: potion, decode: decode, activeNav: "potions" });
        }
    } catch (err) {
        console.error(err);
    }
};

const potion_delete = async (req, res) => {
    try {
        if (req.body === process.env.ADMIN_PW) {
            await Potions.findOneAndDelete({ _id: req.params.id });
            res.json({ redirect: "/potions" });
        } else {
            res.json({ redirect: null, err: "Incorrect password." });
        }

    } catch (err) {
        console.error(err);
    }
};

const potion_modify_get = async (req, res) => {
    try {
        const categories = await Categories.find().sort({ name: 1 }).exec();
        const potion = await Potions.findOne({ _id: req.params.id }).exec();
        if (potion === null) {
            res.redirect("/404");
        } else {
            res.render("potionForm", { title: "Modify potion", formAction: `/potions/${req.params.id}/modify`, potion: potion, errors: null, categories: categories, decode: decode, activeNav: "potions" });
        }
    } catch (err) {
        console.error(err)
    }
};

const potion_modify_post = [
    body("name", "Name should be between 1 and 64 characters").trim().isLength({ min: 1, max: 64 }).escape(),
    body("description", "Description should be between 1 and 1800 characters").trim().isLength({ min: 1, max: 1800 }).escape(),
    body("category", "Category cannot be empty").trim().isLength({ min: 1 }).escape(),
    body("price", "Price cannot be lower than 1").isFloat({ min: 1 }),
    body("number_in_stock", "Number in stock cannot be lower than 0").isFloat({ min: 1 }),
    body("password", "Password incorrect").equals(process.env.ADMIN_PW),
    async (req, res) => {
        const validationError = validationResult(req);
        const potion = new Potions({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            _id: req.params.id,
        });

        if (!validationError.isEmpty()) {
            const categories = await Categories.find().sort({ name: 1 }).exec();
            res.render("potionForm", { title: "Modify potion", formAction: `/potions/${req.params.id}/modify`, potion: potion, errors: validationError.array(), categories: categories, decode: decode, activeNav: "potions" });
        } else {
            const updatedPotion = await Potions.findByIdAndUpdate(req.params.id, potion, {});
            res.redirect(updatedPotion.url);
    }
}
];

module.exports = {
    potion_index,
    potion_create_get,
    potion_create_post,
    potion_details,
    potion_delete,
    potion_modify_get,
    potion_modify_post
};