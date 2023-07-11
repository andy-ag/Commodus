const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    commodities: {
        type: Array,
        required: false
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    return next()
})

module.exports = mongoose.model('User', userSchema)