const mongoose = require("mongoose")

const Beer = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        brewery: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        origin: {
            type: String,
            required: true
        },
        abv: {
            type: Number,
            required: true
        },
        container: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        isFiltered: {
            type: Boolean,
            required: true
        },
        inStock: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            required: false
        },
        taste: {
            type: String,
            max: 1000,
            required: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("beer", Beer)