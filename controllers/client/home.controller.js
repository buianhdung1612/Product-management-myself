const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    // Sản phẩm nổi bật
    const productsFeatured = await Product
        .find({
            deleted: false,
            featured: "1",
            status: "active"
        })
        .sort({
            position: "desc"
        })
        .limit(12);

    for(const item of productsFeatured){
        item.priceNew = (1 - item.discountPercentage/100) * item.price;
        item.priceNew = parseInt((item.priceNew).toFixed(0));
    }
    // Hết Sản phẩm nổi bật

    // Sản phẩm mới
    const productsNew = await Product
        .find({
            status: "active",
            deleted: false
        })
        .sort({
            position: "desc"
        })
        .limit(12);

    for(const item of productsNew){
        item.priceNew = (1 - item.discountPercentage/100) * item.price;
        item.priceNew = parseInt((item.priceNew).toFixed(0));
    }
    // Hết Sản phẩm mới

    // Sản phẩm giảm giá nhiều
    const productsDiscount = await Product
        .find({
            status: "active",
            deleted: false
        })
        .sort({
            discountPercentage: "desc"
        })
        .limit(12);

    for(const item of productsDiscount){
        item.priceNew = (1 - item.discountPercentage/100) * item.price;
        item.priceNew = parseInt((item.priceNew).toFixed(0));
    }
    // Hết Sản phẩm giảm giá nhiều

    // Sản phẩm gợi ý (do mình chọn)
    const productsChoose = await Product
        .find({
            _id: { 
                $in: [
                    "6766cb948a7713083d7cbd70",
                    "6766cbc68a7713083d7cbd87",
                    "6766cc158a7713083d7cbd9e",
                    "6766cc498a7713083d7cbdb5",
                    "6766cd758a7713083d7cbe6b",
                    "6766d6a7edff19710989ce50", 
                    "6766d67bedff19710989ce34"
                ]
            }
        })
    for(const item of productsChoose){
        item.priceNew = (1 - item.discountPercentage/100) * item.price;
        item.priceNew = parseInt((item.priceNew).toFixed(0));
    }
    // Hết Sản phẩm gợi ý (do mình chọn)

    // Danh mục nổi bật
    const categoriesFeatured = await ProductCategory
        .find({
            deleted: false,
            status: "active",
            featured: "1"
        })
        .sort({
            position: "desc"
        })
        .limit(5);
    
    for(const item of categoriesFeatured){
        const countProductsInCategory = await Product.countDocuments({
            category_id: item.id,
            deleted: false,
            status: "active"
        });

        item.totalProducts = countProductsInCategory;
    }
    
    // Hết Danh mục nổi bật

    res.render('client/pages/home/index.pug', {
        pageTitle: "Trang Chủ",
        productsFeatured: productsFeatured,
        productsNew: productsNew,
        productsDiscount: productsDiscount,
        productsChoose: productsChoose,
        categoriesFeatured: categoriesFeatured
    })
}