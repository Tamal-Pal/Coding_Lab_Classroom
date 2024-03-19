require('dotenv').config()
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const signupController = require('../controllers/signupController')
// const logoutController = require('../controllers/logoutController')

router.get('', (req, res) => {
    res.send('hi')
})

router.post('/signup', signupController);
router.post('/auth', authController.handleLogin)
// router.get('/logout', logoutController.handleLogout)

module.exports = router;