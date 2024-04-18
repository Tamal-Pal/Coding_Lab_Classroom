require('dotenv').config()

const database = require('../models/database')
const jwt = require('jsonwebtoken')
// const fsPromises = require('fs').promises
const path = require('path')
const Time = require('../config/Time')

// var activeUsers = require('../models/activeUsers.json')

const handleLogin = async (req, res) => {
    // console.log(req.body, Time())

    const { user, pwd } = req.body
    if(!user || !pwd) return res.status(400).json({ 'message': 'email id or user id and password are required'})

    try{
        const response = await database.validateUser(user, pwd);
        if(response){
            if(response.status === 'VALID_USER'){
                // create JWTs
                const { user_id, fullname } = response
                const token = jwt.sign(
                    { user_id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1d' }
                )
                res.cookie('jwt', token, {
                    maxAge: 1000 * 60 * 60 * 24
                })
                res.json({ user, user_id, fullname, token })
            } else if(response.status === 'INCORRECT_PASSWORD'){
                res.status(401).json({ 'status': response.status })
            }
        } else {
            const e = new Error('No Response from Database')
            e.code = 'NO_DB_RESPONSE'
            throw e
        }
    } catch(e) {
        if(e.code === 'USER_NOT_FOUND'){
            return res.sendStatus(401) //Unauthorized
        } else {
            console.error(e)
            res.sendStatus(500)     //Internal Server Error
        }
    }
}

module.exports = { handleLogin }