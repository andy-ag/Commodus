const mongoose = require('mongoose')

const commoditySchema = new mongoose.Schema({
    apiParams: {
        type: String,
        required: true,
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
    analysisResult: { 
        type: Object,  
        default: null,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Commodity', commoditySchema)