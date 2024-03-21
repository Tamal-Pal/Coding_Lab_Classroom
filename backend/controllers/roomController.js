require('dotenv').config()
const Time = require('../config/Time')
const database = require('../models/database')

const newRoom = async (req, res) => {
    const { user_id } = req
    if (!user_id) return res.sendStatus(400)

    const { room_name } = req.body

    const result = await database.newRoom({ user_id, room_name })

    if (result) {
        res.sendStatus(201)
    }
    else {
        res.sendStatus(500)
    }
}

module.exports = { newRoom }

const getRooms = async (req, res) => {
    const { user_id } = req

    if(!user_id) return sendStatus(400)

    if(user_id[0] === 'T'){
        const result = await database.getTeachersRooms(user_id)
        res.json(result)
    } else if(user_id[0] === 'S'){
        // This needs to be tested after creating student page
        const result = await database.getStudentsRooms(user_id)
        console.log(result)
        res.json(result)
    } else {
        res.sendStatus(422)
    }
}
module.exports.getRooms = getRooms