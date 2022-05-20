
import DescModal from './desc_modal';
import {useState} from 'react';
import '../../../assets/admin/events.scss';
const Ticket = ({ticket}) => {

    const [modal, setModal] = useState(0);
    

    return (
        <div className="even">
            <div className="mt-4 part">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>type</th>
                        <th>Organiser</th>
                        <th>Created at</th>
                        <th>Location</th>
                        <th>Scheduled</th>
                        <th>User Email</th>
                        <th>Username</th>
                        <th>Description</th>
                        {
                            ticket.delet != 0 && 
                                <th>Action</th>
                        }
                    </tr>
                    <tr>
                        <td>{ticket.id}</td>
                        <td>{ticket.type}</td>
                        <td>{ticket.organiser}</td>
                        <td>
                            <p>{ticket.created_at.split(' ')[0]}{ticket.created_at.split(' ')[1]}{ticket.created_at.split(' ')[2]}</p>
                            <p>{ticket.created_at.split(' ')[3]}{ticket.created_at.split(' ')[4]}</p>
                        </td>
                        <td>Online</td>
                        <td>
                            <p>{ticket.scheduled_at.split(' ')[0]}{ticket.scheduled_at.split(' ')[1]}{ticket.scheduled_at.split(' ')[2]}</p>
                            <p>{ticket.scheduled_at.split(' ')[3]}{ticket.scheduled_at.split(' ')[4]}</p>
                        </td>
                        <td>
                            <p>{ticket.email.split('@')[0]}</p>
                            <p>@{ticket.email.split('@')[1]}</p>
                        </td>
                        <td>{ticket.username}</td>
                        <td onClick={() => setModal(1)}><i className="bi bi-eye"></i></td>
                        {
                            ticket.delet == 1 ?
                                <td>Deleted</td> : 
                            ticket.delet == 2 ?
                                <td>Times up</td> : null
                        }
                    </tr>
                </table>
            </div>
        
            {
                modal == 1 && 
                    <DescModal description={ticket.description} close={(val) => setModal(0)}/>
            }
        </div>
    );
}

export default Ticket;