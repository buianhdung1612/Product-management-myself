const Information = require("../../models/information.model");

module.exports.index = async (req, res) => {
    const information = await Information.findOne({});

    res.render("admin/pages/information/index", {
        pageTitle: "Thông tin bổ sung",
        information: information
    })
}

module.exports.indexPost = async (req, res) => {
    const existRecord = await Information.findOne({});
    if(existRecord){
        await Information.updateOne({
            _id: existRecord.id
        }, req.body)
    }
    else{
        const record = new Information(req.body);
        await record.save();
    }
    
    req.flash("success", "Cập nhật thành công")

    res.redirect("back");
}