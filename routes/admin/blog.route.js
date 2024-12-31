const expres = require("express");
const multer = require("multer");

const router = expres.Router();

const upload = multer();

const controller = require("../../controllers/admin/blog.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);
router.get("/trash", controller.trash);
router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
);
router.patch("/delete", controller.delete);
router.patch("/delete-restore", controller.deleteRestore);
router.delete("/delete-destroy", controller.deleteDestroy);
router.patch("/change-status", controller.changeStatusPatch);
router.patch("/change-multi", controller.changeMultiPatch);
router.patch("/change-position", controller.changePositionPatch);
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