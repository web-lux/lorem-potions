const express = require("express");
const { category_index, category_create_get, category_create_post, category_details, category_delete, category_modify_get, category_modify_post } = require("../controllers/categoryController");

const router = express.Router();

router.get("/", category_index);

router.get("/create", category_create_get);

router.post("/create", category_create_post);

router.get("/:id", category_details);

router.delete("/:id", category_delete);

router.get("/:id/modify", category_modify_get);

router.post("/:id/modify", category_modify_post);

module.exports = router;