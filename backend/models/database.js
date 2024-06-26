require("dotenv").config();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const pool = mysql
  .createPool({
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PASSWORD,
  })
  .promise();

const isUser = async (email_id) => {
  [result] = await pool.query(
    "select count(*) as exist from login_test where user_name = ?;",
    [email_id]
  );
  if (result[0].exist > 0) return true;
  else return false;
};

const newUser = async (user, pwd, fullname, role) => {
  //checking if every value is received
  if (
    !(user && pwd && fullname && role) ||
    user == "" ||
    pwd == "" ||
    fullname == ""
  )
    return null;

  //Generating User Id
  var user_id;
  if (role.toLowerCase() == "student") {
    user_id = `S${new Date().getTime()}`;
  } else if (role.toLowerCase() == "teacher") {
    user_id = `T${new Date().getTime()}`;
  } else {
    return null;
  }

  //Generating password hash
  var hashed_password = await bcrypt.hash(
    pwd,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  try {
    const result = await pool.query(
      "insert into Users (user_id, user, pwd, fullname) values(?, ?, ?, ?);",
      [user_id, user, hashed_password, fullname]
    );
    return "SIGN_UP_SUCCESSFUL";
  } catch (err) {
    throw err;
  }
};

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
    const [response] = await pool.query("select * from Users where user=?;", [
      user,
    ]);
    var validationData = {
      status: null,
      user_id: null,
      user: null,
      fullname: null,
    };
    if (response.length == 0) {
      const e = new Error("user not found");
      e.code = "USER_NOT_FOUND";
      throw e;
    } else {
      const res = await bcrypt.compare(pwd, response[0].pwd);
      if (res) {
        validationData.status = "VALID_USER";
        validationData.user_id = response[0].user_id;
        validationData.user = response[0].user;
        validationData.fullname = response[0].fullname;
      } else {
        validationData.status = "INCORRECT_PASSWORD";
      }
    }
    return validationData;
  } catch (e) {
    console.log("database.js", e);
    throw e;
  }
};

const refreshUser = async (user_id) => {
  const [result] = await pool.query(
    "select user, fullname from Users where user_id=?;",
    [user_id]
  );
  if (result.length === 0) throw new Error("User Not Found");

  return { ...result[0], user_id };
};

const newRoom = async ({ user_id, room_name, question, language }) => {
  if (!user_id) return false;

  if (!room_name) roomDesc = "";

  const room_id = `R${new Date().getTime()}`;

  try {
    const [result] = await pool.query(
      `insert into room_admin (room_id, admin_id, room_name, question, language)
            values(?, ?, ?, ?, ?);`,
      [room_id, user_id, room_name, question, language]
    );
    return result;
  } catch (e) {
    console.error(e, "Error occurred while pusing into database");

    return null;
  }
};

const joinRoom = async ({ user_id, room_id }) => {
  const response = await pool.query(
    `
    insert into rooms (user_id, room_id)
    values (?, ?);
    `,
    [user_id, room_id]
  );
};

const getTeachersRooms = async (admin_id) => {
  const [result] = await pool.query(
    `
    select room_id, room_name from room_admin 
    where admin_id=?;
    `,
    [admin_id]
  );
  return result;
};

const getStudentsRooms = async (user_id) => {
  const [result] = await pool.query(
    `select 
        rooms.room_id as room_id, 
        room_admin.room_name as room_name,
        Users.fullname as room_admin
        from rooms, room_admin, Users
        where 
            rooms.user_id=?
            and rooms.room_id=room_admin.room_id 
            and room_admin.admin_id=Users.user_id;`,
    [user_id]
  );
  return result;
};

const getStudents = async (room_id) => {
  const [result] = await pool.query(
    `select
        Users.fullname as student_name,
        rooms.user_id as student_id
        from Users, rooms
        where rooms.room_id=?
        and rooms.user_id=Users.user_id;
    `,
    [room_id]
  );

  return result;
};

const getStudent = async (user_id) => {
  const [result] = await pool.query(
    `select 
        fullname as student_name 
        from Users
        where user_id=?;`,
    [user_id]
  );

  return result[0];
};

const getRoomData = async (room_id) => {
  const [[result]] = await pool.query(
    `
    SELECT r.room_id, r.admin_id, r.room_name, r.room_creation_time, r.question, r.language, u.user AS admin_username, u.fullname
    FROM room_admin r
    INNER JOIN users u ON r.admin_id = u.user_id
    WHERE r.room_id = ?;`,
    [room_id]
  );
  
  return result;
};

const validNotebook = async (notebook) => {
  const [room_id, student_id] = notebook.split("_");
  const [valid] = await pool.query(
    "select exists( select 1 from rooms where room_id=? and user_id=?) as valid;",
    [room_id, student_id]
  );

  if (valid[0].valid) return true;
  else return false;
};

const validRoomAdmin = async ({ room_id, teacher_id }) => {
  const [valid] = await pool.query(
    "select exists( select 1 from room_admin where room_id=? and admin_id=?) as valid",
    [room_id, teacher_id]
  );

  if (valid[0].valid) return true;
  else return false;
};

const addLog = async ({ room_id, user_id, input, err, output }) => {
  await pool.query(
    `
    INSERT INTO io_logs (room_id, user_id, input, err, output) values (?, ?, ?, ?, ?)
    `,
    [room_id, user_id, input, err ? 1:0, output]
  );

  return true;
};

module.exports = {
  isUser,
  newUser,
  validateUser,
  refreshUser,
  newRoom,
  joinRoom,
  getTeachersRooms,
  getStudentsRooms,
  getStudents,
  getStudent,
  getRoomData,
  validNotebook,
  validRoomAdmin,
  addLog,
};
