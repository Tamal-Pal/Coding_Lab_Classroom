require('dotenv').config();
const express = require('express');
const database = require('./database');

const PORT = 3001;
const app = express();
app.use(express.urlencoded({extended: true}));

app.get('/api', (req, res) => {
    res.send('hi')
})

app.post('/api/signup', async (req, res) => {
    await database.newUser(req.body.email_id, req.body.password, req.body.full_name, req.body.role);
    res.redirect(`http://${process.env.IP}:3000/`)
});

app.post('/api/validateuser', async (req, res) => {
    const email_id = req.headers.email_id;
    const password = req.headers.password;

    const response = await database.validateUser(email_id, password);
    if(response){
        res.send(response)
    }
    else {
        res.send(null)
    }
})

app.listen(PORT, ()=>{
    console.log(`Server Is Listening on PORT ${PORT}`)
});