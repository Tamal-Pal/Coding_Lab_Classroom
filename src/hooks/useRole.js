import { STU_REGEX, TCH_REGEX } from '../config/REGEX'
import useAuth from './useAuth'

const useRole = () => {

    const { auth } = useAuth()
    const { user_id } = auth
    
    if(TCH_REGEX.test(user_id)) return 'teacher'
    if(STU_REGEX.test(user_id)) return 'student'
    return undefined
}

export default useRole

export const oppositeRole = (role) => {
    if(role === 'teacher') return 'student'
    if(role === 'student') return 'teacher'

    return undefined
}