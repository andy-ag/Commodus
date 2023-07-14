const User = require('../../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function create(req, res){
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        return res.json(token)
    } catch (error) {
        console.log(error)
        return res.status(401).json(error)
    }
}

async function login(req, res){
    try {
        const user = await User.findOne({email: req.body.email})
        const match = await bcrypt.compare(req.body.password, user.password);
        if (user && match) {   
            const token = createJWT(user)
            return res.json(token)
        } else {
            throw new Error()
        }
    } catch (error) {
        return res.status(400).json("Bad credentials")
    }
}

async function changeEmail(req, res){
    try {
        const user = await User.findById(req.user._id)
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error()

        user.email = req.body.email
        await user.save()

        return res.json(user)
    } catch (error) {
        return res.status(400).json("Error changing email")
    }
}

async function changePassword(req, res){
    try {
        const user = await User.findById(req.user._id)
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error()

        user.password = req.body.newPassword
        await user.save()

        return res.json(user)
    } catch (error) {
        return res.status(400).json("Error changing password")
    }
}

async function deleteAccount(req, res){
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        return res.json(user)
    } catch (error) {
        return res.status(400).json("Error deleting account")
    }
}


function createJWT(user){
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '7d'}
        )
}

function checkToken(req, res) {
    // req.user will always exist when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
}


module.exports = {
    create,
    login,
    checkToken,
    changeEmail,
    changePassword,
    deleteAccount
}