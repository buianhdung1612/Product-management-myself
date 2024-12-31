const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")

module.exports.index = async (req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await ProductCategory.findOne({
        slug: slugCategory,
        deleted: false,
        status: "active"
    });

    const allCategoryChildren = [];

    const getAllCategoryChildren = async (parentId) => {
        const childs = await ProductCategory.find({
            parent_id: parentId,
            status: "active",
            deleted: false
        })

        for(const child of childs){
            allCategoryChildren.push(child.id);

            await getAllCategoryChildren(child.id);
        }
    } 

    await getAllCategoryChildren(category.id);

    // Phân trang
    let limitItems = 16;
    let page = 1;

    if (req.query.page) {
        page = parseInt(req.query.page);
    }
    if (req.query.limit) {
        limitItems = parseInt(req.query.limit);
    }

    const skip = (page - 1) * limitItems;

    const totalProduct = await Product.countDocuments({
        category_id: { $in: [category.id, ...allCategoryChildren] },
        deleted: false,
        status: "active"
    });
    const totalPage = Math.ceil(totalProduct / limitItems);

    // Hết phân trang

    const products = await Product.find({
        category_id: { $in: [category.id, ...allCategoryChildren] },
        deleted: false,
        status: "active"
    })

    for(const item of products){
        item.priceNew = (1 - item.discountPercentage/100) * item.price;
        item.priceNew = parseInt((item.priceNew).toFixed(0));
    }

    // Sắp xếp
    if (req.query.sortKey === "priceNew") {
        const sortValue = req.query.sortValue;
        if (sortValue === "asc") {
            products.sort((a, b) => a.priceNew - b.priceNew);
        } else if (sortValue === "desc") {
            products.sort((a, b) => b.priceNew - a.priceNew);
        }
    } else {
        if(req.query.sortKey && req.query.sortValue){
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;
            if (sortValue === "asc") {
                products.sort((a, b) => a[sortKey] - b[sortKey]);
            } else if (sortValue === "desc") {
                products.sort((a, b) => b[sortKey] - a[sortKey]);
            }
        }
        else{
            products.sort((a, b) => b.position - a.position);
        }
    }

    // Phân trang sau khi sắp xếp
    const paginatedProducts = products.slice(skip, skip + limitItems);

    res.render('client/pages/products/index.pug', {
        pageTitle: category.title,
        products: paginatedProducts,
        totalPage: totalPage,
        totalProduct: totalProduct,
        currentPage: page
    })
}