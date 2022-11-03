const mongoose = require("mongoose")

const User = new mongoose.Schema(
    {
        fName: {
            type: String,
            required: true
        },
        lName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("user", User)
