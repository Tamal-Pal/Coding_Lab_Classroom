
const BASE_URL = `http://localhost:3001/api`
module.exports = {
    LOGIN_URL: `${BASE_URL}/auth`,
    LOGOUT_URL: `${BASE_URL}/logout`,
    REFRESH_URL: `${BASE_URL}/refresh`,
    SIGNUP_URL: `${BASE_URL}/signup`,
    JOIN_ROOM_URL: `${BASE_URL}/joinroom`,
    NEW_ROOM_URL: `${BASE_URL}/newroom`,
    GET_ROOMS_URL: `${BASE_URL}/getrooms`,
    GET_ROOM_NAME_URL: room_id => `${BASE_URL}/roomname?room_id=${room_id}`,
    GET_STUDENTS_URL: room_id => `${BASE_URL}/getstudents?room_id=${room_id}`
};
