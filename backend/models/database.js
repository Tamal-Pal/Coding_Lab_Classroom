require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const pool = mysql.createPool({
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD
}).promise()

const isUser = async (email_id) => {
    [result] = await pool.query('select count(*) as exist from login_test where user_name = ?;', [email_id]);
    if (result[0].exist > 0) return true;
    else return false;
}
module.exports.isUser = isUser

const newUser = async (user, pwd, fullname, role) => {

    //checking if every value is received
    if (
        !(user && pwd && fullname && role) ||
        user == '' ||
        pwd == '' ||
        fullname == ''
    ) return null;

    //Generating User Id
    var user_id;
    if (role.toLowerCase() == 'student') { user_id = `S${new Date().getTime()}`; }
    else if (role.toLowerCase() == 'teacher') { user_id = `T${new Date().getTime()}`; }
    else { return null; }

    //Generating password hash
    var hashed_password = await bcrypt.hash(pwd, Number(process.env.BCRYPT_SALT_ROUNDS));

    try {
        const result = await pool.query(
            'insert into Users (user_id, user, pwd, fullname) values(?, ?, ?, ?);',
            [user_id, user, hashed_password, fullname]
        );
        return 'SIGN_UP_SUCCESSFUL';
    } catch (err) {
        throw err
    }
}
module.exports.newUser = newUser;

/*
    validateUser:
    returns {status: 'USER_NOT_FOUND'} if no user is found
    returns {status: 'INCORRECT_PASSWORD'} if user is found, but password is incorrect
    returns {
        status: 'VALID_USER',
        user_id: user_id,
        user: user,
        fullname: fullname
    } if user and password matches
    returns null if error occurs
*/
const validateUser = async (user, pwd) => {
    try {
        const [response] = await pool.query('select * from Users where user=?;', [user]);
        var validationData = {
            status: null,
            user_id: null,
            user: null,
            fullname: null
        }
        if (response.length == 0) {
            const e = new Error('user not found')
            e.code = 'USER_NOT_FOUND'
            throw e
        }
        else {
            const res = await bcrypt.compare(pwd, response[0].pwd)
            if (res) {
                validationData.status = 'VALID_USER'
                validationData.user_id = response[0].user_id
                validationData.user = response[0].user
                validationData.fullname = response[0].fullname
            }
            else {
                validationData.status = 'INCORRECT_PASSWORD';
            }
        }
        return validationData;
    }
    catch (e) {
        console.log('database.js', e);
        throw e;
    }
}
module.exports.validateUser = validateUser

const refreshUser = async (user_id) => {
    const [result] = await pool.query('select user, fullname from Users where user_id=?;', [user_id])
    if(result.length === 0) throw new Error('User Not Found')

    return { ...result[0], user_id }
}
module.exports.refreshUser = refreshUser

const newRoom = async ({ user_id, room_name }) => {
    if(!user_id) return false

    if(!room_name) roomDesc = ''

    const room_id = `R${new Date().getTime()}`

    try {
        const [result] = await pool.query(
            `insert into room_admin (room_id, admin_id, room_name)
            values(?, ?, ?);`,
            [room_id, user_id, room_name]
        )
        console.log('yo')
        return result

    } catch(e) {
        console.error(e, 'Error occurred while pusing into database')

        return null
    }
}
module.exports.newRoom = newRoom

const getTeachersRooms = async (admin_id) => {
    const [result] = await pool.query('select room_id, room_name from room_admin where admin_id=?;', [admin_id])
    return result
}
module.exports.getTeachersRooms = getTeachersRooms

const getStudentsRooms = async (user_id) => {
    const [result] = await pool.query(
        `select room_id, room_name from rooms, room_admin
        where rooms.room_id=room_admin.room_id and rooms.user_id=?`,
        [user_id]
    )
    return result
}
module.exports.getStudentsRooms = getStudentsRooms