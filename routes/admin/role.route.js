const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);
router.get("/permissions", controller.permissions);
router.get("/create", controller.create);
router.patch("/permissions", controller.permissionsPatch);
router.delete("/delete-destroy", controller.deleteDestroy);
router.post(
    "/create",
    validate.createPost, 
    controller.createPost
);
router.patch(
    "/edit/:id",
    validate.createPost, 
    controller.editPatch
);
router.get("/edit/:id", controller.edit);
router.get("/detail/:id", controller.detail);

module.exports = router;