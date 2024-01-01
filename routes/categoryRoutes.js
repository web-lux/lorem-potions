const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Display all categories")
});

router.get("/create", (req, res) => {
    res.send("Display form to create new category")
});

router.post("/create", (req, res) => {
    res.send("Call to create new category")
});

router.get("/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    res.send(`You looked for category: ${categoryName}`);
});

router.delete("/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    res.send(`Call to delete category: ${categoryName}`);
});

router.get("/:categoryName/modify", (req, res) => {
    const categoryName = req.params.categoryName;
    res.send(`Form to modify category: ${categoryName}`);
});

router.post("/:categoryName/modify", (req, res) => {
    const categoryName = req.params.categoryName;
    res.send(`Call to modify category: ${categoryName}`);
});

module.exports = router;