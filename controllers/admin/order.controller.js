const Order = require("../../models/order.model");
const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    const find = {};
    // Lọc theo trạng thái
    if (req.query.status) {
        find.status = req.query.status;
    }
    // Hết Lọc theo trạng thái

    const orders = await Order.find(find);

    res.render("admin/pages/orders/index", {
        pageTitle: "Quản lý đơn hàng",
        orders: orders
    })
}

module.exports.detail = async (req, res) => {
    const order = await Order.findOne({
        _id: req.params.id
    });

    const products = order.products;

    let total = 0;

    for(const item of products){
        const infoProduct = await Product.findOne({
            _id: item.productId
        });

        item.thumbnail = infoProduct.thumbnail;
        item.title = infoProduct.title;
        item.slug = infoProduct.slug;
        item.priceNew = (1 - item.discountPercentage/100) * item.price;
        item.priceNew = parseInt(item.priceNew.toFixed(0));
        item.total = item.priceNew * item.quantity;
        total += item.total;
    }

    res.render("admin/pages/orders/detail", {
        pageTitle: "Chi tiết đơn hàng",
        order: order,
        total: total
    })
}

module.exports.changeStatusPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("orders_delete")){
        await Order.updateOne({
            _id: req.body.id
        }, {
            status: req.body.status
        })

        const order = await Order.findOne({
            _id: req.body.id
        });

        for(const item of order.products){
            const infoProduct = await Product.findOne({
                _id: item.productId
            });

            await Product.updateOne({
                _id: item.productId
            }, {
                stock: infoProduct.stock - item.quantity
            })
        }

        req.flash("success", "Duyệt đơn hàng thành công");

        res.json({
            code: "success"
        })
    }
}

module.exports.deleteDestroy = async (req, res) => {
    if(res.locals.role.permissions.includes("orders_delete")){
        await Order.deleteOne({
            _id: req.body.id
        })
        
        req.flash("success", "Xóa vĩnh viễn đơn hàng thành công");
    
        res.json({
            code: "success"
        })
    }
}