const BlogCategory = require("../../models/blog-category.model");
const Blog = require("../../models/blog.model");

module.exports.index = async (req, res) => {
    const blogCategories = await BlogCategory.find({
        deleted: false,
        status: "active"
    }).sort({
        position: "desc"
    }).limit(6);

    // Phân trang
    let limitItems = 9;
    let page = 1;

    if(req.query.limit){
        limitItems = parseInt(req.query.limit);
    }
    if(req.query.page){
        page = parseInt(req.query.page);
    }

    const skip = (page - 1) * limitItems;

    const totalBlog = await Blog.countDocuments({
        deleted: false,
        status: "active"
    });
    const totalPage = Math.ceil(totalBlog / limitItems);
    // Hết Phân trang

    const blogs = await Blog
        .find({
            deleted: false,
            status: "active"
        })
        .sort({
            position: "desc"
        })
        .limit(limitItems)
        .skip(skip)

    for(const item of blogs){
        const infoCategory = await BlogCategory.findOne({
            _id: item.category_id,
            deleted: false,
            status: "active"
        });
        
        item.category_name = infoCategory.title;
    }

    res.render("client/pages/blogs/index", {
        pageTitle: "Tin tức",
        blogCategories: blogCategories,
        blogs: blogs,
        totalPage: totalPage,
        currentPage: page
    })
}

module.exports.detail = async (req, res) => {
    const slugBlog = req.params.slugBlog;
    
    const blog = await Blog.findOne({
        slug: slugBlog,
        deleted: false,
        status: "active"
    });

    res.render("client/pages/blogs/detail", {
        pageTitle: blog.title,
        blog: blog
    })
}

module.exports.category = async (req, res) => {
    const slug = req.params.slugBlogCategory;

    const blogCategories = await BlogCategory.find({
        deleted: false,
        status: "active"
    }).sort({
        position: "desc"
    }).limit(6);

    const infoCategory = await BlogCategory.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    })

    // Phân trang
    let page = 1;
    let limitItems = 9;

    if(req.query.page){
        page = parseInt(req.query.page)
    }

    if(req.query.limit){
        limitItems = parseInt(req.query.limit)
    }

    const skip = (page - 1) * limitItems;

    const totalBlog = await Blog.countDocuments({
        category_id: infoCategory.id,
        deleted: false,
        status: "active"
    })

    const totalPage = Math.ceil(totalBlog/limitItems);

    // Hết Phân trang
    
    const blogs = await Blog
        .find({
            category_id: infoCategory.id,
            deleted: false,
            status: "active"
        })
        .sort({
            position: "desc"
        })
        .skip(skip)
        .limit(limitItems)

    res.render("client/pages/blogs/index", {
        pageTitle: "Tin tức",
        blogs: blogs,
        blogCategories: blogCategories,
        totalPage: totalPage,
        currentPage: page
    })
}