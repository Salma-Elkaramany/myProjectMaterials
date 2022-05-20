

import '../../../assets/modal.scss';

import Input from '../../base_component/input';
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

const AddModal = ({close}) => {

    const [type, setType] = useState('');
    const [organiser, setOrganiser] = useState('');
    const [period, setPeriod] = useState('');
    const [date, setDate] = useState();
    const [scheduled, setScheduled] = useState();
    const [qr, setQr] = useState(null);
    const [desc, setDesc] = useState('');
    const email = sessionStorage.getItem('email');

    useEffect(() => {
        const d = new Date();

        setDate(`${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`)
        
        d.setMinutes(d.getMinutes() + (parseFloat(period) * 60));
        
        setScheduled(`${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`);
        
        const now = new Date();
        
        setQr(`${organiser}${now}`);
    }, [type, organiser, period]);

    function submit() {

        if(period.includes('-')) {
            toast.error(`Period mustn't be nagative.`, toastStyle);
            return;
        }

        if(!type || !organiser || !period) {
            toast.error('Data is not full.', toastStyle);
            return;
        }

        const data = {type, organiser, qr, date, scheduled, desc, email, period, who:1};

     
        axios.post(`${serverRouter}event`, data)
            .then(response => {
                if(response.data.result == 'success') {
                    toast.success('Event was created successfully.', toastStyle);
                    close(1);
                }
            })
       
    }

    return (
        <div id="myModal" className="modal event">
            <div className="modal-content admin_event">
                <span className="close" onClick={() => close(0)}>&times;</span>
                <div className="header">
                    <p>Add Event</p>
                </div>
                <div className="event_row">
                    <p>Event Type:</p>
                    <Input 
                        val={type}
                        type="text"
                        name="type"
                        id="type"
                        placeholder=""
                        cls="input mt-2"
                        change={(val) => {setType(val)}}
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
                <div className="event_row mt-2">
                    <p>Description:</p>
                    <textarea onChange={(event) => {setDesc(event.target.value)}} value={desc}></textarea>
                </div>
                <div className="event_row mt-2">
                    <p>Period (hours):</p>
                    <Input 
                        val={period}
                        type="number"
                        name="period"
                        id="period"
                        placeholder=""
                        cls="input mt-2"
                        change={(val) => {setPeriod(val)}}
                    />
                </div>
                <div className="event_qr mt-4">
                    {
                        <Button
                            val="Confirm"
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

export default AddModal;