const BlogCategory = require("../../models/blog-category.model")
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");
const moment = require("moment")

module.exports.index = async (req, res) => {
    const listCategory = await BlogCategory
        .find({
            deleted: false
        })
        .sort({
            position: "desc"
        });

    // Tạo bởi
    for(const item of listCategory){
        const infoCreated = await Account.findOne({
            _id: item.createdBy
        })

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
    for(const item of listCategory){
        const infoUpdated = await Account.findOne({
            _id: item.updatedBy
        })

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

    res.render("admin/pages/blog-category/index", {
        pageTitle: "Trang danh sách danh mục bài viết",
        listCategory: listCategory
    })
}

module.exports.detail = async (req, res) => {
    const category = await BlogCategory.findOne({
        _id: req.params.id,
        deleted: false
    });

    res.render("admin/pages/blog-category/detail", {
        pageTitle: "Trang chi tiết danh mục",
        category: category
    })
}


module.exports.create = async (req, res) => {
    res.render("admin/pages/blog-category/create", {
        pageTitle: "Trang tạo mới danh mục bài viết"
    })
}

module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("blogs-category_create")) {
        if(req.body.position){
            req.body.position = parseInt(req.body.position)
        }
        else{
            const countRecord = await BlogCategory.countDocuments();
            req.body.position = countRecord + 1;
        }

        req.body.createdBy = res.locals.user.id;
        req.body.createdAt = new Date();

        const record = new BlogCategory(req.body);
        await record.save();

        req.flash("success", "Tạo mới danh mục bài viết thành công");

        res.redirect(`/${systemConfig.prefixAdmin}/blogs-category`);
    }
}

module.exports.edit = async (req, res) => {
    const category = await BlogCategory.findOne({
        _id: req.params.id,
        deleted: false
    })

    res.render("admin/pages/blog-category/edit", {
        pageTitle: "Trang chỉnh sửa danh mục bài viết",
        category: category
    })
}

module.exports.editPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("blogs-category_edit")) {
        if(req.body.position){
            req.body.position = parseInt(req.body.position);
        }
        else {
            delete req.body.position
        }
        
        req.body.updatedBy = res.locals.user.id;
        req.body.updatedAt = new Date();

        await BlogCategory.updateOne({
            _id: req.params.id,
            deleted: false
        }, req.body);

        req.flash("success", "Chỉnh sửa danh mục sản phẩm thành công")

        res.redirect("back");
    }
}

module.exports.changePositionPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("blogs-category_edit")) {
        await BlogCategory.updateOne({
            _id: req.body.id
        }, {
            position: req.body.position,
            updatedBy: res.locals.user.id,
            updatedAt: new Date()
        })

        req.flash("success", "Đổi vị trí danh mục bài viết thành công");
        res.json({
            code: "success"
        })
    }
}

module.exports.changeStatusPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("blogs-category_edit")) {
        await BlogCategory.updateOne({
            _id: req.body.id
        }, {
            status: req.body.status,
            updatedBy: res.locals.user.id,
            updatedAt: new Date()
        })

        req.flash("success", "Đổi trạng thái danh mục bài viết thành công");
        res.json({
            code: "success"
        })
    }
}

module.exports.deleteDestroy = async (req, res) => {
    if (res.locals.role.permissions.includes("blogs-category_delete")) {
        await BlogCategory.deleteOne({
            _id: req.body.id
        });

        req.flash("success", "Xóa vĩnh viễn danh mục thành công");
        res.json({
            code: "success"
        })
    }
}


