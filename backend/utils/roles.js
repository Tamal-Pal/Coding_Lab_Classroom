
const STU_REGEX = /^S\d+$/
const TCH_REGEX = /^T\d+$/
const USER_REGEX = /^(S|T)\d+$/

module.exports.getRole = (id) => {
    if(STU_REGEX.test(id)) return 'student'
    if(TCH_REGEX.test(id)) return 'teacher'

    return null
}

module.exports.isTeacher = (id) => {
    return TCH_REGEX.test(id)
}

module.exports.isStudent = (id) => {
    return STU_REGEX.test(id)
}

module.exports.isUser = (id) => {
    return USER_REGEX.test(id)
}