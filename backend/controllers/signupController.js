const database = require('../models/database')

module.exports = async (req, res) => {
    const { user, pwd, fullname, role } = req.body;
    if(!user || !pwd || !fullname || !role) {
        res.status(400).json({ 
            'message': 'email id, password, fullname and role are required.'
        })
        return
    }

    try{
        const result = await database.newUser(user, pwd, fullname, role);
        if(result === 'SIGN_UP_SUCCESSFUL'){
            res.status(201).json({ 'success': `New User ${user} Created`})
        }
        else{
            res.status(500).json({ 'message': 'Server Error' })
        }
    } catch(e) {
        console.log(e)
        if(e.code === 'ER_DUP_ENTRY'){
            res.status(409).json({ 'message': 'User Already Exists' })
        }
        else{
            res.status(500).json({ 'message': 'Server Error' })
        }
    }
}