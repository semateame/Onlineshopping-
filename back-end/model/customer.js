const mongoose = require("mongoose")
const ObjectId = require("mongoose").ObjectId
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    cart: { item: [{ type: Object }], totalprice: { type: Number, default: 0 },farmerId:{type:String} },
    activate: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model('Customer', customerSchema)