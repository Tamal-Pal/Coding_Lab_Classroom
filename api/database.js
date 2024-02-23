require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD
}).promise();

const isUser = async (email_id) => {
    [result] = await pool.query('select count(*) as exist from login_test where user_name = ?;', [email_id]);
    if (result[0].exist > 0) return true;
    else return false;
};

const newUser = async (email_id, password, full_name, role) => {

    //checking if every value is received
    if (!(email_id && password && full_name && role)) return null;

    //Generating User Id
    var user_id;
    if (role.toLowerCase() == 'student') { user_id = `S${new Date().getTime()}`; }
    else if (role.toLowerCase() == 'teacher') { user_id = `T${new Date().getTime()}`; }
    else { return null; }

    //Generating password hash
    var hashed_password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    try {
        const result = await pool.query(
            'insert into Users (user_id, email_id, password, full_name) values(?, ?, ?, ?);',
            [user_id, email_id, hashed_password, full_name]
        );
        return result;
    } catch (err) {
        if (err.code == 'ER_DUP_ENTRY') {
            console.log('user already exists')
        } else if (err.code == 'ER_PARSE_ERROR') {
            console.log('error in newUser function in api/database.js, syntax error in pool.query()')
        } else {
            console.log('some error in newUser function in api/database.js', err)
        }
        return null;
    }
};
module.exports.newUser = newUser;

/*
    validateUser:
    returns 'USER_NOT_FOUND' if no user is found
    returns 'INCORRECT_PASSWORD' if user is found, but password mismatched
    returns 'VALID_USER' if email_id and password matches
    returns null if error occurs
*/
const validateUser = async (email_id, password) => {
    try {
        const [response] = await pool.query('select * from Users where email_id=?;', [email_id]);
        var validationData = {
            status: null,
            user_id: null,
            email_id: null,
            full_name: null
        }
        if (response.length == 0) {
            validationData.status = 'USER_NOT_FOUND'
        }
        else {
            const res = await bcrypt.compare(password, response[0].password)
            if (res) {
                validationData.status = 'VALID_USER'
                validationData.user_id = response[0].user_id
                validationData.email_id = response[0].email_id
                validationData.full_name = response[0].full_name
            }
            else {
                validationData.status = 'INCORRECT_PASSWORD';
            }
        }
        return validationData;
    }
    catch (e) {
        console.log('some error while prompting the database', e);
        return null;
    }
};
module.exports.validateUser = validateUser;