require('dotenv').config()
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const signupController = require('../controllers/signupController')
const roomController = require('../controllers/roomController')
const refreshController = require('../controllers/refreshController')
const verifyJWT = require('../middleware/verifyJWT')
const logoutController = require('../controllers/logoutController')

router.get('', (req, res) => {
    res.send('hi')
})

router.post('/signup', signupController)
router.post('/auth', authController.handleLogin)

router.get('/refresh', verifyJWT, refreshController)

router.post('/newroom', verifyJWT, roomController.newRoom)
router.post('/joinroom', verifyJWT, roomController.joinRoom)
router.get('/getrooms', verifyJWT, roomController.getRooms)
router.get('/getstudents', verifyJWT, roomController.getStudents)
router.get('/roomname', verifyJWT, roomController.getRoomName)

router.delete('/logout', logoutController.handleLogout)

module.exports = router