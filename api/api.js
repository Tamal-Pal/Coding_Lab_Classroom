const express = require('express');
const bodyParser = require('body-parser')

const PORT = 3001;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', (req, res) => {
    res.send('hi')
})

app.post('/api/signup', (req, res) => {
    res.send('yo')
})

app.post('/api/login', (req, res) => {
    console.log()
})

app.listen(PORT, ()=>{
    console.log(`Server Is Listening on PORT ${PORT}`)
});