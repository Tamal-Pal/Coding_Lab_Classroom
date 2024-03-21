const fsPromises = require('fs').promises
const path = require('path')

// !!Important
// Logout without verification is possible. That should be removed. Verification before logout is necessary..

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)    // No Content

    res.clearCookie('jwt', { httpOnly: true, secure: true })
    res.sendStatus(204)
}

module.exports = { handleLogout }