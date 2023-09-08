const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    locality: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        
    },
    alternateNo: {
        type: String,
        
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
})

const Address = mongoose.model("addresses",addressSchema);
exports.Address = Address;