import useAuth from '../../hooks/useAuth'
import { STU_REGEX, TCH_REGEX } from '../../config/REGEX'
import Teacher from './Teacher'
import Student from './Student'
import Unauthorized from '../Unauthorized/Unauthorized'

const User = () => {
    const { auth } = useAuth()

    return (
        TCH_REGEX.test(auth.user_id)
            ? <Teacher />
            : STU_REGEX.test(auth.user_id)
                ? <Student />
                : <Unauthorized />
    )
}

export default User