require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const allowedOrigins = require('./config/allowedOrigins')
const verifyJWT = require('./middleware/verifyJWT')

const PORT = 3001;
const app = express();
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser())

app.use('/api', require('./routes/api'))
app.use('/secret', verifyJWT, require('./secret'))

app.all('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
    console.log(`Server Is Listening on PORT ${PORT}`)
});