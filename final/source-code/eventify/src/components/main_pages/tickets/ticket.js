

import Button from '../../base_component/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from '../confirm_modal';
import {useState} from 'react';
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

const Ticket = ({data, index, set_qr, deleted}) => {

    const [confirm, setConfirm] = useState(0);
    
    function confirm_check (val) {
        setConfirm(0);
        if(val == 1) {
            axios.post(`${serverRouter}delete_ticket`, {id: data.id})
                .then((response) => {
                    if(response.data.result === 'success') {
                        deleted(data.id);
                        toast.success('Ticket deleted successfully.', toastStyle);
                    }
                })
        }
    }

    return (
        <div className={data.event_del == 0 ? 'ticket' : data.event_del == 1 ? 'ticket ticket_pro_delete' : 'ticket ticket_confirm_delete'}>
            <div className="text">
                <p>Event Type:</p>
                <p>{data.type}</p>
            </div>
            <div className="text mt-3">
                <p>Location:</p>
                <p>Online</p>
            </div>
            <div className="text mt-3">
                <p>Created at:</p>
                <p>{data.created_at}</p>
            </div>
            <div className="text mt-3">
                <p>Schedule:</p>
                <p>{data.scheduled_at}</p>
            </div>
            <div className="text mt-3">
                <p>Organizer:</p>
                <p>{data.organiser}</p>
            </div>
            <a onClick={() => set_qr(index)}><i className="bi bi-eye"></i></a>
            {
                data.event_del == 0 ?
                    <Button 
                        cls="button cancel_ticket"
                        type="button"
                        val="Cancel Ticket"
                        click={() => setConfirm(1)}
                    /> : 
                data.event_del == 1 ?
                    <Button 
                        cls="button processing_ticket"
                        type="button"
                        val="Processing event deletion."
                    /> :
                data.event_del == 2 ?
                    <Button 
                        cls="button processing_ticket"
                        type="button"
                        val="This event is deleted."
                        click={() => confirm_check(1)}
                    /> : 
                    <Button 
                        cls="button processing_ticket"
                        type="button"
                        val="This event is times up."
                        click={() => confirm_check(1)}
                    />
            }
            {
                confirm == 1 ?
                    <ConfirmModal select="ticket" close={(val) => confirm_check(val)} /> : null
            }
        </div>
    );
}

export default Ticket;