const mongoose = require("mongoose")
const ObjectId = require("mongoose").ObjectId
const farmerSchema = new mongoose.Schema({
    image:{
        type:String
    },
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
    products: [],
    rate: { type: String },
    role: {
        type: String
    },
    orders: [],
    activate: {
        type: Boolean,
        default: true
    },
    rate:{
        type:Number,
        default:0
    }

})




module.exports = mongoose.model('Farmer', farmerSchema)