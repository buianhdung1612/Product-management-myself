const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");

module.exports.cart = async (req, res, next) => {
    if (!req.cookies.cartId && !req.cookies.tokenUser) {
        const expriresDay = 365 * 24 * 60 * 60 * 10000;

        const cart = new Cart({
            exprireAt: Date.now() + expriresDay
        })
        await cart.save();

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expriresDay)
        })

        res.locals.cart = [];
        res.locals.miniCart = 0;
    }
    else if(req.cookies.cartId && !req.cookies.tokenUser){
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });

        const products = cart.products;

        let total = 0;

        for(const item of products){
            const infoProduct = await Product.findOne({
                _id: item.productId
            })

            item.thumbnail = infoProduct.thumbnail;
            item.title = infoProduct.title;
            item.slug = infoProduct.slug;
            item.priceNew = parseInt((infoProduct.price * (1 - infoProduct.discountPercentage/100)).toFixed(0));
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
    next();
}