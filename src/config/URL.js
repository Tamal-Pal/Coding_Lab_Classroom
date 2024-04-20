
const BASE_URL = `http://192.168.0.105:3001/api`
module.exports = {
    LOGIN_URL: `${BASE_URL}/auth`,
    LOGOUT_URL: `${BASE_URL}/logout`,
    REFRESH_URL: `${BASE_URL}/refresh`,
    SIGNUP_URL: `${BASE_URL}/signup`,
    JOIN_ROOM_URL: `${BASE_URL}/joinroom`,
    NEW_ROOM_URL: `${BASE_URL}/newroom`,
    GET_ROOMS_URL: `${BASE_URL}/getrooms`,
    GET_STUDENTS_URL: room_id => `${BASE_URL}/getstudents?room_id=${room_id}`,
    GET_STUDENT_URL: student_id => `${BASE_URL}/getstudent?user_id=${student_id}`,
    GET_ROOM_DATA_URL: room_id => `${BASE_URL}/roomdata?room_id=${room_id}`,
}
