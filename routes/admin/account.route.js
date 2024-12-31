const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const controller = require("../../controllers/admin/account.controller");
const uploadCLoud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.get("/my-profile", controller.myProfile);
router.get("/my-profile/edit", controller.myProfileEdit);
router.patch("/change-status", controller.changeStatusPatch);
router.delete("/delete-destroy", controller.deleteDestroy);
router.patch(
    "/my-profile/edit", 
    upload.single("avatar"),
    uploadCLoud.uploadSingle,
    controller.myProfileEditPatch
);
router.post(
    "/create", 
    upload.single("avatar"),
    uploadCLoud.uploadSingle,
    controller.createPost
);
router.get("/edit/:id", controller.edit);
router.get("/detail/:id", controller.detail);
router.get("/change-password/:id", controller.changePassword);
router.patch(
    "/edit/:id", 
    upload.single("avatar"),
    uploadCLoud.uploadSingle,
    controller.editPatch
);
router.patch("/change-password/:id", controller.changePasswordPatch);

module.exports = router;