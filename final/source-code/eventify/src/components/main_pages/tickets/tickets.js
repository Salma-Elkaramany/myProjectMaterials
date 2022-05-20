

import '../../../assets/tickets.scss';
import Ticket from './ticket';


import axios from 'axios';
import {useState, useEffect} from 'react';
import QrModal from '../qr_modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import serverRouter from '../../../serverRouter';
const Tickets = () => {

    const [ticketIndex, setTicketIndex] = useState(-1);
    const [deleted, setDeleted] = useState();
    const email = sessionStorage.getItem('email');

    const [data, setData] = useState(() => {
        axios.post(`${serverRouter}get_ticket`, {email: email})
            .then(response => {
                setData(response.data.result);
            })
        return [];
    });

    useEffect(() => {
        axios.post(`${serverRouter}get_ticket`, {email: email})
            .then(response => {
                setData(response.data.result);
            })
    }, [deleted]);


    return (
        <div className="container tickets">
            <ToastContainer />
            <h5>Your Bookings</h5>
            {
                data.map((ticket, index) => {
                    if(ticket.event_del == 0) {
                        return (
                            <div className="col-md-10 mt-5">
                                <Ticket data={ticket} index={index} set_qr={(index) => setTicketIndex(index)} deleted={(val) => {setDeleted(val)}}/>
                            </div>
                        );
                    }
                })
            }
            {
                data.map((ticket, index) => {
                    if(ticket.event_del != 0) {
                        return (
                            <div className="col-md-10 mt-5">
                                <Ticket data={ticket} index={index} set_qr={(index) => setTicketIndex(index)} deleted={(val) => {setDeleted(val)}}/>
                            </div>
                        );
                    }
                })
            }
            {
                ticketIndex != -1 ?
                    <QrModal data={data[ticketIndex]} close={() => setTicketIndex(-1)} /> : null
            }            
        </div>
    );
}


export default Tickets;