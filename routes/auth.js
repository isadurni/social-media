const express = require('express')
const router = express.Router()

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req,res) => {
    // Validate Name, Email, Password
    const {error} = registerValidation(req.body)
    if(error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }
    // Validate if User Exists
    const userExists = await User.findOne({email:req.body.email})
    if(userExists) {
        return res.status(400).send({message:'User already exists'})
    }
    // Hash Password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password, salt)
    // Extract Body and Create User
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
    // Save User
    try {
        const savedUser = await user.save()
        return res.send(savedUser)
    } catch(err) {
        return res.status(400).send({message:err})
    }
})

router.post('/login', async(req,res) => {
    // Validate Name, Email, Password
    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(400).send({message:error['details'][0]['message']})
    }
    // Validate if User Exists
    const user = await User.findOne({email:req.body.email})
    if(!user) {
        return res.status(400).send({message:'User does not exist'})
    }
    // Validation if Password is Correct
    const passwordValidation = await bcryptjs.compare(req.body.password, user.password)
    if (!passwordValidation) {
        return res.status(400).send({message:'Password is incorrect'})
    }
    // Generate Authorization Token
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})
})

module.exports = router