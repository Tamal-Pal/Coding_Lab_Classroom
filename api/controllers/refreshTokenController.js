require('dotenv').config()

const database = require('../models/database')
const jwt = require('jsonwebtoken')
const fsPromises = require('fs').promises
const path = require('path')

var activeUsers = require('../models/activeUsers.json')

const handleRefreshToken = async (req, res) => {
    // console.log(req.body)

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const foundUser = activeUsers.find(person => person.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(403)    //Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.user !== decoded.username) return res.sendStatus(403)
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }