const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
);
router.patch("/change-position", controller.changePositionPatch);
router.patch("/change-status", controller.changeStatusPatch);
router.delete("/delete-destroy", controller.deleteDestroy);
router.get("/edit/:id", controller.edit);
router.get("/detail/:id", controller.detail);
router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.editPatch
);
module.exports = router;