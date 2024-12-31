const Setting = require("../../models/setting.model");
const Information = require("../../models/information.model");

module.exports.general = async (req, res, next) => {
    const settingGeneral = await Setting.findOne({});

    res.locals.settingGeneral = settingGeneral;

    next();
}

module.exports.information = async (req, res, next) => {
    const information = await Information.findOne({});

    res.locals.information = information;

    next();
}