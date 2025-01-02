const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helpers");
const sendMailHelper = require("../../helpers/sendMail.helper");
const Cart = require("../../models/cart.model");

module.exports.login = (req, res) => {
    res.render("client/pages/users/login", {
        pageTitle: "Đăng nhập"
    })
}

module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const existUser = await User.findOne({
        email: email,
        deleted: false
    });

    if(!existUser){
        req.flash("error", "Email không tồn tại trong hệ thống");
        res.redirect("back");
        return;
    }

    if(md5(password) != existUser.password){
        req.flash("error", "Sai mật khẩu");
        res.redirect("back");
        return;
    }

    if(existUser.status != "active"){
        req.flash("error", "Tài khoản đang bị khóa");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", existUser.token);

    const cart = await Cart.findOne({
        userId: existUser.id
    })

    res.cookie("cartId", cart.id)

    req.flash("success", "Đăng nhập thành công")

    res.redirect("/")
}

module.exports.forgotPassword = (req, res) => {
    res.render("client/pages/users/forgot-password", {
        pageTitle: "Lấy lại mật khẩu"
    })
}

module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser"); 
    res.clearCookie("cartId");  
    req.flash("success", "Đã đăng xuất");
    res.redirect("/");
}

module.exports.editProfile = async (req, res) => {
    const user = await User.findOne({
        _id: req.params.id,
        deleted: false,
        status: "active"
    });

    res.render("client/pages/users/edit-profile", {
        pageTitle: "Chỉnh sửa thông tin cá nhân",
        user: user
    })
}

module.exports.editProfilePatch = async (req, res) => {
    await User.updateOne({
        _id: req.params.id,
        deleted: false,
        status: "active"
    }, req.body);

    req.flash("success", "Cập nhật thông tin thành công");
    res.redirect("/user/profile");
}

module.exports.profile = (req, res) => {
    res.render("client/pages/users/profile", {
        pageTitle: "Thông tin cá nhân"
    })
}

module.exports.register = (req, res) => {
    res.render("client/pages/users/register", {
        pageTitle: "Đăng ký"
    })
}

module.exports.registerPost = async (req, res) => {
    const user = req.body;

    const existUser = await User.findOne({
        email: user.email,
        deleted: false
    });

    if(existUser){
        req.flash("error", "Email đã tồn tại trong hệ thống");
        res.redirect("back");
        return;
    }

    const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: md5(user.password),
        token: generateHelper.generateRandomString(30),
        status: "active"
    }

    const newUser = new User(dataUser);
    await newUser.save();
    res.cookie("tokenUser", newUser.token);

    const expriresDay = 365 * 24 * 60 * 60 * 10000;
    const cart = new Cart({
        userId: newUser.id,
        exprireAt: Date.now() + expriresDay
    })
    await cart.save();
    res.cookie("cartId", cart.id, {
        expires: new Date(Date.now() + expriresDay)
    })

    req.flash("success", "Đăng ký tài khoản thành công");

    res.redirect("/")
}

module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const existUser = await User.findOne({
        email: email,
        deleted: false,
        status: "active"
    });

    if(!existUser){
        req.flash("error", "Email không tồn tại");
        res.redirect("back");
        return;
    }

    // Việc 1: Lưu email và mã OTP vào CSDL
    const existEmailInForgotPassword = await ForgotPassword.findOne({
        email: email
    });

    if(!existEmailInForgotPassword){
        const otp = generateHelper.generateRandomNumber(6);

        const data = {
            email: email,
            otp: otp,
            expireAt: Date.now() + 5*60*1000
        }

        const record = new ForgotPassword(data);
        await record.save();

        // Việc 2: Gửi mã OTP qua email cho user
        const subject = "Xác thực mã OTP";
        const text = `Mã xác thực của bạn là <b>${otp}</b>. Mã OTP có hiệu lực trong vòng 5 phút, vui lòng không cung cấp mã OTP cho bất kỳ ai.`
        sendMailHelper.sendMail(email, subject, text)
    }

    
    res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.otpPassword = (req, res) => {
    const email = req.query.email;

    res.render("client/pages/users/otp-password", {
        pageTitle: "Xác thực OTP",
        email: email
    })
}

module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const existRecord = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if(!existRecord){
        req.flash("error", "Mã OTP không hợp lệ");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email
    })

    res.cookie("tokenUser", user.token);
    
    res.redirect(`/user/password/reset`);
}

module.exports.resetPassword = (req, res) => {
    res.render("client/pages/users/reset-password", {
        pageTitle: "Đổi mật khẩu"
    })
}

module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
        token: tokenUser,
        status: "active",
        deleted: false
    }, {
        password: md5(password)
    })

    req.flash("success", "Đổi mật khẩu thành công");

    res.redirect("/");
}