

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from '../confirm_modal';
import {useState, useEffect} from 'react';
import Button from '../../base_component/button';
import TicketModal from './tickt_modal';
import serverRouter from '../../../serverRouter';
const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    color: true,
}
const Event = ({event, id, index, modal, active, deleted}) => {

    const [confirm, setConfirm] = useState(0);
    const [ticketModal, setTicketModal] = useState(-1);
    const [desc, setDesc] = useState('');
    const [update, setUpdate] = useState(-1);
    const email = sessionStorage.getItem('email');
    const [reload, setReload] = useState(); 
    const [updateData, setUpdateData] = useState();

    function confirm_check (val) {
        setConfirm(0);
        if(val == 1) {
            axios.post(`${serverRouter}delete_event`, {id: event.id, desc})
                .then((response) => {
                    if(response.data.result === 'success') {
                        deleted(event.id);
                        toast.success('Please wait answer.', toastStyle);
                    }
                })
        }
    }

    useEffect(() => {
        axios.post(`${serverRouter}get_ticket`, {email: email})
        .then(response => {
            const tickets = response.data.result;
            tickets.map(ticket => {
                if(ticket.event_id == event.id && ticket.event_del == 0) {
                    setUpdate(event.id);
                    setUpdateData(ticket);
                }
            })
        })
        
    }, [reload])


    return (
        <div className="mt-4 part">
            <table>
                <tr>
                    <th className={event.delet == 2 ? 'red' : null}>Event ID</th>
                    <th className={event.delet == 2 ? 'red' : null}>Event type</th>
                    <th className={event.delet == 2 ? 'red' : null}>Organiser</th>
                    <th className={event.delet == 2 ? 'red' : null}>Created at</th>
                    <th className={event.delet == 2 ? 'red' : null}>Location</th>
                    <th className={event.delet == 2 ? 'red' : null}>Scheduled</th>
                    <th className={event.delet == 2 ? 'red' : null}>Description</th>
                    {
                        active == 0 ? <th className={event.delet == 2 ? 'red' : null}>Delete</th> : null
                    }
                </tr>
                <tr>
                    <td>{event.id}</td>
                    <td>{event.type}</td>
                    <td>{event.organiser}</td>
                    <td>{event.created_at}</td>
                    <td>Online</td>
                    <td>{event.scheduled_at}</td>
                    <td onClick={() => modal(index)}><i className="bi bi-eye"></i></td>
                    {
                        active == 0 ? <td onClick={() => {event.delet == 0 ? setConfirm(1) : setConfirm(0)}}>{event.delet == 0 ? <i className="bi bi-dash-circle"></i> : null}</td> : null
                    }
                </tr>
            </table>
            {
                active == 0 ?
                    event.delet == 0 ? 
                        update == -1 ?
                            <Button 
                                val="Book Event"
                                cls="button book"
                                type="button"
                                click={() => setTicketModal(event.id)}
                            /> : 
                            <Button 
                                val="Update Ticket"
                                cls="button book"
                                type="button"
                                click={() => setTicketModal(event.id)}
                            />
                    :
                            <Button 
                                val="Processing event deletion."
                                cls="button book_red"
                                type="button"
                            /> : null 
            }
            
            {
                ticketModal != -1 ?
                    <TicketModal update={update} updateData={updateData} reload={(val) => setReload(val)} close={() => setTicketModal(-1)} event={event} /> : null
            }
            {
                confirm == 1 ?
                    <ConfirmModal select="event" desc={(val) => setDesc(val)} close={(val) => confirm_check(val)} /> : null
            }
        </div>
    );
}

export default Event;