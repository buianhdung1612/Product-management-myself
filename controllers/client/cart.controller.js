const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

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

    res.render("client/pages/cart/index.pug", {
        pageTitle: "Giỏ hàng",
        products: products,
        total: total
    })
}

module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });

    const products = cart.products;
    const existProduct = products.find(item => item.productId == req.params.id);

    if(existProduct){
        existProduct.quantity = existProduct.quantity + parseInt(req.body.quantity);
    }
    else{
        const product = {
            productId: req.params.id,
            quantity: parseInt(req.body.quantity)
        };
    
        products.push(product);
    }

    await Cart.updateOne({
        _id: cartId
    }, {
        products: products
    })

    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công");

    res.redirect("back");
}

module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.id;

    const cart = await Cart.findOne({
        _id: cartId
    });

    const products = cart.products.filter(item => item.productId != productId);

    await Cart.updateOne({
        _id: cartId
    }, {
        products: products
    })

    req.flash("success", "Xóa sản phẩm khỏi giỏ hàng thành công");

    res.redirect("back");
}

module.exports.updatePatch = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });
    
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);

    const products = cart.products;

    const productUpdate = products.find(item => item.productId == productId);
    productUpdate.quantity = quantity;

    await Cart.updateOne({
        _id: cartId
    }, {
        products: products
    })

    req.flash('success', "Cập nhật thành công");

    res.json({
        code: "success",
    })
}