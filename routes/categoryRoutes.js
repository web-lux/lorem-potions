const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("categoryIndex", { title: "Categories index" });
});

router.get("/create", (req, res) => {
    res.render("categoryForm", { title: "Create category", formAction: "/categories/create" });
});

router.post("/create", (req, res) => {
    res.send("Call to create new category");
});

router.get("/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    res.render("categoryDetails", {title: categoryName});
});

router.delete("/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    res.send(`Call to delete category: ${categoryName}`);
});

router.get("/:categoryName/modify", (req, res) => {
    const categoryName = req.params.categoryName;
    res.render("categoryForm", { title: `Modify category ${categoryName}`, formAction: `/categories/${categoryName}/modify`});
});

router.post("/:categoryName/modify", (req, res) => {
    const categoryName = req.params.categoryName;
    res.send(`Call to modify category: ${categoryName}`);
});

module.exports = router;