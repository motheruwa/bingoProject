const mongoose = require("mongoose");
const Schema = mongoose.Schema
const reportSchema = new Schema({
    userName: {
        type: String,
        required : true
    },
    deposit: {
        type: Number,
        required : true
    },
    deductedAmount: {
        type: Number,
        required: true
    },
    noOfPlayer:{
        type: Number,
        required: true
    }
},{timestamps:true})
module.exports = mongoose.model('report' , reportSchema)