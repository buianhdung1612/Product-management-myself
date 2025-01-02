const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")

const unidecode = require('unidecode');

module.exports.index = async (req, res) => {
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
        deleted: false,
        status: "active"
    });
    const totalPage = Math.ceil(totalProduct / limitItems);
    // Hết phân trang

    const products = await Product
        .find({
            deleted: false,
            status: "active"
        });

    // Tính toán giá mới (priceNew) cho tất cả sản phẩm
    for(const product of products){
        product.priceNew = product.price * (1 - product.discountPercentage/100);
        product.priceNew = parseInt((product.priceNew).toFixed(0));
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
        pageTitle: "Trang Danh Sách Sản Phẩm",
        products: paginatedProducts,
        totalPage: totalPage,
        totalProduct: totalProduct,
        currentPage: page
    });
};

module.exports.search = async (req, res) => {
    const type = req.params.type;
    const keyword = `${req.query.keyword}`;

    let keywordRegex = keyword.trim();
    keywordRegex = keywordRegex.replace(/\s+/g, "-");
    keywordRegex = unidecode(keywordRegex).toLocaleLowerCase();

    let arrayKeywordRegex = keywordRegex.split("-");

    const slugRegex = new RegExp(arrayKeywordRegex[0], "i");

    const productsByFirstWord = await Product.find({
        slug: slugRegex,
        deleted: false,
        status: "active"
    })

    let productResult = [];

    for(const item of productsByFirstWord){
        let check = true;

        for(const word of arrayKeywordRegex){
            if(!item.slug.includes(word)){
                check = false;
                break;
            }
        }

        if(check){
            productResult.push(item);
        }
    }

    // Phân trang
    let page = 1;
    let limitItems = 16;

    if(req.query.page){
        page = parseInt(req.query.page);
    }
    if(req.query.limit){
        limitItems = parseInt(req.query.limit)
    }

    const skip = (page - 1) * limitItems;

    const totalProduct = productResult.length;
    const totalPage = Math.ceil(totalProduct/limitItems);
    // Hết Phân trang

    for(const product of productResult){
        product.priceNew = product.price * (1 - product.discountPercentage/100);
        product.priceNew = parseInt((product.priceNew).toFixed(0));
    }

    // Sắp xếp
    if (req.query.sortKey === "priceNew") {
        const sortValue = req.query.sortValue;
        if (sortValue === "asc") {
            productResult.sort((a, b) => a.priceNew - b.priceNew);
        } else if (sortValue === "desc") {
            productResult.sort((a, b) => b.priceNew - a.priceNew);
        }
    } else {
        if(req.query.sortKey && req.query.sortValue){
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;
            if (sortValue === "asc") {
                productResult.sort((a, b) => a[sortKey] - b[sortKey]);
            } else if (sortValue === "desc") {
                productResult.sort((a, b) => b[sortKey] - a[sortKey]);
            }
        }
        else{
            productResult.sort((a, b) => b.position - a.position);
        }
    }

    // Phân trang sau khi sắp xếp
    const paginatedProducts = productResult.slice(skip, skip + limitItems);

    if(type == "result"){
        res.render('client/pages/products/search.pug', {
            pageTitle: `Kết quả tìm kiếm: ${keyword}`,
            keyword: keyword,
            totalProduct: totalProduct,
            products: paginatedProducts,
            totalPage: totalPage,
            currentPage: page
        })
    }
    else if(type == "suggest"){
        res.json({
            products: productResult
        })
    }
    
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;

    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    })

    const category = await ProductCategory.findOne({
        _id: product.category_id,
        deleted: false
    })

    if(category){
        product.category_title = category.title;
        product.category_slug = category.slug;
    }

    product.priceNew = product.price * (1 - product.discountPercentage/100);
    product.priceNew = parseInt((product.priceNew).toFixed(0));

    res.render("client/pages/products/detail", {
        pageTitle: product.title,
        product: product
    });
}

