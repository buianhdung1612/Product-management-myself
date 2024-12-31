const expres = require("express");
const router = expres.Router();
const multer = require("multer");

const upload = multer();

const controller = require("../../controllers/admin/blog-category.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
    "/create", 
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    controller.createPost
);
router.patch("/change-position", controller.changePositionPatch);
router.patch("/change-status", controller.changeStatusPatch);
router.delete("/delete-destroy", controller.deleteDestroy);
router.get("/detail/:id", controller.detail);
router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id", 
    upload.single("thumbnail"),
    uploadCloud.uploadSingle,
    controller.editPatch
);

module.exports = router;