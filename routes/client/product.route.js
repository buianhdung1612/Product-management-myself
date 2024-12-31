const express = require('express')
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);
router.get("/search", controller.search);
router.get("/detail/:slug", controller.detail);

module.exports = router;