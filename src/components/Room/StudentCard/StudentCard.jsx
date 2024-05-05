import Card from 'react-bootstrap/Card'
import './StudentCard.css'
import { useNavigate } from 'react-router-dom'
import useQuery from '../../../hooks/useQuery'

function StudentCard({ student, pending }) {

    const navigate = useNavigate()
    const query = useQuery()
    const room_id = query.get('room_id')
    const { student_id, student_name } = student

    const handleClick = () => {
        navigate(`/editor?room_id=${room_id}&student_id=${student_id}`)
    }

    return (
        <Card className='student-card' onClick={handleClick}>
            <Card.Body className={pending ? 'unread' : 'read'}>
                <Card.Title>{student_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{student_id}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default StudentCard