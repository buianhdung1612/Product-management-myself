const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const productCategoryRoute = require("./product-category.route");
const cartRoute = require("./cart.route");
const orderRoute = require("./order.route");
const userRoute = require("./user.route");
const blogRoute = require("./blog.route");
const policyRoute = require("./policy.route");
const faqsRoute = require("./faqs.route");
const termRoute = require("./term.route");
const contactRoute = require("./contact.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cart);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.general);
    app.use(settingMiddleware.information);
    app.use('/', homeRoute);
    app.use('/products', productRoute);
    app.use('/product-category', productCategoryRoute);
    app.use('/cart', cartRoute);
    app.use('/order', orderRoute);
    app.use('/user', userRoute);
    app.use('/blog', blogRoute);
    app.use('/policy', policyRoute);
    app.use('/faqs', faqsRoute);
    app.use('/term-conditions', termRoute);
    app.use('/contact', contactRoute);

    // app.get("*", (req, res) => {
    //     res.render("client/pages/errors/404", {
    //         pageTitle: "404 Not Found"
    //     })
    // })
}


