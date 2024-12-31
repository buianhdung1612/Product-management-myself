const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");

const systemConfig = require("../../config/system");
const moment = require('moment');

module.exports.index = async (req, res) => {
    const listCategory = await ProductCategory
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
    for(const item of listCategory){
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

    res.render("admin/pages/product-category/index", {
        pageTitle: "Trang danh sách danh mục sản phẩm",
        listCategory: listCategory
    });
}

module.exports.detail = async (req, res) => {
    const category = await ProductCategory.findOne({
        _id: req.params.id,
        deleted: false
    });

    if (category.parent_id) {
        const categoryParent = await ProductCategory.findOne({
            _id: category.parent_id,
            deleted: false
        });

        category.parentTitle = categoryParent.title;
    }

    res.render("admin/pages/product-category/detail", {
        pageTitle: "Trang chi tiết danh mục",
        category: category
    })
}

module.exports.changePositionPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("products-category_edit")) {
        await ProductCategory.updateOne({
            _id: req.body.id,
        }, {
            position: req.body.position,
            updatedBy: res.locals.user.id,
            updatedAt: new Date()
        });

        req.flash('success', 'Đổi vị trí danh mục thành công');

        res.json({
            code: "success"
        })
    }
}

module.exports.changeStatusPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("products-category_edit")) {
        await ProductCategory.updateOne({
            _id: req.body.id,
        }, {
            status: req.body.status,
            updatedBy: res.locals.user.id,
            updatedAt: new Date()
        });
    
        req.flash('success', 'Đổi trạng thái danh mục thành công');
    
        res.json({
            code: "success"
        })
    }
}

module.exports.create = async (req, res) => {
    const listCategory = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/product-category/create", {
        pageTitle: "Trang tạo mới danh mục sản phẩm",
        listCategory: listCategory
    });
}

module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const category = await ProductCategory.findOne({
        _id: id,
        deleted: false
    });

    const listCategory = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/product-category/edit", {
        pageTitle: "Trang chỉnh sửa danh mục sản phẩm",
        category: category,
        listCategory: listCategory
    });
}

module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("products-category_create")) {
        if (req.body.position) {
            req.body.position = parseInt(req.body.position);
        }
        else {
            const countRecord = await ProductCategory.countDocuments();
            req.body.position = countRecord + 1;
        }

        req.body.createdBy = res.locals.user.id;
        req.body.createdAt = new Date();

        const record = new ProductCategory(req.body);
        await record.save();

        req.flash("success", "Tạo mới danh mục thành công");

        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}

module.exports.editPatch = async (req, res) => {
    if (res.locals.role.permissions.includes("products-category_edit")) {
        const id = req.params.id;

        if (req.body.position) {
            req.body.position = parseInt(req.body.position);
        }
        else {
            delete req.body.position
        }

        req.body.updatedBy = res.locals.user.id;
        req.body.updatedAt = new Date();

        await ProductCategory.updateOne({
            _id: id,
            deleted: false
        }, req.body)

        req.flash("success", "Cập nhật thành công");

        res.redirect("back");
    }
}

module.exports.deleteDestroy = async (req, res) => {
    if (res.locals.role.permissions.includes("products-category_delete")) {
        await ProductCategory.deleteOne({
            _id: req.body.id,
        })

        req.flash("success", "Xóa vĩnh viễn danh mục thành công");

        res.json({
            code: "success"
        })
    }
}