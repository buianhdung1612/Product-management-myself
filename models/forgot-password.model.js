const mongoose = require("mongoose")

const forgotPasswordchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 0
        }
    },
    {
        timestamps: true
    }
)

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordchema, "forgot-password");
module.exports = ForgotPassword;