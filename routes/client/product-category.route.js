const express = require('express')
const router = express.Router();

const controller = require("../../controllers/client/product-category.controller");

router.get("/:slugCategory", controller.index);

module.exports = router;