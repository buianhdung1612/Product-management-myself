module.exports.index = async (req, res) => {
    res.render("client/pages/informations/faqs", {
        pageTitle: "Câu Hỏi Thường Gặp (FAQs)"
    })
}