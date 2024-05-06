require('dotenv').config()
const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const authController = require('../controllers/authController')
const signupController = require('../controllers/signupController')
const roomController = require('../controllers/roomController')
const refreshController = require('../controllers/refreshController')
const logoutController = require('../controllers/logoutController')
const compilerController = require('../controllers/compilerController')

router.get('', (req, res) => {
    res.send('hi')
})

router.post('/signup', signupController)
router.post('/auth', authController.handleLogin)

router.get('/refresh', verifyJWT, refreshController)

router.post('/newroom', verifyJWT, roomController.newRoom)
router.post('/joinroom', verifyJWT, roomController.joinRoom)
router.get('/getrooms', verifyJWT, roomController.getRooms)
router.get('/getstudents', verifyJWT, roomController.getStudents)   //eg: baseUrl/api/getstudents?room_id={someRoomId}
router.get('/getstudent', verifyJWT, roomController.getStudent)     //eg: baseUrl/api/getstudent?user_id={someUserId}
router.get('/roomdata', verifyJWT, roomController.getRoomData)      //eg: baseUrl/api/roomdata?room_id={someRoomId}

router.post('/compile', verifyJWT, compilerController.handleCompilation)

router.delete('/logout', logoutController.handleLogout)

module.exports = router