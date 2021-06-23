const mongoose = require("mongoose")
const ItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    microsoftId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Item", ItemSchema)