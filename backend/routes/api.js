require('dotenv').config()
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const signupController = require('../controllers/signupController')
const roomController = require('../controllers/roomController')
const verifyJWT = require('../middleware/verifyJWT')
// const logoutController = require('../controllers/logoutController')

router.get('', (req, res) => {
    res.send('hi')
})

router.post('/signup', signupController);
router.post('/auth', authController.handleLogin)

router.post('/newroom', verifyJWT, roomController.newRoom)
router.get('/getRooms', verifyJWT, roomController.getRooms)
// router.get('/logout', logoutController.handleLogout)

module.exports = router;