const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const blogRoute = require("./blog.route");
const settingRoute = require("./setting.route");
const blogCategoryRoute = require("./blog-category.route");
const informationRoute = require("./information.route");
const orderRoute = require("./order.route");
const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
    const prefixAdmin = `/${systemConfig.prefixAdmin}`;
    app.use(`${prefixAdmin}/dashboard`, authMiddleware.requireAuth, dashboardRoute);
    app.use(`${prefixAdmin}/products`, authMiddleware.requireAuth, productRoute);
    app.use(`${prefixAdmin}/products-category`, authMiddleware.requireAuth, productCategoryRoute);
    app.use(`${prefixAdmin}/roles`, authMiddleware.requireAuth, roleRoute);
    app.use(`${prefixAdmin}/accounts`, authMiddleware.requireAuth, accountRoute);
    app.use(`${prefixAdmin}/auth`, authRoute);
    app.use(`${prefixAdmin}/blogs`, authMiddleware.requireAuth, blogRoute);
    app.use(`${prefixAdmin}/blogs-category`, authMiddleware.requireAuth, blogCategoryRoute);
    app.use(`${prefixAdmin}/settings`, authMiddleware.requireAuth, settingRoute);
    app.use(`${prefixAdmin}/informations`, authMiddleware.requireAuth, informationRoute);
    app.use(`${prefixAdmin}/orders`, authMiddleware.requireAuth, orderRoute);
}