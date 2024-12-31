const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

module.exports.requireAuth = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error", "Phải đăng nhập mới có thể truy cập");
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const user = await Account.findOne({
        token: req.cookies.token,
        deleted: false,
        status: "active"
    });

    if(!user){
        req.flash("error", "Token không hợp lệ");
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const role = await Role.findOne({
        _id: user.role_id,
        deleted: false
    })

    res.locals.user = user;
    res.locals.role = role

    next();
}