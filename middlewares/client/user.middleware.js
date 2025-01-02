const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

module.exports.infoUser = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            token: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        });

        if (user) {
            res.locals.user = user;

            const cart = await Cart.findOne({
                userId: user.id
            });

            const products = cart.products;

            let total = 0;

            for (const item of products) {
                const infoProduct = await Product.findOne({
                    _id: item.productId
                })

                item.thumbnail = infoProduct.thumbnail;
                item.title = infoProduct.title;
                item.slug = infoProduct.slug;
                item.priceNew = parseInt((infoProduct.price * (1 - infoProduct.discountPercentage / 100)).toFixed(0));
                item.quantity = item.quantity;
                total += item.priceNew * item.quantity
            }

            await Cart.updateOne({
                _id: req.cookies.cartId
            }, {
                products: products
            })

            res.locals.miniCart = cart.products.length;
            res.locals.cart = cart.products;
            res.locals.total = total;
        }
    }
    next();
}

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.tokenUser) {
        req.flash("error", "Vui lòng đăng nhập");
        res.redirect("/user/login");
        return;
    }

    const user = await User.findOne({
        token: req.cookies.tokenUser,
        deleted: false,
        status: "active"
    });

    if (!user) {
        req.flash("error", "Vui lòng đăng nhập");
        res.redirect("/user/login");
        return;
    }

    next();
}