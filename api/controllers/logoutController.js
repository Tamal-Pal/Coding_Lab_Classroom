const fsPromises = require('fs').promises
const path = require('path')
var activeUsers = require('../models/activeUsers.json')

// !!Important
// Logout without verification is possible. That should be removed. Verification before logout is necessary..

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)    // No Content

    const refreshToken = cookies.jwt
    // Is refreshToken in db?
    const foundUser = activeUsers.find(person => person.refreshToken === refreshToken)
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204)
    }

    // Delete refreshToken in db

    for(var i=0; i<activeUsers.length; i++){
        if(activeUsers[i].user === foundUser.user){
            activeUsers.splice(i, 1);
            break
        }
    }
    await fsPromises.writeFile(path.join(__dirname, '..', 'models', 'activeUsers.json'), JSON.stringify(activeUsers))
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })  // secure: true - only serves on https
    res.sendStatus(204)
}

module.exports = { handleLogout }