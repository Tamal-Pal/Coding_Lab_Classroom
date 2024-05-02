import { STU_REGEX, TCH_REGEX } from "./REGEX";

export function isStudent(user_id) {
    return STU_REGEX.test(user_id)
}

export function isTeacher(user_id) {
    return TCH_REGEX.test(user_id)
}