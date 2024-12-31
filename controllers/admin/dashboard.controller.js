const Account = require("../../models/account.model");
const BlogCategory = require("../../models/blog-category.model");
const Blog = require("../../models/blog.model");
const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        categoryBlog: {
            total: 0,
            active: 0,
            inactive: 0
        },
        blog: {
            total: 0,
            active: 0,
            inactive: 0
        }
    }

    // Danh mục Sản phẩm
    statistic.categoryProduct.total = await ProductCategory.countDocuments({
        deleted: false
    });

    statistic.categoryProduct.active = await ProductCategory.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // Sản phẩm
    statistic.product.total = await Product.countDocuments({
        deleted: false
    });

    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // Danh mục bài viết
    statistic.categoryBlog.total = await BlogCategory.countDocuments({
        deleted: false
    });

    statistic.categoryBlog.active = await BlogCategory.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.categoryBlog.inactive = await BlogCategory.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // Bài viết
    statistic.blog.total = await Blog.countDocuments({
        deleted: false
    });

    statistic.blog.active = await Blog.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.blog.inactive = await Blog.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // Tài khoản admin
    statistic.account.total = await Account.countDocuments({
        deleted: false
    });

    statistic.account.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.account.inactive = await Account.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // Tài khoản client
    statistic.user.total = await User.countDocuments({
        deleted: false
    });

    statistic.user.active = await User.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.user.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive"
    });


    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}