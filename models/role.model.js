const { default: mongoose } = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permissions: {
            type: Array,
            default: []
        },
        createdBy: String,
        createdAt: Date,
        updatedBy: String,
        updatedAt: Date,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    {
        timestamps: true
    }
)

const Role = mongoose.model('Role', roleSchema, "roles");

module.exports = Role;