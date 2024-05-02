require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const allowedOrigins = require('./config/allowedOrigins')
const Time = require('./utils/Time')

const PORT = process.env.REACT_APP_API_SERVER_PORT || 3001
const app = express()

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', require('./routes/api'))

app.all('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
    console.log(`API Server Is Listening on PORT ${PORT}`)
})