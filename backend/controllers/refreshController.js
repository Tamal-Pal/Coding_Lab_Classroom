require('dotenv').config()
const database = require('../models/database')

module.exports = async (req, res) => {
    const { user_id } = req
    if (!user_id) return res.sendStatus(403)

    try {
        const result = await database.refreshUser(user_id)
        res.json(result)
    } catch (e) {
        if (e.message === 'User Not Found') {
            res.sendStatus(404)
        }
        else {
            res.sendStatus(500)
        }
    }
}