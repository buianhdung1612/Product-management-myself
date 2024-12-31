const express = require('express')
const router = express.Router();
const multer = require('multer');

const upload = multer()

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/trash", controller.trash);
router.get("/create", controller.create);
router.post(
    "/create", 
    upload.single('thumbnail'), 
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
);
router.patch("/change-status", controller.changeStatusPatch);
router.patch("/change-multi", controller.changeMultiPatch);
router.patch("/delete", controller.delete);
router.patch("/delete-restore", controller.deleteRestore);
router.delete("/delete-destroy", controller.deleteDestroy);
router.patch("/change-position", controller.changePositionPatch);
router.patch(
    "/edit/:id", 
    upload.single("thumbnail"),
    uploadCloud.uploadSingle, 
    validate.createPost,
    controller.editPatch
);
router.get("/edit/:id", controller.edit);
router.get("/detail/:id", controller.detail);

module.exports = router;