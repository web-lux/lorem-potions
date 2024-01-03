const express = require("express");
const { potion_index, potion_create_get, potion_create_post, potion_details, potion_delete, potion_modify_get, potion_modify_post } = require("../controllers/potionController");

const router = express.Router();

router.get("/", potion_index);

router.get("/create", potion_create_get);

router.post("/create", potion_create_post);

router.get("/:id", potion_details);

router.delete("/:id", potion_delete);

router.get("/:id/modify", potion_modify_get);

router.post("/:id/modify", potion_modify_post);

module.exports = router;