const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const md5 = require('md5');
const generate = require("../../helpers/generate.helpers");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    const accounts = await Account.find({
        deleted: false
    });

    for(const account of accounts){
        const role = await Role.findOne({
            _id: account.role_id,
            deleted: false
        });

        account.role_title = role.title
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Thông tin cá nhân",
        accounts: accounts
    })  
}

module.exports.myProfile = async (req, res) => {
    res.render("admin/pages/accounts/my-profile", {
        pageTitle: "Thông tin cá nhân"
    })  
}

module.exports.myProfileEdit = async (req, res) => {
    res.render("admin/pages/accounts/my-profile-edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    })  
}

module.exports.myProfileEditPatch = async (req, res) => {
    await Account.updateOne({
        _id: res.locals.user.id
    }, req.body);

    req.flash("success", "Cập nhật thành công");
    res.redirect("back");
}

module.exports.changePassword = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_edit")) {
        const id = req.params.id;

        const account = await Account.findOne({
            _id: id,
            deleted: false
        })

        res.render("admin/pages/accounts/change-password", {
            pageTitle: "Đổi mật khẩu",
            account: account
        })
    }
}

module.exports.changePasswordPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_edit")) {
        await Account.updateOne({
            _id: req.params.id,
            deleted: false
        }, {
            password: md5(req.body.password)
        })

        req.flash("success", "Đổi mật khẩu thành công");
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}

module.exports.edit = async (req, res) => {
    const id = req.params.id;

    const account = await Account.findOne({
        _id: id,
        deleted: false
    })

    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/accounts/edit", {
        pageTitle: "Chỉnh sửa tài khoản quản trị",
        account: account,
        roles: roles
    })
}

module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản quản trị",
        roles: roles
    })
}

module.exports.detail = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_view")) {
        const account = await Account.findOne({
            _id: req.params.id
        });

        const role = await Role.findOne({
            _id: account.role_id,
            deleted: false
        })

        if(role){
            account.role_title = role.title
        }

        res.render("admin/pages/accounts/detail", {
            account: account
        })
    }
}

module.exports.createPost = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_create")) {
        req.body.password = md5(req.body.password);
        req.body.token = generate.generateRandomString(30);

        const account = new Account(req.body);
        await account.save();

        req.flash("success", "Tạo tài khoản thành công")

        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}

module.exports.editPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_edit")) {
        await Account.updateOne({
            _id: req.params.id,
            deleted: false
        }, req.body)

        req.flash("success", "Cập nhật tài khoản thành công");
        res.redirect("back");
    }
}

module.exports.changeStatusPatch = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_edit")) {
        const account = await Account.findOne({
            _id: req.body.id
        });

        const role = await Role.findOne({
            _id: account.role_id 
        });

        if(role.title !== "Quản trị viên"){
            await Account.updateOne({
                _id: req.body.id
            }, {
                status: req.body.status
            });
            req.flash("success", "Thay đổi trạng thái tài khoản thành công");

            res.json({
                code: "success"
            })
        }
        else{
            req.flash("error", "Không thể thay đổi trạng thái Quản trị viên");

            res.json({
                code: "success"
            })
        } 
    }
}

module.exports.deleteDestroy = async (req, res) => {
    if(res.locals.role.permissions.includes("accounts_delete")) {
        await Account.deleteOne({
            _id: req.body.id,
        });

        req.flash("success", "Xóa tài khoản thành công");

        res.json({
            code: "success"
        })
    }
}