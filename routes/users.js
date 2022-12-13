const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id, user.role),
            role: user.role
        })
    } else {
        res.status(400).json({ message: 'invalid' })
    }
})

//register
router.post('/register', async (req, res) => {

        const { username, password, role } = req.body
        const userExists = await User.findOne({ username })
        if (userExists) {
            res.status(400).json({ message: 'invalid' })
        } else {

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await User.create({
                username,
                password: hashedPassword,
                role
            })

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    username: user.username,
                    role: user.role
                })
            }
            else {
                res.status(400)
                throw new Error("Invalid user data")
            }
        }
})

const generateToken = (id, role) => {

    if (role === "Admin") {
        let data = {
            permission: ["01"],
            role: "Admin",
            id: id
        }
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: '5h',
        })
    } else if (role === "User") {
        let data = {
            permission: ["02"],
            role: "Manager",
            id: id
        }
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: '5h',
        })
    } 
}

module.exports = router;