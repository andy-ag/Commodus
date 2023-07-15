const mongoose = require('mongoose')

const commoditySchema = new mongoose.Schema({
    apiParams: {
        type: String,
        requred: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    colNames: {
        type: [String],
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    timeSeries: {
        type: [[String]],
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Commodity', commoditySchema)