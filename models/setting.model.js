const mongoose = require("mongoose")

const settingchema = new mongoose.Schema(
    {
        websiteName: String, 
        logo: String,
        phone: String,
        email: String,
        address: String,
        copyright: String
    },
    {
        timestamps: true
    }
)

const Setting = mongoose.model('Setting', settingchema, "settings");
module.exports = Setting;