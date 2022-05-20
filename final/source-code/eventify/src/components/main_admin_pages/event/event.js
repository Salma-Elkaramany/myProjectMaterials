
import DescModal from './desc_modal';
import {useState} from 'react';

const Event = ({event}) => {

    const [modal, setModal] = useState(0);

    return (
        <div className="mt-4 part">
            <table>
                <tr>
                    <th>Event ID</th>
                    <th>Event type</th>
                    <th>Organiser</th>
                    <th>Created at</th>
                    <th>Location</th>
                    <th>Scheduled</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>{event.id}</td>
                    <td>{event.type}</td>
                    <td>{event.organiser}</td>
                    <td>{event.created_at}</td>
                    <td>Online</td>
                    <td>{event.scheduled_at}</td>
                    <td onClick={() => setModal(1)}><i className="bi bi-eye"></i></td>
                </tr>
            </table>
            {
                modal == 1 && 
                    <DescModal description={event.description} close={(val) => setModal(0)}/>
            }
        </div>
    );
}

export default Event;