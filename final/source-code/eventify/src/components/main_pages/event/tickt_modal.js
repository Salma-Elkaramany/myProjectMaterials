

import '../../../assets/modal.scss';

import Input from '../../base_component/input';
import QRCode from "qrcode.react";
import {useState, useEffect} from 'react';
import Button from '../../base_component/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const getMonths = {
    'Jan' : 0, 
    'Feb' : 1, 
    'Mar' : 2, 
    'Apr' : 3, 
    'May' : 4, 
    'Jun' : 5, 
    'Jul' : 6, 
    'Aug' : 7, 
    'Sep' : 8, 
    'Oct' : 9, 
    'Nov' : 10, 
    'Dec' : 11
};

const TicketModal = ({updateData, update, reload, close, event}) => {

    const type = event.type;
    const [organiser, setOrganiser] = useState('');
    const period = event.period;
    const date = event.created_at;
    const scheduled = event.scheduled_at;
    const [qr, setQr] = useState(null);
    const description = event.description;

    useEffect(() => {
        if(update != -1) {
            setOrganiser(updateData.organiser);
        }
    }, [])    

    useEffect(() => {
        const now = new Date();

        setQr(`${organiser}${now}`);
    }, [organiser]);

    function submit() {

        if(!organiser) {
            toast.error('Data is not full.', toastStyle);
            return;
        }
        reload(new Date());

        const email = sessionStorage.getItem('email');
        const data = {type, organiser, qr, date, scheduled, email, id: event.id, description, period};

        if(update == -1 ) {
            axios.post(`${serverRouter}ticket`, data)
            .then(response => {
                if(response.data.result == 'success') {
                    toast.success('Ticket was created successfully.', toastStyle);
                    close(-1);
                }
            })
        } else {
            data['ticketId'] = updateData.id;
            axios.post(`${serverRouter}update_ticket`, data)
            .then(response => {
                if(response.data.result == 'success') {
                    toast.success('Ticket was updated successfully.', toastStyle);
                    close(-1);
                }
            })
        }

    }

    return (
        <div id="myModal" className="modal event">
            <div className="modal-content">
                <span className="close" onClick={() => close(-1)}>&times;</span>
                <div className="event_row">
                    <p>Event Type:</p>
                    <Input 
                        val={type}
                        type="text"
                        name="type"
                        id="type"
                        placeholder=""
                        cls="input mt-2"
                    />
                </div>
                <div className="event_row mt-2">
                    <p>Organiser:</p>
                    <Input 
                        val={organiser}
                        type="text"
                        name="organiser"
                        id="organiser"
                        placeholder=""
                        cls="input mt-2"
                        change={(val) => {setOrganiser(val)}}
                    />
                </div>
                {/* <div className="event_row mt-2">
                    <p>Description:</p>
                    <textarea onChange={(event) => {setDesc(event.target.value)}}></textarea>
                </div> */}
                <div className="event_row mt-2">
                    <p>Period (hours):</p>
                    <Input 
                        val={period}
                        type="number"
                        name="period"
                        id="period"
                        placeholder=""
                        cls="input mt-2"
                    />
                </div>
                <div className="event_qr mt-2">
                    <QRCode value={qr} />
                </div>
                <div className="event_qr mt-4">
                    {
                        update == -1 ? 
                            <Button
                                val="Submit"
                                type="button"
                                cls="button modal_submit"
                                click={submit}
                            /> : 
                            <Button
                                val="Update"
                                type="button"
                                cls="button modal_submit"
                                click={submit}
                            />
                    }
                </div>
            </div>
        </div>
    );
}  

export default TicketModal;