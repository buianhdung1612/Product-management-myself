const express = require('express')
const router = express.Router();
const multer = require("multer");

const upload = multer();

const controller = require("../../controllers/client/user.controller");
const userMiddleware = require("../../middlewares/client/user.middleware");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/login", controller.login);
router.post("/login", controller.loginPost);
router.get("/register", controller.register);
router.post("/register", controller.registerPost);
router.get("/logout", controller.logout);
router.get("/password/forgot", controller.forgotPassword);
router.post("/password/forgot", controller.forgotPasswordPost);
router.get("/password/otp", controller.otpPassword);
router.post("/password/otp", controller.otpPasswordPost);
router.get("/password/reset", controller.resetPassword);
router.post("/password/reset", controller.resetPasswordPost);
router.get("/profile", userMiddleware.requireAuth, controller.profile);
router.get(
    "/profile/edit/:id", 
    userMiddleware.requireAuth, 
    controller.editProfile
);
router.patch(
    "/profile/edit/:id", 
    userMiddleware.requireAuth, 
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    controller.editProfilePatch
);

module.exports = router;