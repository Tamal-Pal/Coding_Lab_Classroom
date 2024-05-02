import useRole from './useRole'
import useQuery from './useQuery'
import useAuth from './useAuth'

const useNotebookId = () => {

    // It would be better if useMemo was used in this hook. There can be potential errors without that.
    
    const role = useRole()
    const query = useQuery()
    const room_id = query.get('room_id')
    const { auth } = useAuth()
    var student_id = undefined
    if(role === 'teacher') {
        student_id = query.get('student_id')
    }
    else if(role === 'student'){
        student_id = auth.user_id
    }

    if(room_id && student_id){
        return `${room_id}_${student_id}`
    }
    return undefined
}

export default useNotebookId