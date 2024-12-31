module.exports.index = async (req, res) => {
    res.render("client/pages/contacts/index", {
        pageTitle: "Liên hệ cho chúng tôi nếu có thắc mắc"
    })
}