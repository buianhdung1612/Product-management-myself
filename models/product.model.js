const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        slug: "title"
    },
    category_id: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    thumbnail: String,
    stock: Number,
    status: String,
    position: Number,
    createdBy: String,
    createdAt: Date,
    updatedBy: String,
    updatedAt: Date,
    deletedBy: String,
    deletedAt: Date,
    deleted: {
        type: Boolean,
        default: false
    },
    featured: {
        type: String,
        default: "0"
    }
})

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;