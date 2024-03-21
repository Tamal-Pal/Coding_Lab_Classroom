require('dotenv').config()
const jwt = require('jsonwebtoken')
const Time = require('../config/Time')

const verifyJWT = (req, res, next) => {
    const token = req?.cookies?.jwt
    if(!token) { 
        res.status(401)
        res.json({})
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) { 
                console.error(err)
                return res.sendStatus(403) //invalid token
            }
            req.user_id = decoded.user_id
            next()
        }
    )
}

module.exports = verifyJWT