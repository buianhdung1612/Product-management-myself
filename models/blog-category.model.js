const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const blogCategorySchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy: String,
    createdAt: Date,
    updatedBy: String,
    updatedAt: Date,
    deleted: {
        type: Boolean,
        default: false
    }
})

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema, "blogs-category");
module.exports = BlogCategory;