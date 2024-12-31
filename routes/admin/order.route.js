const expres = require("express");
const router = expres.Router();

const controller = require("../../controllers/admin/order.controller");

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status", controller.changeStatusPatch);
router.delete("/delete-destroy", controller.deleteDestroy);

module.exports = router;