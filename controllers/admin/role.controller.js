const { prefixAdmin } = require("../../config/system");
const moment = require("moment");
const Role = require("../../models/role.model");
const Account = require("../../models/account.model");

module.exports.index = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });

    // Tạo bởi
    for(const item of roles){
        const infoCreated = await Account.findOne({
            _id: item.createdBy
        });

        if(infoCreated){
            item.createdByFullName = infoCreated.fullName;
        }
        else{
            item.createdByFullName = "";
        }

        if(item.createdAt){
            item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YY");
        }
    }
    // Hết Tạo bởi

    // Cập nhật bởi
    for(const item of roles){
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

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        roles: roles
    })
}

module.exports.permissions = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        roles: roles
    })
}

module.exports.permissionsPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("roles_permissions")) {
        for(const item of req.body){
            await Role.updateOne({
                _id: item.id,
                deleted: false
            },{
                permissions: item.permissions
            })
        }

        req.flash("success", "Cập nhật thành công");
        
        res.json({
            code: "success"
        })
    }
}


module.exports.detail = async (req, res) => {
    const id = req.params.id;
    
    const role = await Role.findOne({
        _id: id,
        deleted: false
    })

    res.render("admin/pages/roles/detail", {
        pageTitle: "Chi tiết nhóm quyền",
        roleDetail: role
    })
}

module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền"
    })
}

module.exports.edit = async (req, res) => {
    const role = await Role.findOne({
        _id: req.params.id,
        deleted: false
    })
    res.render("admin/pages/roles/edit", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        role: role
    })
}

module.exports.createPost = async (req, res) => {
    if(res.locals.role.permissions.includes("roles_create")) {
        req.body.createdBy = res.locals.user.id;
        req.body.createdAt = new Date();

        const role = new Role(req.body);

        await role.save();

        req.flash("success", "Tạo mới nhóm quyền thành công");

        res.redirect(`/${prefixAdmin}/roles`)
    }
}

module.exports.editPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("roles_edit")) {
        req.body.updatedBy = res.locals.user.id;
        req.body.updatedAt = new Date();

        await Role.updateOne({
            _id: req.params.id,
            deleted: false
        }, req.body)

        req.flash("success", "Chỉnh sửa thành công");

        res.redirect("back")
    }
}

module.exports.deleteDestroy = async (req, res) => {
    if(res.locals.role.permissions.includes("roles_delete")) {
        await Role.deleteOne({
            _id: req.body.id
        })

        req.flash("success", "Xóa thành công");

        res.json({
            code: "success"
        })
    }
}

