import Card from 'react-bootstrap/Card'
import './StudentCard.css'
import { useNavigate } from 'react-router-dom'
import useQuery from '../../../hooks/useQuery'
import Avatar from 'react-avatar'

function StudentCard({ student, pending }) {

    const navigate = useNavigate()
    const query = useQuery()
    const room_id = query.get('room_id')
    const { student_id, student_name } = student

    const handleClick = () => {
        navigate(`/editor?room_id=${room_id}&student_id=${student_id}`)
    }

    return (
        <Card className='student-card text-center' onClick={handleClick}>
            <Card.Body className={pending ? 'unread' : 'read'}>
                <Avatar name={student_name} round={true}/>
                <br /><br />
                <Card.Title>Name: {student_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ID: {student_id}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default StudentCard