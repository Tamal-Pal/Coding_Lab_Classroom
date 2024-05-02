require('dotenv').config()
const jwt = require('jsonwebtoken')
const Time = require('../utils/Time')

const verifyJWT = (req, res, next) => {
    const AuthorizationToken = req.headers['authorization']

    var token = undefined
    if(AuthorizationToken){
        token = AuthorizationToken.split(' ')[1]
    }

    if(!token) {
        res.status(401)
        res.json({})
        return
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