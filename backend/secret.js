const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({'secret': 'yey', 'user_id': req.user_id})
})

module.exports = router