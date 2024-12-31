const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    parent_id: String,
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
    },
    featured: {
        type: String,
        default: "0"
    }
})

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, "products-category");
module.exports = ProductCategory;