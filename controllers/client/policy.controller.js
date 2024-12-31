module.exports.index = async (req, res) => {
    res.render("client/pages/informations/policy", {
        pageTitle: "Chính sách của chúng tôi"
    })
}