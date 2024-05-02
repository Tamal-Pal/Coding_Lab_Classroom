require('dotenv').config()
const Time = require('../utils/Time')
const database = require('../models/database')

const newRoom = async (req, res) => {
    const { user_id } = req
    if (!user_id) return res.sendStatus(400)

    const { room_name, question, language } = req.body

    const result = await database.newRoom({ user_id, room_name, question, language })

    if (result) {
        res.sendStatus(201)
    }
    else {
        res.sendStatus(500)
    }
}

const joinRoom = async (req, res) => {
    const { user_id } = req
    if (!user_id) return res.sendStatus(401)

    const { room_id } = req.body
    if (!room_id) return res.sendStatus(400)

    try {
        await database.joinRoom({ user_id, room_id })
        res.sendStatus(202)
    } catch (e) {
        console.error(e)
        if (e.code === 'ER_DUP_ENTRY') return res.sendStatus(409)
        else if (e.code === 'ER_NO_REFERENCED_ROW_2') return res.sendStatus(400)
        else return res.sendStatus(500)
    }
}

const getRooms = async (req, res) => {
    const { user_id } = req

    if (!user_id) return sendStatus(400)

    if (user_id[0] === 'T') {
        const result = await database.getTeachersRooms(user_id)
        res.json(result)
    } else if (user_id[0] === 'S') {
        // This needs to be tested after creating student page
        const result = await database.getStudentsRooms(user_id)
        res.json(result)
    } else {
        res.sendStatus(422)
    }
}

const getStudents = async (req, res) => {
    const { user_id } = req

    if (!user_id) return res.sendStatus(400)
    if (user_id[0] != 'T') return res.sendStatus(401)

    const room_id = req.query.room_id
    if (!room_id || room_id[0] != 'R') return res.sendStatus(400)

    const students = await database.getStudents(room_id)
    res.json(students)
}

const getStudent = async (req, res) => {
    const { user_id } = req.query

    if (!user_id) return res.sendStatus(400)
    if (req.user_id[0] != 'T') return res.sendStatus(401)

    const data = await database.getStudent(user_id)
    res.json(data)
}

const getRoomData = async (req, res) => {
    const { user_id } = req
    if (!user_id) return res.sendStatus(400)

    const room_id = req.query.room_id
    if (!room_id || room_id[0] != 'R') return res.sendStatus(400)

    const result = await database.getRoomData(room_id)
    res.json(result)
}

module.exports = { newRoom, getRooms, joinRoom, getStudents, getStudent, getRoomData }