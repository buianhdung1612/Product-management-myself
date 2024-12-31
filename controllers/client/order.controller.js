const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");

module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });

    const products = cart.products;

    let total = 0;

    for(const item of products){
        const infoProduct = await Product.findOne({
            _id: item.productId,
            status: "active",
            deleted: false
        })

        item.thumbnail = infoProduct.thumbnail;
        item.title = infoProduct.title;
        item.slug = infoProduct.slug;
        item.priceNew = parseInt((infoProduct.price * (1 - infoProduct.discountPercentage/100)).toFixed(0));
        item.total = item.priceNew * item.quantity;
        total += item.total
    }

    res.render("client/pages/orders/index.pug", {
        pageTitle: "Đặt hàng",
        products: products,
        total: total
    })
}

module.exports.orderPost = async (req, res) => {
    const order = req.body;
    const dataOrder = {
        userId: res.locals.user.id,
        fullName: order.fullName,
        address: order.address,
        phone: order.phone,
        status: "wait",
        products: []
    };

    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });

    const products = cart.products;
    for(const item of products){
        const infoItem = await Product.findOne({
            _id: item.productId
        });

        const dataProduct = {
            productId: item.productId,
            price: infoItem.price,
            discountPercentage: infoItem.discountPercentage,
            quantity: item.quantity,
        };

        dataOrder.products.push(dataProduct);
    }

    const newOrder = new Order(dataOrder);
    await newOrder.save();

    await Cart.updateOne({
        _id: cartId
    }, {
        products: []
    });

    res.redirect(`/order/success/${newOrder.id}`);
}

module.exports.success = async (req, res) => {
    const orderId = req.params.id;

    const order = await Order.findOne({
        _id: orderId
    });

    let total = 0;

    for(const item of order.products){
        const infoProduct = await Product.findOne({
            _id: item.productId
        })

        item.thumbnail = infoProduct.thumbnail;
        item.title = infoProduct.title;
        item.slug = infoProduct.slug;
        item.priceNew = parseInt((item.price * (1 - item.discountPercentage/100)).toFixed(0));
        item.total = item.priceNew * item.quantity;
        total += item.total
    }

    res.render("client/pages/orders/success.pug", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        total: total
    })
}