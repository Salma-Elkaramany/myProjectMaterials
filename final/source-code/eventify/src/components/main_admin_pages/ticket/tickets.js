
import '../../../assets/admin/ticket.scss';
import {useEffect, useState} from 'react';
import Ticket from './ticket';
import axios from 'axios';
import Input from '../../base_component/input';
import QRCode from "qrcode.react";
import Button from '../../base_component/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Tickets = () => {

    const [id, setId] = useState('');
    const [active, setActive] = useState(0);

    const [type, setType] = useState('');
    const [organiser, setOrganiser] = useState('');
    const [date, setDate] = useState('');
    const [scheduled, setScheduled] = useState('');
    const [qr, setQr] = useState('');
    const [desc, setDesc] = useState('');
    const [period, setPeriod] = useState('');

    const [data, setData] = useState(() => {
        axios.get(`${serverRouter}admin/get_ticket_all`)
            .then(response => {
                setData(response.data.result);
            })
        return [];
    });

    useEffect(() => {

        data.map(ticket => {
            if(ticket.id == id && ticket.event_del == 0 && ticket.delet == 0) {
                setType(ticket.type);
                setOrganiser(ticket.organiser);
                setDate(ticket.created_at);
                setScheduled(ticket.scheduled_at);
                setQr(ticket.qr);
                setDesc(ticket.description);
                setPeriod(ticket.period);
            }
        })
    }, [id])

    useEffect(() => {
        if(date) {
            const month =  getMonths[date.split(',')[0].split(' ')[0]];
            const day = parseInt(date.split(',')[0].split(' ')[1]);
            const year = parseInt(date.split(',')[1].split(' ')[1]);
            const hour = parseInt(date.split(',')[1].split(' ')[2].split(':')[0]);
            const minute = parseInt(date.split(',')[1].split(' ')[2].split(':')[1]);
    
            const d = new Date();
    
            d.setFullYear(year, month, day);
            d.setHours(hour);
            d.setMinutes(minute);
    
            d.setHours(d.getHours() + parseInt(period));
    
            
            setScheduled(`${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`);
    
            const now = new Date();

            setQr(`${organiser}${now}`);
        }
    }, [date, organiser])

    function update() {

        if(period.toString().includes('-')) {
            toast.error('Period must be integer.', toastStyle);
            return;
        }

        if(!organiser || !period) {
            toast.error('Data is not full.', toastStyle);
            return;
        }
        const data = {id, organiser, scheduled, desc, period, qr};

        axios.post(`${serverRouter}admin/update_ticket`, data)
            .then(response => {
                toast.success('Ticket was updated successfully.', toastStyle);
            })
    }

    return (
        <div className="ticket">
            <ToastContainer />
            <div className="total">
                <div className="header">
                    <ul>
                        <li className={active == 0 ? 'active' : ''} onClick={() => setActive(0)}>Active Tickets</li>
                        <li className={active == 1 ? "active" : ''} onClick={() => setActive(1)}>Admin Tickets History</li>
                        <li className={active == 2 ? "active" : ''} onClick={() => setActive(2)}>Edit Tickets</li>
                    </ul>
                </div>
                <div className="body">
                    <div className="header mt-3 mb-4">
                        {
                            active == 0 ?
                                <p>Active Tickets</p> :
                            active == 1 ?
                                <p>Admin Tickets History</p> :
                            <p>Edit Tickets</p>
                        }
                    </div>
                    {
                        active == 2 && 
                        <div className="modify">
                            <p>Event ID:</p>
                            <Input 
                                val={id}
                                type="number"
                                name="type"
                                id="type"
                                placeholder=""
                                cls="input mt-2"
                                change={(val) => {setId(val)}}
                            />
                            
                        </div>
                    }
                    {
                        data.map(ticket => {
                            if(active == 0) {
                                if(ticket.event_del == 0 && ticket.delet == 0) {
                                   return <Ticket ticket={ticket} />
                                }
                            } else if (active == 1) {
                                if(ticket.delet == 1 || ticket.delet == 2) {
                                    return <Ticket ticket={ticket} />
                                 }
                            } else {
                                if(ticket.id == id && ticket.event_del == 0 && ticket.delet == 0) {
                                    return (
                                        <div className="tickets">
                                            <div className="ticket_row mt-2">
                                                <p>Event type:</p>
                                                <Input 
                                                    val={type}
                                                    type="text"
                                                    name="type"
                                                    id="type"
                                                    placeholder=""
                                                    cls="input mt-2"
                                                />
                                            </div>
                                            <div className="ticket_row mt-2">
                                                <p>Ticket organiser:</p>
                                                <Input 
                                                    val={organiser}
                                                    type="text"
                                                    name="type"
                                                    id="type"
                                                    placeholder=""
                                                    cls="input mt-2"
                                                    change={(val) => {setOrganiser(val)}}
                                                />
                                            </div>
                                            <div className="ticket_row mt-2">
                                                <p>Ticket created:</p>
                                                <Input 
                                                    val={date}
                                                    type="text"
                                                    name="type"
                                                    id="type"
                                                    placeholder=""
                                                    cls="input mt-2"
                                                />
                                            </div>
                                            <div className="ticket_row mt-2">
                                                <p>Ticket scheduled:</p>
                                                <Input 
                                                    val={scheduled}
                                                    type="text"
                                                    name="type"
                                                    id="type"
                                                    placeholder=""
                                                    cls="input mt-2"
                                                />
                                            </div>
                                            <div className="ticket_row mt-2">
                                                <p>Description:</p>
                                                <textarea value={desc}></textarea>
                                            </div>
                                            <div className="ticket_row mt-2">
                                                <p>Period:</p>
                                                <Input 
                                                    val={period}
                                                    type="number"
                                                    name="type"
                                                    id="type"
                                                    placeholder=""
                                                    cls="input mt-2"
                                                />
                                            </div>
                                            <div className="ticket_row mt-2">
                                                <QRCode value={qr} className="qrcode" />
                                            </div>
                                            <div className="ticket_row mt-2">
                                            <Button
                                                val="Update"
                                                cls="button print_button"
                                                type="button"
                                                click={() => update()}
                                            />
                                            </div>
                                        </div>
                                    );
                                }
                            }
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Tickets;