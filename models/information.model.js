const mongoose = require("mongoose")

const informationSchema = new mongoose.Schema(
    {
        books: String,
        faqs: String,
        term: String
    },
    {
        timestamps: true
    }
)

const Information = mongoose.model('Information', informationSchema, "informations");
module.exports = Information;