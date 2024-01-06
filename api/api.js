const express = require('express');
const bodyParser = require('body-parser')

const PORT = 3001;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', (req, res) => {
    res.send('hi')
})

app.post('/api/signup', (req, res) => {
    console.log(`Full Name: ${req.body.fullName}\nEmail: ${req.body.email}\nPassword1: ${req.body.pswrd1}\nPassword2: ${req.body.pswrd2}`);
    res.redirect('/')
})

app.post('/api/login', (req, res) => {
    console.log()
})

app.listen(PORT, ()=>{
    console.log(`Server Is Listening on PORT ${PORT}`)
});