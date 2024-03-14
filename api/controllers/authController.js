require('dotenv').config()

const database = require('../models/database')
const jwt = require('jsonwebtoken')
const fsPromises = require('fs').promises
const path = require('path')

var activeUsers = require('../models/activeUsers.json')

const handleLogin = async (req, res) => {
    // console.log(req.body)

    const { user, pwd } = req.body
    if(!user || !pwd) return res.status(400).json({ 'message': 'email id or user id and password are required'})

    try{
        const response = await database.validateUser(user, pwd);
        if(response){
            if(response.status === 'VALID_USER'){
                // create JWTs
                const { user_id } = response
                console.log(user, user_id)
                const accessToken = jwt.sign(
                    { user, user_id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                )
                const refreshToken = jwt.sign(
                    { user, user_id },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                )
                const currentUser = { user, user_id, refreshToken }
                var flag = true;
                for(var i=0; i<activeUsers.length; i++){
                    if(activeUsers[i].user === user){
                        activeUsers[i].refreshToken = refreshToken
                        flag = false
                        break
                    }
                }

                if(flag) activeUsers = [ ...activeUsers, currentUser ]

                await fsPromises.writeFile(path.join(__dirname, '../models/activeUsers.json'), JSON.stringify(activeUsers))
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    sameSite: 'None',
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                })
                res.json({ user, user_id, accessToken })
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