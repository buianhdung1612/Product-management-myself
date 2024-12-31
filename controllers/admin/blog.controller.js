const Blog = require("../../models/blog.model")
const systemConfig = require("../../config/system");
const moment = require("moment");
const Account = require("../../models/account.model");
const BlogCategory = require("../../models/blog-category.model");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    // Lọc theo trạng thái
    if(req.query.status){
        find.status = req.query.status;
    }
    // Hết Lọc theo trạng thái

    // Tìm kiếm
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
    // Hết Tìm kiếm

    // Phân trang
    let page = 1;
    let limitItems = 4;

    if(req.query.page){
        page = parseInt(req.query.page);
    }
    if(req.query.limit){
        limitItems = parseInt(req.query.limit);
    }

    const skip = (page - 1) * limitItems;

    const totalProduct = await Blog.countDocuments(find);
    const totalPage = Math.ceil(totalProduct / limitItems);
    // Hết Phân trang

    // Sắp xếp
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey;
        const sortValue = req.query.sortValue;
        sort[sortKey] = sortValue;
    }
    else{
        sort["position"] = "desc"
    }
    // Hết Sắp xếp
    const blogs = await Blog.find(find).sort(sort).limit(limitItems).skip(skip);

    // Tạo bởi
    for(const item of blogs){
        const infoCreated = await Account.findOne({
            _id: item.createdBy
        });

        if(infoCreated){
            item.createdByFullName = infoCreated.fullName
        }
        else{
            item.createdByFullName = ""
        }

        if(item.createdAt){
            item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YY");
        }
    }
    // Hết Tạo bởi

    // Cập nhật bởi
    for(const item of blogs){
        const infoUpdated = await Account.findOne({
            _id: item.updatedBy
        });

        if(infoUpdated){
            item.updatedByFullName = infoUpdated.fullName
        }
        else{
            item.updatedByFullName = ""
        }

        if(item.updatedAt){
            item.updatedAtFormat = moment(item.updatedAt).format("HH:mm - DD/MM/YY");
        }
    }
    // Hết Cập nhật bởi

    res.render("admin/pages/blogs/index", {
        pageTitle: "Trang danh sách bài viết",
        blogs: blogs,
        currentPage: page,
        totalPage: totalPage,
        limitItems: limitItems
    })
}

module.exports.trash = async (req, res) => {
    const blogs = await Blog.find({
        deleted: true
    });

    // Xóa bởi
    for(const item of blogs){
        const infoDeleted = await Account.findOne({
            _id: item.deletedBy
        });

        if(infoDeleted){
            item.deletedByFullName = infoDeleted.fullName;
        }
        else{
            item.deletedByFullName = ""
        }

        if(item.deletedAt){
            item.deletedAtFormat = moment(item.deletedAt).format("HH:mm - DD/MM/YY");
        }
    }
    // Hết Xóa bởi

    res.render("admin/pages/blogs/trash", {
        pageTitle: "Trang thùng rác",
        blogs: blogs
    })
}

module.exports.create = async (req, res) => {
    const listCategory = await BlogCategory.find({
        deleted: false
    });

    res.render("admin/pages/blogs/create", {
        pageTitle: "Trang tạo mới bài viết",
        listCategory: listCategory
    })
}

module.exports.detail = async (req, res) => {
    const blog = await Blog.findOne({
        _id: req.params.id,
        deleted: false
    });

    const category = await BlogCategory.findOne({
        _id: blog.category_id,
        deleted: false
    });

    if(blog.createdBy){
        const infoCreated = await Account.findOne({
            _id: blog.createdBy
        });

        if(infoCreated){
            blog.createdByFullName = infoCreated.fullName
        }
        else{
            blog.createdByFullName = ""       
        }
    }

    if(category){
        blog.category_title = category.title;
    }

    res.render("admin/pages/blogs/detail", {
        pageTitle: "Trang chi tiết bài viết",
        blog: blog
    })
}

module.exports.edit = async (req, res) => {
    const blog = await Blog.findOne({
        _id: req.params.id
    });

    const listCategory = await BlogCategory.find({
        deleted: false
    });
    
    res.render("admin/pages/blogs/edit", {
        pageTitle: "Trang chỉnh sửa bài viết",
        blog: blog,
        listCategory: listCategory
    })
}

module.exports.createPost = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_create")){
        if(req.body.position){
            req.body.position = parseInt(req.body.position);
        }
        else{
            const countRecords = await Blog.countDocuments();
            req.body.position = countRecords + 1;
        }

        req.body.createdBy = res.locals.user.id;
        req.body.createdAt = new Date();

        const record = new Blog(req.body);
        await record.save();

        req.flash("success", "Tạo mới bài viết thành công")

        res.redirect(`/${systemConfig.prefixAdmin}/blogs`)
    }
}

module.exports.changeStatusPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_edit")){
        await Blog.updateOne({
            _id: req.body.id
        }, {
            status: req.body.status,
            updatedBy: res.locals.user.id,
            updatedAt: new Date()
        })

        req.flash("success", "Đổi trạng thái bài viết thành công");

        res.json({
            code: "success"
        })
    }
}

module.exports.changeMultiPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_edit")){
        switch (req.body.status) {
            case "active":
            case "inactive":
                await Blog.updateMany({
                    _id: req.body.ids
                }, {
                    status: req.body.status,
                    updatedBy: res.locals.user.id,
                    updatedAt: new Date()
                })

                req.flash("success", "Đổi trạng thái bài viết thành công");
                res.json({
                    code: "success"
                });
                break;
            case "delete":
                await Blog.updateMany({
                    _id: req.body.ids,
                }, {
                    deleted: true,
                    updatedBy: res.locals.user.id,
                    updatedAt: new Date()
                });

                req.flash("success", "Xóa bài viết thành công");
                res.json({
                    code: "success"
                });
                break;
            default:
                res.json({
                    code: "error",
                    message: "Trạng thái không hợp lệ"
                })
                break;
        }
    }
}

module.exports.changePositionPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_edit")){
        await Blog.updateOne({
            _id: req.body.id
        }, {
            position: req.body.position,
            updatedBy: res.locals.user.id,
            updatedAt: new Date()
        });

        req.flash("success", "Đổi vị trí bài viết thành công");

        res.json({
            code: "success"
        })
    }
}

module.exports.editPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_edit")){
        const id = req.params.id;

        if(req.body.position){
            req.body.position = parseInt(req.body.position)
        }

        req.body.updatedBy = res.locals.user.id;
        req.body.updatedAt = new Date();

        await Blog.updateOne({
            _id: id
        }, req.body);

        req.flash("success", "Chỉnh sửa bài viết thành công");

        res.redirect("back");
    }
}

module.exports.delete = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_delete")){
        await Blog.updateOne({
            _id: req.body.id
        }, {
            deleted: true,
            deletedBy: res.locals.user.id,
            deletedAt: new Date()
        })
        
        req.flash("success", "Xóa bài viết thành công");
    
        res.json({
            code: "success"
        })
    }
}

module.exports.deleteRestore = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_delete")){
        await Blog.updateOne({
            _id: req.body.id
        }, {
            deleted: false
        })
        
        req.flash("success", "Khôi phục bài viết thành công");
    
        res.json({
            code: "success"
        })
    }
}

module.exports.deleteDestroy = async (req, res) => {
    if(res.locals.role.permissions.includes("blogs_delete-destroy")){
        await Blog.deleteOne({
            _id: req.body.id
        })
        
        req.flash("success", "Xóa vĩnh viễn bài viết thành công");
    
        res.json({
            code: "success"
        })
    }
}

