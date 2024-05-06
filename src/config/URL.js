
const API_BASE_URL = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_API_SERVER_PORT}/api`
const SOCKET_SERVER_URL = `${process.env.REACT_APP_IP}:${process.env.REACT_APP_SOCKET_SERVER_PORT}`
module.exports = {
    LOGIN_URL: `${API_BASE_URL}/auth`,
    LOGOUT_URL: `${API_BASE_URL}/logout`,
    REFRESH_URL: `${API_BASE_URL}/refresh`,
    SIGNUP_URL: `${API_BASE_URL}/signup`,
    JOIN_ROOM_URL: `${API_BASE_URL}/joinroom`,
    NEW_ROOM_URL: `${API_BASE_URL}/newroom`,
    GET_ROOMS_URL: `${API_BASE_URL}/getrooms`,
    GET_STUDENTS_URL: room_id => `${API_BASE_URL}/getstudents?room_id=${room_id}`,
    GET_STUDENT_URL: student_id => `${API_BASE_URL}/getstudent?user_id=${student_id}`,
    GET_ROOM_DATA_URL: room_id => `${API_BASE_URL}/roomdata?room_id=${room_id}`,
    COMPILE_URL: `${API_BASE_URL}/compile`,

    SOCKET_SERVER_URL: SOCKET_SERVER_URL
}
