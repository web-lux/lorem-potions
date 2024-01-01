const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Display all potions")
});

router.get("/create", (req, res) => {
    res.send("Form to create potion")
});

router.post("/create", (req, res) => {
    res.send("Call to create potion")
});

router.get("/:potionName", (req, res) => {
    const potionName = req.params.potionName;
    res.send(`Display details of potion: ${potionName}`)
});

router.delete("/:potionName", (req, res) => {
    const potionName = req.params.potionName;
    res.send(`Delete ${potionName}`)
});

router.get("/:potionName/modify", (req, res) => {
    const potionName = req.params.potionName;
    res.send(`Form to modify ${potionName}`)
});

router.post("/:potionName/modify", (req, res) => {
    const potionName = req.params.potionName;
    res.send(`Call to modify ${potionName}`)
});

module.exports = router;